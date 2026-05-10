import type { WooCommerceClient } from "../client.js";
import type { RequestOptions } from "../types/common.js";

/**
 * Payment Gateways resource — generic typed.
 *
 * Endpoints: https://woocommerce.github.io/woocommerce-rest-api-docs/#payment-gateways
 */

export class PaymentGatewaysService {
  constructor(private readonly client: WooCommerceClient) {}

  list<T = unknown>(options?: RequestOptions): Promise<T> {
    return this.client.request<T>("GET", "/payment_gateways", options);
  }

  get<T = unknown>(id: string, options?: RequestOptions): Promise<T> {
    return this.client.request<T>("GET", `/payment_gateways/${id}`, options);
  }

  update<T = unknown>(
    id: string,
    input: Record<string, unknown>,
    options?: RequestOptions,
  ): Promise<T> {
    return this.client.request<T>("PUT", `/payment_gateways/${id}`, {
      body: input,
      ...options,
    });
  }
}
