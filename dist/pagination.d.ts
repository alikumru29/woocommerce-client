import type { HttpResponse } from "./http.js";
import type { PaginationMeta } from "./types/common.js";
/**
 * WooCommerce list response header'larından PaginationMeta oluşturur.
 *
 * X-WP-Total ve X-WP-TotalPages WordPress core'un standart header'larıdır.
 * Yoksa default'lara düşer (data uzunluğuna göre).
 */
export declare function extractPaginationMeta(response: HttpResponse<unknown[]>, requestedPage: number, perPage: number): PaginationMeta;
/**
 * Bir list endpoint'i üzerinden tüm sayfaları async iterator ile sırayla döndürür.
 *
 * Her sayfayı çekmek için verilen `fetchPage` fonksiyonu çağrılır. Sayfa boş döndüğünde
 * veya `totalPages`'e ulaşıldığında durur.
 */
export declare function paginate<T>(fetchPage: (page: number) => Promise<{
    data: T[];
    meta: PaginationMeta;
}>, startPage?: number): AsyncGenerator<T, void, void>;
//# sourceMappingURL=pagination.d.ts.map