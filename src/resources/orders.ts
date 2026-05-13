import { z } from "zod";
import type { WooCommerceClient } from "../client.js";
import { extractPaginationMeta, paginate } from "../pagination.js";
import type { ListQuery, ListResult, RequestOptions } from "../types/common.js";
import { parseArray, parseOne } from "./_helpers.js";

/**
 * Orders resource — sipariş, sipariş notları, sipariş iadeleri.
 *
 * Endpoints: https://woocommerce.github.io/woocommerce-rest-api-docs/#orders
 */

export const OrderStatusSchema = z.enum([
  "pending",
  "processing",
  "on-hold",
  "completed",
  "cancelled",
  "refunded",
  "failed",
  "trash",
]);
export type OrderStatus = z.infer<typeof OrderStatusSchema>;

const AddressSchema = z
  .object({
    first_name: z.string().nullable().optional(),
    last_name: z.string().nullable().optional(),
    company: z.string().nullable().optional(),
    address_1: z.string().nullable().optional(),
    address_2: z.string().nullable().optional(),
    city: z.string().nullable().optional(),
    state: z.string().nullable().optional(),
    postcode: z.string().nullable().optional(),
    country: z.string().nullable().optional(),
    email: z.string().nullable().optional(),
    phone: z.string().nullable().optional(),
  })
  .passthrough();

const LineItemSchema = z
  .object({
    id: z.number().nullable().optional(),
    name: z.string().nullable().optional(),
    product_id: z.number().nullable().optional(),
    variation_id: z.number().nullable().optional(),
    quantity: z.number().nullable().optional(),
    tax_class: z.string().nullable().optional(),
    subtotal: z.string().nullable().optional(),
    subtotal_tax: z.string().nullable().optional(),
    total: z.string().nullable().optional(),
    total_tax: z.string().nullable().optional(),
    sku: z.string().nullable().optional(),
    price: z.union([z.string(), z.number()]).optional(),
  })
  .passthrough();

const ShippingLineSchema = z
  .object({
    id: z.number().nullable().optional(),
    method_title: z.string().nullable().optional(),
    method_id: z.string().nullable().optional(),
    instance_id: z.string().nullable().optional(),
    total: z.string().nullable().optional(),
    total_tax: z.string().nullable().optional(),
  })
  .passthrough();

const FeeLineSchema = z
  .object({
    id: z.number().nullable().optional(),
    name: z.string().nullable().optional(),
    tax_class: z.string().nullable().optional(),
    tax_status: z.string().nullable().optional(),
    total: z.string().nullable().optional(),
    total_tax: z.string().nullable().optional(),
  })
  .passthrough();

const CouponLineSchema = z
  .object({
    id: z.number().nullable().optional(),
    code: z.string().nullable().optional(),
    discount: z.string().nullable().optional(),
    discount_tax: z.string().nullable().optional(),
  })
  .passthrough();

const RefundReferenceSchema = z
  .object({
    id: z.number(),
    reason: z.string().nullable().optional(),
    total: z.string().nullable().optional(),
  })
  .passthrough();

export const OrderSchema = z
  .object({
    id: z.number(),
    parent_id: z.number().nullable().optional(),
    number: z.string().nullable().optional(),
    order_key: z.string().nullable().optional(),
    created_via: z.string().nullable().optional(),
    version: z.string().nullable().optional(),
    status: OrderStatusSchema.optional(),
    currency: z.string().nullable().optional(),
    date_created: z.string().nullable().optional(),
    date_modified: z.string().nullable().optional(),
    discount_total: z.string().nullable().optional(),
    discount_tax: z.string().nullable().optional(),
    shipping_total: z.string().nullable().optional(),
    shipping_tax: z.string().nullable().optional(),
    cart_tax: z.string().nullable().optional(),
    total: z.string().nullable().optional(),
    total_tax: z.string().nullable().optional(),
    prices_include_tax: z.boolean().nullable().optional(),
    customer_id: z.number().nullable().optional(),
    customer_ip_address: z.string().nullable().optional(),
    customer_user_agent: z.string().nullable().optional(),
    customer_note: z.string().nullable().optional(),
    billing: AddressSchema.optional(),
    shipping: AddressSchema.optional(),
    payment_method: z.string().nullable().optional(),
    payment_method_title: z.string().nullable().optional(),
    transaction_id: z.string().nullable().optional(),
    date_paid: z.string().nullable().optional(),
    date_completed: z.string().nullable().optional(),
    cart_hash: z.string().nullable().optional(),
    meta_data: z
      .array(z.object({ id: z.number().nullable().optional(), key: z.string(), value: z.unknown() }))
      .optional(),
    line_items: z.array(LineItemSchema).optional(),
    tax_lines: z.array(z.unknown()).optional(),
    shipping_lines: z.array(ShippingLineSchema).optional(),
    fee_lines: z.array(FeeLineSchema).optional(),
    coupon_lines: z.array(CouponLineSchema).optional(),
    refunds: z.array(RefundReferenceSchema).optional(),
  })
  .passthrough();

