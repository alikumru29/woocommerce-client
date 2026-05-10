import type { WooCommerceClient } from "../client.js";
import type { RequestOptions } from "../types/common.js";

/**
 * System Status resource — generic typed.
 *
 * Endpoints: https://woocommerce.github.io/woocommerce-rest-api-docs/#system-status
 */

export class SystemService {
  constructor(private readonly client: WooCommerceClient) {}

  /** Sunucu/WP/WooCommerce sürümleri ve yapılandırma bilgisi. */
  status<T = unknown>(options?: RequestOptions): Promise<T> {
    return this.client.request<T>("GET", "/system_status", options);
  }

  /** Mevcut bakım araçları. */
  listTools<T = unknown>(options?: RequestOptions): Promise<T> {
    return this.client.request<T>("GET", "/system_status/tools", options);
  }

  /** Bir bakım aracının detayı. */
  getTool<T = unknown>(id: string, options?: RequestOptions): Promise<T> {
    return this.client.request<T>("GET", `/system_status/tools/${id}`, options);
  }

  /** Bakım aracını çalıştırır. */
  runTool<T = unknown>(id: string, options?: RequestOptions): Promise<T> {
    return this.client.request<T>("PUT", `/system_status/tools/${id}`, options);
  }
}
