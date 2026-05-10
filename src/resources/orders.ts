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
    first_name: z.string().optional(),
    last_name: z.string().optional(),
    company: z.string().optional(),
    address_1: z.string().optional(),
    address_2: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    postcode: z.string().optional(),
    country: z.string().optional(),
    email: z.string().optional(),
    phone: z.string().optional(),
  })
  .passthrough();

const LineItemSchema = z
  .object({
    id: z.number().optional(),
    name: z.string().optional(),
    product_id: z.number().optional(),
    variation_id: z.number().optional(),
    quantity: z.number().optional(),
    tax_class: z.string().optional(),
    subtotal: z.string().optional(),
    subtotal_tax: z.string().optional(),
    total: z.string().optional(),
    total_tax: z.string().optional(),
    sku: z.string().optional(),
    price: z.union([z.string(), z.number()]).optional(),
  })
  .passthrough();

const ShippingLineSchema = z
  .object({
    id: z.number().optional(),
    method_title: z.string().optional(),
    method_id: z.string().optional(),
    instance_id: z.string().optional(),
    total: z.string().optional(),
    total_tax: z.string().optional(),
  })
  .passthrough();

const FeeLineSchema = z
  .object({
    id: z.number().optional(),
    name: z.string().optional(),
    tax_class: z.string().optional(),
    tax_status: z.string().optional(),
    total: z.string().optional(),
    total_tax: z.string().optional(),
  })
  .passthrough();

const CouponLineSchema = z
  .object({
    id: z.number().optional(),
    code: z.string().optional(),
    discount: z.string().optional(),
    discount_tax: z.string().optional(),
  })
  .passthrough();

const RefundReferenceSchema = z
  .object({
    id: z.number(),
    reason: z.string().optional(),
    total: z.string().optional(),
  })
  .passthrough();

export const OrderSchema = z
  .object({
    id: z.number(),
    parent_id: z.number().optional(),
    number: z.string().optional(),
    order_key: z.string().optional(),
    created_via: z.string().optional(),
    version: z.string().optional(),
    status: OrderStatusSchema.optional(),
    currency: z.string().optional(),
    date_created: z.string().nullable().optional(),
    date_modified: z.string().nullable().optional(),
    discount_total: z.string().optional(),
    discount_tax: z.string().optional(),
    shipping_total: z.string().optional(),
    shipping_tax: z.string().optional(),
    cart_tax: z.string().optional(),
    total: z.string().optional(),
    total_tax: z.string().optional(),
    prices_include_tax: z.boolean().optional(),
    customer_id: z.number().optional(),
    customer_ip_address: z.string().optional(),
    customer_user_agent: z.string().optional(),
    customer_note: z.string().optional(),
    billing: AddressSchema.optional(),
    shipping: AddressSchema.optional(),
    payment_method: z.string().optional(),
    payment_method_title: z.string().optional(),
    transaction_id: z.string().optional(),
    date_paid: z.string().nullable().optional(),
    date_completed: z.string().nullable().optional(),
    cart_hash: z.string().optional(),
    meta_data: z
      .array(z.object({ id: z.number().optional(), key: z.string(), value: z.unknown() }))
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
    author: z.string().optional(),
    date_created: z.string().optional(),
    note: z.string(),
    customer_note: z.boolean().optional(),
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
