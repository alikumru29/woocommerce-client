import { request as undiciRequest } from "undici";
import { sanitizeUrlForLog } from "./auth.js";
import { errorForStatus, WooNetworkError, WooRateLimitError, } from "./errors.js";
/**
 * Tek bir HTTP isteği yürütür. Hatalarda `WooError` türü atar.
 *
 * Retry kuralı: network hatası, 408, 429, ve 5xx için exponential backoff.
 * 429 geldiğinde `Retry-After` header'ına saygı duyar (varsa).
 */
export async function executeRequest(opts, config) {
    const maxAttempts = (opts.retries ?? config.retries) + 1;
    const timeout = opts.timeout ?? config.timeout;
    let attempt = 0;
    let lastError;
    while (attempt < maxAttempts) {
        attempt += 1;
        try {
            const response = await singleAttempt(opts, timeout, config);
            return response;
        }
        catch (err) {
            lastError = err;
            const retryable = isRetryable(lastError);
            const hasMoreAttempts = attempt < maxAttempts;
            if (!retryable || !hasMoreAttempts) {
                throw lastError;
            }
            const delay = computeBackoff(attempt, lastError, config);
            config.logger.warn({
                attempt,
                maxAttempts,
                delay,
                status: lastError.status,
                code: lastError.code,
                url: sanitizeUrlForLog(opts.url),
            }, "WooCommerce request failed, retrying");
            await sleep(delay);
        }
    }
    // Mantıksal olarak buraya ulaşılmaz; throw lastError zaten içeride yapılıyor.
    throw lastError ?? new WooNetworkError("Request failed without an error");
}
async function singleAttempt(opts, timeoutMs, config) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    // Eğer caller bir signal verdiyse onu da birleştirelim.
    if (opts.signal) {
        if (opts.signal.aborted)
            controller.abort();
        else
            opts.signal.addEventListener("abort", () => controller.abort(), { once: true });
    }
    const headers = {
        Accept: "application/json",
        "User-Agent": "woocommerce-client/0.1.0",
        ...opts.headers,
    };
    if (opts.authHeader) {
        headers["Authorization"] = opts.authHeader;
    }
    let bodyPayload;
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
    }
    catch (err) {
        clearTimeout(timer);
        const aborted = controller.signal.aborted;
        throw new WooNetworkError(aborted ? `Request timed out after ${timeoutMs}ms` : "Network error", { cause: err, endpoint: sanitizeUrlForLog(opts.url), method: opts.method });
    }
    clearTimeout(timer);
    const status = res.statusCode;
    const respHeaders = normalizeHeaders(res.headers);
    const text = await res.body.text();
    const parsed = parseJsonSafely(text);
    if (status >= 200 && status < 300) {
        return { status, headers: respHeaders, body: parsed };
    }
    // Hata: WooCommerce error response'u parse et.
    const errBody = parsed;
    const message = errBody && typeof errBody.message === "string" && errBody.message
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
function isRetryable(err) {
    if (err instanceof WooNetworkError)
        return true;
    if (err instanceof WooRateLimitError)
        return true;
    if (err.status !== undefined && err.status >= 500)
        return true;
    if (err.status === 408)
        return true;
    return false;
}
function computeBackoff(attempt, err, config) {
    if (err instanceof WooRateLimitError && err.retryAfter !== undefined) {
        return Math.min(err.retryAfter * 1000, config.retryMaxDelay);
    }
    const exp = config.retryBaseDelay * 2 ** (attempt - 1);
    const jitter = Math.random() * config.retryBaseDelay;
    return Math.min(exp + jitter, config.retryMaxDelay);
}
function parseRetryAfter(value) {
    if (value === undefined)
        return undefined;
    const raw = Array.isArray(value) ? value[0] : value;
    if (raw === undefined)
        return undefined;
    const seconds = Number(raw);
    return Number.isFinite(seconds) && seconds >= 0 ? seconds : undefined;
}
function parseJsonSafely(text) {
    if (!text)
        return null;
    try {
        return JSON.parse(text);
    }
    catch {
        return text;
    }
}
function normalizeHeaders(raw) {
    const out = {};
    for (const [k, v] of Object.entries(raw)) {
        out[k.toLowerCase()] = v;
    }
    return out;
}
function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
//# sourceMappingURL=http.js.map