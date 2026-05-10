/**
 * WooCommerce client error hiyerarşisi.
 *
 * Tüm hatalar `WooError` base sınıfından türer. Çağıranlar `instanceof` ile
 * spesifik durumları yakalayabilir.
 *
 * WooCommerce REST API hataları şu formatta gelir:
 * ```json
 * { "code": "rest_no_route", "message": "...", "data": { "status": 404 } }
 * ```
 */

export interface WooErrorContext {
  /** İsteğin gittiği endpoint (örn. `/products/123`). */
  endpoint?: string;
  /** HTTP method. */
  method?: string;
  /** WooCommerce'in döndürdüğü hata kodu (örn. "woocommerce_rest_invalid_id"). */
  code?: string;
  /** HTTP status code. */
  status?: number;
  /** Ham response body (debug için). */
  body?: unknown;
  /** Bu isteğin korelasyon kimliği (varsa). */
  requestId?: string;
}

export interface WooErrorOptions extends WooErrorContext {
  cause?: unknown;
}

/** Tüm WooCommerce client hatalarının base sınıfı. */
export class WooError extends Error {
  public readonly endpoint?: string;
  public readonly method?: string;
  public readonly code?: string;
  public readonly status?: number;
  public readonly body?: unknown;
  public readonly requestId?: string;

  constructor(message: string, options: WooErrorOptions = {}) {
    super(message, options.cause !== undefined ? { cause: options.cause } : undefined);
    this.name = new.target.name;
    this.endpoint = options.endpoint;
    this.method = options.method;
    this.code = options.code;
    this.status = options.status;
    this.body = options.body;
    this.requestId = options.requestId;
  }
}

/** 401/403 — auth başarısız ya da eksik izin. */
export class WooAuthError extends WooError {}

/** 404 — kaynak bulunamadı. */
export class WooNotFoundError extends WooError {}

/** 400/422 — invalid params veya zod parse hatası. */
export class WooValidationError extends WooError {}

/** 429 — rate limit. */
export class WooRateLimitError extends WooError {
  /** `Retry-After` header (saniye), varsa. */
  public readonly retryAfter?: number;

  constructor(message: string, options: WooErrorOptions & { retryAfter?: number } = {}) {
    super(message, options);
    this.retryAfter = options.retryAfter;
  }
}

/** 5xx — sunucu hatası. */
export class WooServerError extends WooError {}

/** Network / timeout / fetch hatası. */
export class WooNetworkError extends WooError {}

/**
 * HTTP status'a göre uygun WooError sınıfını seçer.
 */
export function errorForStatus(
  status: number,
  message: string,
  options: WooErrorOptions = {},
): WooError {
  const opts = { ...options, status };
  if (status === 401 || status === 403) return new WooAuthError(message, opts);
  if (status === 404) return new WooNotFoundError(message, opts);
  if (status === 400 || status === 422) return new WooValidationError(message, opts);
  if (status === 429) return new WooRateLimitError(message, opts);
  if (status >= 500) return new WooServerError(message, opts);
  return new WooError(message, opts);
}
