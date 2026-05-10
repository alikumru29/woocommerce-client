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

export class ReportsService {
  constructor(private readonly client: WooCommerceClient) {}

  /** Mevcut rapor endpoint'lerinin listesi. */
  async list<T = unknown>(options?: RequestOptions): Promise<T> {
    return this.client.request<T>("GET", "/reports", options);
  }

  /** Satış raporu (`/reports/sales`). */
  async sales<T = unknown>(
    query: { period?: "week" | "month" | "last_month" | "year"; date_min?: string; date_max?: string } = {},
    options?: RequestOptions,
  ): Promise<T> {
    return this.client.request<T>("GET", "/reports/sales", { query, ...options });
  }

  /** En çok satan ürünler (`/reports/top_sellers`). */
  async topSellers<T = unknown>(
    query: { period?: "week" | "month" | "last_month" | "year"; date_min?: string; date_max?: string } = {},
    options?: RequestOptions,
  ): Promise<T> {
    return this.client.request<T>("GET", "/reports/top_sellers", { query, ...options });
  }

  /** Sipariş sayıları (`/reports/orders/totals`). */
  async orderTotals<T = unknown>(options?: RequestOptions): Promise<T> {
    return this.client.request<T>("GET", "/reports/orders/totals", options);
  }

  /** Ürün sayıları (`/reports/products/totals`). */
  async productTotals<T = unknown>(options?: RequestOptions): Promise<T> {
    return this.client.request<T>("GET", "/reports/products/totals", options);
  }

  /** Müşteri sayıları (`/reports/customers/totals`). */
  async customerTotals<T = unknown>(options?: RequestOptions): Promise<T> {
    return this.client.request<T>("GET", "/reports/customers/totals", options);
  }

  /** Kupon sayıları (`/reports/coupons/totals`). */
  async couponTotals<T = unknown>(options?: RequestOptions): Promise<T> {
    return this.client.request<T>("GET", "/reports/coupons/totals", options);
  }

  /** Stok raporu (`/reports/products/totals` benzeri custom endpoint'ler için escape hatch). */
  async custom<T = unknown>(
    path: string,
    query: Record<string, unknown> = {},
    options?: RequestOptions,
  ): Promise<T> {
    const cleanPath = path.startsWith("/") ? path : `/${path}`;
    return this.client.request<T>("GET", `/reports${cleanPath}`, { query, ...options });
  }
}
