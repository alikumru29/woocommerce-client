import { z } from "zod";
import type { WooCommerceClient } from "../client.js";
import { extractPaginationMeta } from "../pagination.js";
import type { ListQuery, ListResult, RequestOptions } from "../types/common.js";
import { parseArray, parseOne } from "./_helpers.js";

/**
 * Refunds resource — sipariş bazında refund CRUD + cross-order list.
 *
 * Endpoints: https://woocommerce.github.io/woocommerce-rest-api-docs/#refunds
 */

const RefundLineItemSchema = z
  .object({
    id: z.number().optional(),
    name: z.string().optional(),
    product_id: z.number().optional(),
    variation_id: z.number().optional(),
    quantity: z.number().optional(),
    refund_total: z.union([z.string(), z.number()]).optional(),
    total: z.string().optional(),
    total_tax: z.string().optional(),
  })
  .passthrough();

export const RefundSchema = z
  .object({
    id: z.number(),
    date_created: z.string().nullable().optional(),
    amount: z.string().optional(),
    reason: z.string().optional(),
    refunded_by: z.number().optional(),
    refunded_payment: z.boolean().optional(),
    meta_data: z
      .array(z.object({ id: z.number().optional(), key: z.string(), value: z.unknown() }))
      .optional(),
    line_items: z.array(RefundLineItemSchema).optional(),
  })
  .passthrough();
export type Refund = z.infer<typeof RefundSchema>;

export interface RefundCreateInput {
  amount?: string;
  reason?: string;
  refunded_by?: number;
  refunded_payment?: boolean;
  api_refund?: boolean;
  api_restock?: boolean;
  line_items?: Array<{
    id?: number;
    quantity?: number;
    refund_total?: number | string;
    refund_tax?: Array<{ id?: number; refund_total?: number | string }>;
  }>;
  meta_data?: Array<{ key: string; value: unknown }>;
}

/** Refunds resource service. */
export class RefundsService {
  constructor(private readonly client: WooCommerceClient) {}

  /**
   * Bir siparişin refund'larını listeler.
   */
  async list(
    orderId: number,
    query: ListQuery = {},
    options?: RequestOptions,
  ): Promise<ListResult<Refund>> {
    const page = query.page ?? 1;
    const perPage = query.per_page ?? 10;
    const response = await this.client.requestRaw<unknown[]>(
      "GET",
      `/orders/${orderId}/refunds`,
      { query: { ...query, page, per_page: perPage }, ...options },
    );
    return {
      data: parseArray(RefundSchema, response.body, `/orders/${orderId}/refunds`),
      meta: extractPaginationMeta(response, page, perPage),
    };
  }

  async get(orderId: number, refundId: number, options?: RequestOptions): Promise<Refund> {
    const body = await this.client.request<unknown>(
      "GET",
      `/orders/${orderId}/refunds/${refundId}`,
      options,
    );
    return parseOne(RefundSchema, body, `/orders/${orderId}/refunds/${refundId}`);
  }

  async create(
    orderId: number,
    input: RefundCreateInput,
    options?: RequestOptions,
  ): Promise<Refund> {
    const body = await this.client.request<unknown>("POST", `/orders/${orderId}/refunds`, {
      body: input,
      ...options,
    });
    return parseOne(RefundSchema, body, `/orders/${orderId}/refunds`);
  }

  async delete(
    orderId: number,
    refundId: number,
    opts: { force?: boolean } = {},
    options?: RequestOptions,
  ): Promise<Refund> {
    const body = await this.client.request<unknown>(
      "DELETE",
      `/orders/${orderId}/refunds/${refundId}`,
      { query: opts.force ? { force: true } : undefined, ...options },
    );
    return parseOne(RefundSchema, body, `/orders/${orderId}/refunds/${refundId}`);
  }

  /**
   * Cross-order refund listesi (`/refunds`). WooCommerce'in REST cross-order endpoint'i.
   */
  async listAll(query: ListQuery = {}, options?: RequestOptions): Promise<ListResult<Refund>> {
    const page = query.page ?? 1;
    const perPage = query.per_page ?? 10;
    const response = await this.client.requestRaw<unknown[]>("GET", "/refunds", {
      query: { ...query, page, per_page: perPage },
      ...options,
    });
    return {
      data: parseArray(RefundSchema, response.body, "/refunds"),
      meta: extractPaginationMeta(response, page, perPage),
    };
  }
}
