import type { WooCommerceClient } from "../client.js";
import type { ListQuery, RequestOptions } from "../types/common.js";

/**
 * Tax resource — generic typed.
 *
 * Kapsama: tax classes (`/taxes/classes`) + tax rates (`/taxes`).
 * Endpoints: https://woocommerce.github.io/woocommerce-rest-api-docs/#tax-classes
 *            https://woocommerce.github.io/woocommerce-rest-api-docs/#tax-rates
 */

export class TaxService {
  constructor(private readonly client: WooCommerceClient) {}

  // --- Tax Classes ---

  listClasses<T = unknown>(options?: RequestOptions): Promise<T> {
    return this.client.request<T>("GET", "/taxes/classes", options);
  }

  createClass<T = unknown>(input: { name: string }, options?: RequestOptions): Promise<T> {
    return this.client.request<T>("POST", "/taxes/classes", { body: input, ...options });
  }

  deleteClass<T = unknown>(slug: string, options?: RequestOptions): Promise<T> {
    return this.client.request<T>("DELETE", `/taxes/classes/${slug}`, {
      query: { force: true },
      ...options,
    });
  }

  // --- Tax Rates ---

  listRates<T = unknown>(query: ListQuery = {}, options?: RequestOptions): Promise<T> {
    return this.client.request<T>("GET", "/taxes", { query, ...options });
  }

  getRate<T = unknown>(id: number, options?: RequestOptions): Promise<T> {
    return this.client.request<T>("GET", `/taxes/${id}`, options);
  }

  createRate<T = unknown>(input: Record<string, unknown>, options?: RequestOptions): Promise<T> {
    return this.client.request<T>("POST", "/taxes", { body: input, ...options });
  }

  updateRate<T = unknown>(
    id: number,
    input: Record<string, unknown>,
    options?: RequestOptions,
  ): Promise<T> {
    return this.client.request<T>("PUT", `/taxes/${id}`, { body: input, ...options });
  }

  deleteRate<T = unknown>(
    id: number,
    opts: { force?: boolean } = {},
    options?: RequestOptions,
  ): Promise<T> {
    return this.client.request<T>("DELETE", `/taxes/${id}`, {
      query: opts.force ? { force: true } : undefined,
      ...options,
    });
  }
}
