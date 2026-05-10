import { request as undiciRequest, type Dispatcher } from "undici";
import { sanitizeUrlForLog } from "./auth.js";
import {
  errorForStatus,
  WooNetworkError,
  WooRateLimitError,
  type WooError,
} from "./errors.js";
import type { Logger } from "./logger.js";
import type { RequestOptions, WooErrorResponseBody } from "./types/common.js";

/** HTTP method'ları (WooCommerce REST'in kullandığı subset). */
export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

/** Düşük seviye HTTP request opts. */
export interface LowLevelRequestOptions extends RequestOptions {
  method: HttpMethod;
  /** Tam URL (base + path + query, varsa query-string auth dahil). */
  url: string;
  /** JSON body (otomatik serialize edilir). */
  body?: unknown;
  /**
   * Auth header değeri (örn. `"Basic xxx"`). Boş string verildiğinde Authorization header
   * gönderilmez — query-string auth modunda kullanılır.
   */
  authHeader: string;
}

/** Bir HTTP isteğinin parsed sonucu. */
export interface HttpResponse<T = unknown> {
  status: number;
  headers: Record<string, string | string[] | undefined>;
  /** Parse edilmiş JSON body, ya da boşsa null. */
  body: T;
}

/** HTTP layer config. */
export interface HttpConfig {
  /** Tam istek timeout (ms). */
  timeout: number;
  /** Yeniden deneme sayısı (network/5xx/429 için). */
  retries: number;
  /** İlk retry'a kadar bekleme (ms). Üs alarak büyür. */
  retryBaseDelay: number;
  /** Maksimum retry bekleme (ms). */
  retryMaxDelay: number;
  /** Logger. */
  logger: Logger;
  /** undici dispatcher override (test için). */
  dispatcher?: Dispatcher;
}

/**
 * Tek bir HTTP isteği yürütür. Hatalarda `WooError` türü atar.
 *
 * Retry kuralı: network hatası, 408, 429, ve 5xx için exponential backoff.
 * 429 geldiğinde `Retry-After` header'ına saygı duyar (varsa).
 */
export async function executeRequest<T = unknown>(
  opts: LowLevelRequestOptions,
  config: HttpConfig,
): Promise<HttpResponse<T>> {
  const maxAttempts = (opts.retries ?? config.retries) + 1;
  const timeout = opts.timeout ?? config.timeout;

  let attempt = 0;
  let lastError: WooError | undefined;

  while (attempt < maxAttempts) {
    attempt += 1;

    try {
      const response = await singleAttempt<T>(opts, timeout, config);
      return response;
    } catch (err) {
      lastError = err as WooError;

      const retryable = isRetryable(lastError);
      const hasMoreAttempts = attempt < maxAttempts;

      if (!retryable || !hasMoreAttempts) {
        throw lastError;
      }

      const delay = computeBackoff(attempt, lastError, config);
      config.logger.warn(
        {
          attempt,
          maxAttempts,
          delay,
          status: lastError.status,
          code: lastError.code,
          url: sanitizeUrlForLog(opts.url),
        },
        "WooCommerce request failed, retrying",
      );
      await sleep(delay);
    }
  }

  // Mantıksal olarak buraya ulaşılmaz; throw lastError zaten içeride yapılıyor.
  throw lastError ?? new WooNetworkError("Request failed without an error");
}

async function singleAttempt<T>(
  opts: LowLevelRequestOptions,
  timeoutMs: number,
  config: HttpConfig,
): Promise<HttpResponse<T>> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  // Eğer caller bir signal verdiyse onu da birleştirelim.
  if (opts.signal) {
    if (opts.signal.aborted) controller.abort();
    else opts.signal.addEventListener("abort", () => controller.abort(), { once: true });
  }

  const headers: Record<string, string> = {
    Accept: "application/json",
    "User-Agent": "woocommerce-client/0.1.0",
    ...opts.headers,
  };
  if (opts.authHeader) {
    headers["Authorization"] = opts.authHeader;
  }

  let bodyPayload: string | undefined;
  if (opts.body !== undefined && opts.body !== null) {
    bodyPayload = JSON.stringify(opts.body);
    headers["Content-Type"] = "application/json";
  }

  let res;
  try {
    res = await undiciRequest(opts.url, {
      method: opts.method,
      headers,
      body: bodyPayload,
      signal: controller.signal,
      dispatcher: config.dispatcher,
    });
  } catch (err) {
    clearTimeout(timer);
    const aborted = controller.signal.aborted;
    throw new WooNetworkError(
      aborted ? `Request timed out after ${timeoutMs}ms` : "Network error",
      { cause: err, endpoint: sanitizeUrlForLog(opts.url), method: opts.method },
    );
  }

  clearTimeout(timer);

  const status = res.statusCode;
  const respHeaders = normalizeHeaders(res.headers);
  const text = await res.body.text();
  const parsed = parseJsonSafely(text);

  if (status >= 200 && status < 300) {
    return { status, headers: respHeaders, body: parsed as T };
  }

  // Hata: WooCommerce error response'u parse et.
  const errBody = parsed as WooErrorResponseBody | null;
  const message =
    errBody && typeof errBody.message === "string" && errBody.message
      ? errBody.message
      : `WooCommerce request failed with status ${status}`;

  const sanitizedUrl = sanitizeUrlForLog(opts.url);
  const wooErr = errorForStatus(status, message, {
    endpoint: sanitizedUrl,
    method: opts.method,
    code: errBody?.code,
    body: parsed,
  });

  if (wooErr instanceof WooRateLimitError) {
    const retryAfter = parseRetryAfter(respHeaders["retry-after"]);
    if (retryAfter !== undefined) {
      throw new WooRateLimitError(message, {
        endpoint: sanitizedUrl,
        method: opts.method,
        code: errBody?.code,
        status,
        body: parsed,
        retryAfter,
      });
    }
  }

  throw wooErr;
}

function isRetryable(err: WooError): boolean {
  if (err instanceof WooNetworkError) return true;
  if (err instanceof WooRateLimitError) return true;
  if (err.status !== undefined && err.status >= 500) return true;
  if (err.status === 408) return true;
  return false;
}

function computeBackoff(attempt: number, err: WooError, config: HttpConfig): number {
  if (err instanceof WooRateLimitError && err.retryAfter !== undefined) {
    return Math.min(err.retryAfter * 1000, config.retryMaxDelay);
  }
  const exp = config.retryBaseDelay * 2 ** (attempt - 1);
  const jitter = Math.random() * config.retryBaseDelay;
  return Math.min(exp + jitter, config.retryMaxDelay);
}

function parseRetryAfter(value: string | string[] | undefined): number | undefined {
  if (value === undefined) return undefined;
  const raw = Array.isArray(value) ? value[0] : value;
  if (raw === undefined) return undefined;
  const seconds = Number(raw);
  return Number.isFinite(seconds) && seconds >= 0 ? seconds : undefined;
}

function parseJsonSafely(text: string): unknown {
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

function normalizeHeaders(
  raw: Record<string, string | string[] | undefined>,
): Record<string, string | string[] | undefined> {
  const out: Record<string, string | string[] | undefined> = {};
  for (const [k, v] of Object.entries(raw)) {
    out[k.toLowerCase()] = v;
  }
  return out;
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
