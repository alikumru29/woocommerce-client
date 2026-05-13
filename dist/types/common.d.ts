/**
 * Tüm WooCommerce REST endpoint'lerinin paylaştığı tipler.
 */
/** WooCommerce list endpoint'lerinin desteklediği ortak query params. */
export interface ListQuery {
    /** Sayfa (1-indexed). */
    page?: number;
    /** Sayfa başına item sayısı (1-100, default 10). */
    per_page?: number;
    /** Arama terimi. */
    search?: string;
    /** Belirli ID'leri dahil et. */
    include?: number[];
    /** Belirli ID'leri hariç tut. */
    exclude?: number[];
    /** Sıralama yönü. */
    order?: "asc" | "desc";
    /** Sıralama alanı (`date`, `id`, `title`, `slug`, vb. — endpoint'e bağlı). */
    orderby?: string;
    /** Bu tarihten önce oluşturulan kayıtlar (ISO 8601). */
    before?: string;
    /** Bu tarihten sonra oluşturulan kayıtlar (ISO 8601). */
    after?: string;
    /** Endpoint'e özel ek param'lar. */
    [key: string]: unknown;
}
/** Bir list isteğinin sayfalama meta bilgileri. */
export interface PaginationMeta {
    /** Toplam item sayısı (X-WP-Total header). */
    total: number;
    /** Toplam sayfa sayısı (X-WP-TotalPages header). */
    totalPages: number;
    /** Bu istekte dönen sayfa numarası. */
    page: number;
    /** Bu istekte istenen per_page. */
    perPage: number;
}
/** List endpoint'lerinin metadata-zenginleştirilmiş dönüşü. */
export interface ListResult<T> {
    data: T[];
    meta: PaginationMeta;
}
/** Tek bir HTTP isteği için kullanıcı override'ları. */
export interface RequestOptions {
    /** Override timeout (ms). */
    timeout?: number;
    /** Override retry sayısı. */
    retries?: number;
    /** Ek header'lar. */
    headers?: Record<string, string>;
    /** Abort signal. */
    signal?: AbortSignal;
}
/** WooCommerce'in döndürdüğü standard error response. */
export interface WooErrorResponseBody {
    code: string;
    message: string;
    data?: {
        status?: number;
        [key: string]: unknown;
    };
}
//# sourceMappingURL=common.d.ts.map