/**
 * WooCommerce list response header'larından PaginationMeta oluşturur.
 *
 * X-WP-Total ve X-WP-TotalPages WordPress core'un standart header'larıdır.
 * Yoksa default'lara düşer (data uzunluğuna göre).
 */
export function extractPaginationMeta(response, requestedPage, perPage) {
    const total = parseHeaderInt(response.headers["x-wp-total"]);
    const totalPages = parseHeaderInt(response.headers["x-wp-totalpages"]);
    const dataLen = Array.isArray(response.body) ? response.body.length : 0;
    return {
        total: total ?? dataLen,
        totalPages: totalPages ?? (dataLen > 0 ? 1 : 0),
        page: requestedPage,
        perPage,
    };
}
function parseHeaderInt(value) {
    if (value === undefined)
        return undefined;
    const raw = Array.isArray(value) ? value[0] : value;
    if (raw === undefined)
        return undefined;
    const n = Number(raw);
    return Number.isFinite(n) ? n : undefined;
}
/**
 * Bir list endpoint'i üzerinden tüm sayfaları async iterator ile sırayla döndürür.
 *
 * Her sayfayı çekmek için verilen `fetchPage` fonksiyonu çağrılır. Sayfa boş döndüğünde
 * veya `totalPages`'e ulaşıldığında durur.
 */
export async function* paginate(fetchPage, startPage = 1) {
    let page = startPage;
    let totalPages = Infinity;
    while (page <= totalPages) {
        const result = await fetchPage(page);
        if (result.data.length === 0)
            return;
        for (const item of result.data) {
            yield item;
        }
        totalPages = result.meta.totalPages || totalPages;
        if (result.data.length < result.meta.perPage)
            return;
        page += 1;
    }
}
//# sourceMappingURL=pagination.js.map