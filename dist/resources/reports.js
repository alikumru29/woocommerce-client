/**
 * Reports resource — generic typed.
 *
 * WooCommerce çok sayıda rapor endpoint'i sunar; her birinin shape'i farklıdır.
 * Caller `T` parametresi ile dönüş tipini belirler.
 *
 * Endpoints: https://woocommerce.github.io/woocommerce-rest-api-docs/#reports
 */
export class ReportsService {
    client;
    constructor(client) {
        this.client = client;
    }
    /** Mevcut rapor endpoint'lerinin listesi. */
    async list(options) {
        return this.client.request("GET", "/reports", options);
    }
    /** Satış raporu (`/reports/sales`). */
    async sales(query = {}, options) {
        return this.client.request("GET", "/reports/sales", { query, ...options });
    }
    /** En çok satan ürünler (`/reports/top_sellers`). */
    async topSellers(query = {}, options) {
        return this.client.request("GET", "/reports/top_sellers", { query, ...options });
    }
    /** Sipariş sayıları (`/reports/orders/totals`). */
    async orderTotals(options) {
        return this.client.request("GET", "/reports/orders/totals", options);
    }
    /** Ürün sayıları (`/reports/products/totals`). */
    async productTotals(options) {
        return this.client.request("GET", "/reports/products/totals", options);
    }
    /** Müşteri sayıları (`/reports/customers/totals`). */
    async customerTotals(options) {
        return this.client.request("GET", "/reports/customers/totals", options);
    }
    /** Kupon sayıları (`/reports/coupons/totals`). */
    async couponTotals(options) {
        return this.client.request("GET", "/reports/coupons/totals", options);
    }
    /** Stok raporu (`/reports/products/totals` benzeri custom endpoint'ler için escape hatch). */
    async custom(path, query = {}, options) {
        const cleanPath = path.startsWith("/") ? path : `/${path}`;
        return this.client.request("GET", `/reports${cleanPath}`, { query, ...options });
    }
}
//# sourceMappingURL=reports.js.map