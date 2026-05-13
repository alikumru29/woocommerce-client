import { type Dispatcher } from "undici";
import type { Logger } from "./logger.js";
import type { RequestOptions } from "./types/common.js";
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
export declare function executeRequest<T = unknown>(opts: LowLevelRequestOptions, config: HttpConfig): Promise<HttpResponse<T>>;
//# sourceMappingURL=http.d.ts.map