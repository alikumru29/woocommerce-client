import type { WooCommerceClient } from "../client.js";
import type { RequestOptions } from "../types/common.js";
/**
 * Reports resource — generic typed.
 *
 * WooCommerce çok sayıda rapor endpoint'i sunar; her birinin shape'i farklıdır.
 * Caller `T` parametresi ile dönüş tipini belirler.
 *
 * Endpoints: https://woocommerce.github.io/woocommerce-rest-api-docs/#reports
 */
export declare class ReportsService {
    private readonly client;
    constructor(client: WooCommerceClient);
    /** Mevcut rapor endpoint'lerinin listesi. */
    list<T = unknown>(options?: RequestOptions): Promise<T>;
    /** Satış raporu (`/reports/sales`). */
    sales<T = unknown>(query?: {
        period?: "week" | "month" | "last_month" | "year";
        date_min?: string;
        date_max?: string;
    }, options?: RequestOptions): Promise<T>;
    /** En çok satan ürünler (`/reports/top_sellers`). */
    topSellers<T = unknown>(query?: {
        period?: "week" | "month" | "last_month" | "year";
        date_min?: string;
        date_max?: string;
    }, options?: RequestOptions): Promise<T>;
    /** Sipariş sayıları (`/reports/orders/totals`). */
    orderTotals<T = unknown>(options?: RequestOptions): Promise<T>;
    /** Ürün sayıları (`/reports/products/totals`). */
    productTotals<T = unknown>(options?: RequestOptions): Promise<T>;
    /** Müşteri sayıları (`/reports/customers/totals`). */
    customerTotals<T = unknown>(options?: RequestOptions): Promise<T>;
    /** Kupon sayıları (`/reports/coupons/totals`). */
    couponTotals<T = unknown>(options?: RequestOptions): Promise<T>;
    /** Stok raporu (`/reports/products/totals` benzeri custom endpoint'ler için escape hatch). */
    custom<T = unknown>(path: string, query?: Record<string, unknown>, options?: RequestOptions): Promise<T>;
}
//# sourceMappingURL=reports.d.ts.map