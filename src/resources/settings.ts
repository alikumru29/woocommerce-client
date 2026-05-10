import type { WooCommerceClient } from "../client.js";
import type { RequestOptions } from "../types/common.js";

/**
 * Settings resource — generic typed.
 *
 * WooCommerce ayarları gruplara ayrılmıştır (general, products, tax, ...).
 * Her grup birden çok setting içerir.
 *
 * Endpoints: https://woocommerce.github.io/woocommerce-rest-api-docs/#settings
 */

export class SettingsService {
  constructor(private readonly client: WooCommerceClient) {}

  /** Tüm setting gruplarını listeler. */
  listGroups<T = unknown>(options?: RequestOptions): Promise<T> {
    return this.client.request<T>("GET", "/settings", options);
  }

  /** Bir gruptaki tüm setting'leri listeler. */
  listOptions<T = unknown>(groupId: string, options?: RequestOptions): Promise<T> {
    return this.client.request<T>("GET", `/settings/${groupId}`, options);
  }

  /** Tek bir setting'i okur. */
  getOption<T = unknown>(
    groupId: string,
    optionId: string,
    options?: RequestOptions,
  ): Promise<T> {
    return this.client.request<T>("GET", `/settings/${groupId}/${optionId}`, options);
  }

  /** Tek bir setting'i günceller. */
  updateOption<T = unknown>(
    groupId: string,
    optionId: string,
    input: { value: unknown },
    options?: RequestOptions,
  ): Promise<T> {
    return this.client.request<T>("PUT", `/settings/${groupId}/${optionId}`, {
      body: input,
      ...options,
    });
  }

  /** Bir gruptaki birden çok setting'i topluca günceller (batch). */
  batchUpdate<T = unknown>(
    groupId: string,
    input: { update?: Array<{ id: string; value: unknown }> },
    options?: RequestOptions,
  ): Promise<T> {
    return this.client.request<T>("POST", `/settings/${groupId}/batch`, {
      body: input,
      ...options,
    });
  }
}
