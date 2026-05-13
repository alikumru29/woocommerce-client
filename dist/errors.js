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
/** Tüm WooCommerce client hatalarının base sınıfı. */
export class WooError extends Error {
    endpoint;
    method;
    code;
    status;
    body;
    requestId;
    constructor(message, options = {}) {
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
export class WooAuthError extends WooError {
}
/** 404 — kaynak bulunamadı. */
export class WooNotFoundError extends WooError {
}
/** 400/422 — invalid params veya zod parse hatası. */
export class WooValidationError extends WooError {
}
/** 429 — rate limit. */
export class WooRateLimitError extends WooError {
    /** `Retry-After` header (saniye), varsa. */
    retryAfter;
    constructor(message, options = {}) {
        super(message, options);
        this.retryAfter = options.retryAfter;
    }
}
/** 5xx — sunucu hatası. */
export class WooServerError extends WooError {
}
/** Network / timeout / fetch hatası. */
export class WooNetworkError extends WooError {
}
/**
 * HTTP status'a göre uygun WooError sınıfını seçer.
 */
export function errorForStatus(status, message, options = {}) {
    const opts = { ...options, status };
    if (status === 401 || status === 403)
        return new WooAuthError(message, opts);
    if (status === 404)
        return new WooNotFoundError(message, opts);
    if (status === 400 || status === 422)
        return new WooValidationError(message, opts);
    if (status === 429)
        return new WooRateLimitError(message, opts);
    if (status >= 500)
        return new WooServerError(message, opts);
    return new WooError(message, opts);
}
//# sourceMappingURL=errors.js.map