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
export declare class WooError extends Error {
    readonly endpoint?: string;
    readonly method?: string;
    readonly code?: string;
    readonly status?: number;
    readonly body?: unknown;
    readonly requestId?: string;
    constructor(message: string, options?: WooErrorOptions);
}
/** 401/403 — auth başarısız ya da eksik izin. */
export declare class WooAuthError extends WooError {
}
/** 404 — kaynak bulunamadı. */
export declare class WooNotFoundError extends WooError {
}
/** 400/422 — invalid params veya zod parse hatası. */
export declare class WooValidationError extends WooError {
}
/** 429 — rate limit. */
export declare class WooRateLimitError extends WooError {
    /** `Retry-After` header (saniye), varsa. */
    readonly retryAfter?: number;
    constructor(message: string, options?: WooErrorOptions & {
        retryAfter?: number;
    });
}
/** 5xx — sunucu hatası. */
export declare class WooServerError extends WooError {
}
/** Network / timeout / fetch hatası. */
export declare class WooNetworkError extends WooError {
}
/**
 * HTTP status'a göre uygun WooError sınıfını seçer.
 */
export declare function errorForStatus(status: number, message: string, options?: WooErrorOptions): WooError;
//# sourceMappingURL=errors.d.ts.map