export type Order = z.infer<typeof OrderSchema>;
export type OrderCreateInput = Partial<Omit<Order, "id">>;
export type OrderUpdateInput = Partial<Omit<Order, "id">>;

export interface OrderListQuery extends ListQuery {
  status?: OrderStatus | OrderStatus[] | "any";
  customer?: number;
  product?: number;
  dp?: number;
}

export const OrderNoteSchema = z
  .object({
    id: z.number(),
    author: z.string().nullable().optional(),
    date_created: z.string().nullable().optional(),
    note: z.string(),
    customer_note: z.boolean().nullable().optional(),
  })
  .passthrough();
export type OrderNote = z.infer<typeof OrderNoteSchema>;

/** Orders resource service. */
export class OrdersService {
  constructor(private readonly client: WooCommerceClient) {}

  async list(
    query: OrderListQuery = {},
    options?: RequestOptions,
  ): Promise<ListResult<Order>> {
    const page = query.page ?? 1;
    const perPage = query.per_page ?? 10;
    const response = await this.client.requestRaw<unknown[]>("GET", "/orders", {
      query: { ...query, page, per_page: perPage },
      ...options,
    });
    return {
      data: parseArray(OrderSchema, response.body, "/orders"),
      meta: extractPaginationMeta(response, page, perPage),
    };
  }

  iterate(query: OrderListQuery = {}, options?: RequestOptions): AsyncGenerator<Order> {
    const perPage = query.per_page ?? 100;
    return paginate<Order>((page) =>
      this.list({ ...query, page, per_page: perPage }, options),
    );
  }

  async get(id: number, options?: RequestOptions): Promise<Order> {
    const body = await this.client.request<unknown>("GET", `/orders/${id}`, options);
    return parseOne(OrderSchema, body, `/orders/${id}`);
  }

  async create(input: OrderCreateInput, options?: RequestOptions): Promise<Order> {
    const body = await this.client.request<unknown>("POST", "/orders", {
      body: input,
      ...options,
    });
    return parseOne(OrderSchema, body, "/orders");
  }

  async update(id: number, input: OrderUpdateInput, options?: RequestOptions): Promise<Order> {
    const body = await this.client.request<unknown>("PUT", `/orders/${id}`, {
      body: input,
      ...options,
    });
    return parseOne(OrderSchema, body, `/orders/${id}`);
  }

  async delete(
    id: number,
    opts: { force?: boolean } = {},
    options?: RequestOptions,
  ): Promise<Order> {
    const body = await this.client.request<unknown>("DELETE", `/orders/${id}`, {
      query: opts.force ? { force: true } : undefined,
      ...options,
    });
    return parseOne(OrderSchema, body, `/orders/${id}`);
  }

  // --- Order Notes ---

  async listNotes(
    orderId: number,
    query: ListQuery = {},
    options?: RequestOptions,
  ): Promise<OrderNote[]> {
    const body = await this.client.request<unknown>("GET", `/orders/${orderId}/notes`, {
      query,
      ...options,
    });
    return parseArray(OrderNoteSchema, body, `/orders/${orderId}/notes`);
  }

  async addNote(
    orderId: number,
    input: { note: string; customer_note?: boolean; added_by_user?: boolean },
    options?: RequestOptions,
  ): Promise<OrderNote> {
    const body = await this.client.request<unknown>("POST", `/orders/${orderId}/notes`, {
      body: input,
      ...options,
    });
    return parseOne(OrderNoteSchema, body, `/orders/${orderId}/notes`);
  }

  async deleteNote(
    orderId: number,
    noteId: number,
    options?: RequestOptions,
  ): Promise<OrderNote> {
    const body = await this.client.request<unknown>(
      "DELETE",
      `/orders/${orderId}/notes/${noteId}`,
      { query: { force: true }, ...options },
    );
    return parseOne(OrderNoteSchema, body, `/orders/${orderId}/notes/${noteId}`);
  }
}
