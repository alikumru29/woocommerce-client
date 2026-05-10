import type { WooCommerceClient } from "../client.js";
import type { ListQuery, RequestOptions } from "../types/common.js";

/**
 * Webhooks resource — generic typed.
 *
 * NOT: Bu sınıf yalnızca WooCommerce'teki webhook KAYITLARINI yönetir
 * (CRUD). Webhook'ları KARŞILAYIP işleme bu repo'nun kapsamı dışında —
 * o iş için ayrı bir handler servisi gerekir.
 *
 * Endpoints: https://woocommerce.github.io/woocommerce-rest-api-docs/#webhooks
 */

export class WebhooksService {
  constructor(private readonly client: WooCommerceClient) {}

  list<T = unknown>(query: ListQuery = {}, options?: RequestOptions): Promise<T> {
    return this.client.request<T>("GET", "/webhooks", { query, ...options });
  }

  get<T = unknown>(id: number, options?: RequestOptions): Promise<T> {
    return this.client.request<T>("GET", `/webhooks/${id}`, options);
  }

  create<T = unknown>(
    input: {
      name?: string;
      topic: string;
      delivery_url: string;
      secret?: string;
      status?: "active" | "paused" | "disabled";
    },
    options?: RequestOptions,
  ): Promise<T> {
    return this.client.request<T>("POST", "/webhooks", { body: input, ...options });
  }

  update<T = unknown>(
    id: number,
    input: Record<string, unknown>,
    options?: RequestOptions,
  ): Promise<T> {
    return this.client.request<T>("PUT", `/webhooks/${id}`, { body: input, ...options });
  }

  delete<T = unknown>(
    id: number,
    opts: { force?: boolean } = {},
    options?: RequestOptions,
  ): Promise<T> {
    return this.client.request<T>("DELETE", `/webhooks/${id}`, {
      query: opts.force ? { force: true } : undefined,
      ...options,
    });
  }
}
