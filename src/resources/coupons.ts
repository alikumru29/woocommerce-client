import { z } from "zod";
import type { WooCommerceClient } from "../client.js";
import { extractPaginationMeta, paginate } from "../pagination.js";
import type { ListQuery, ListResult, RequestOptions } from "../types/common.js";
import { parseArray, parseOne } from "./_helpers.js";

/**
 * Coupons resource — kupon CRUD.
 *
 * Endpoints: https://woocommerce.github.io/woocommerce-rest-api-docs/#coupons
 */

export const CouponDiscountTypeSchema = z.enum([
  "percent",
  "fixed_cart",
  "fixed_product",
]);
export type CouponDiscountType = z.infer<typeof CouponDiscountTypeSchema>;

export const CouponSchema = z
  .object({
    id: z.number(),
    code: z.string(),
    amount: z.string().optional(),
    date_created: z.string().nullable().optional(),
    date_modified: z.string().nullable().optional(),
    discount_type: CouponDiscountTypeSchema.optional(),
    description: z.string().optional(),
    date_expires: z.string().nullable().optional(),
    usage_count: z.number().optional(),
    individual_use: z.boolean().optional(),
    product_ids: z.array(z.number()).optional(),
    excluded_product_ids: z.array(z.number()).optional(),
    usage_limit: z.number().nullable().optional(),
    usage_limit_per_user: z.number().nullable().optional(),
    limit_usage_to_x_items: z.number().nullable().optional(),
    free_shipping: z.boolean().optional(),
    product_categories: z.array(z.number()).optional(),
    excluded_product_categories: z.array(z.number()).optional(),
    exclude_sale_items: z.boolean().optional(),
    minimum_amount: z.string().optional(),
    maximum_amount: z.string().optional(),
    email_restrictions: z.array(z.string()).optional(),
    used_by: z.array(z.string()).optional(),
    meta_data: z
      .array(z.object({ id: z.number().optional(), key: z.string(), value: z.unknown() }))
      .optional(),
  })
  .passthrough();

export type Coupon = z.infer<typeof CouponSchema>;

export interface CouponCreateInput {
  code: string;
  discount_type?: CouponDiscountType;
  amount?: string;
  description?: string;
  date_expires?: string | null;
  individual_use?: boolean;
  product_ids?: number[];
  excluded_product_ids?: number[];
  usage_limit?: number | null;
  usage_limit_per_user?: number | null;
  free_shipping?: boolean;
  product_categories?: number[];
  excluded_product_categories?: number[];
  exclude_sale_items?: boolean;
  minimum_amount?: string;
  maximum_amount?: string;
  email_restrictions?: string[];
  meta_data?: Array<{ key: string; value: unknown }>;
}
export type CouponUpdateInput = Partial<CouponCreateInput>;

export interface CouponListQuery extends ListQuery {
  code?: string;
}

/** Coupons resource service. */
export class CouponsService {
  constructor(private readonly client: WooCommerceClient) {}

  async list(
    query: CouponListQuery = {},
    options?: RequestOptions,
  ): Promise<ListResult<Coupon>> {
    const page = query.page ?? 1;
    const perPage = query.per_page ?? 10;
    const response = await this.client.requestRaw<unknown[]>("GET", "/coupons", {
      query: { ...query, page, per_page: perPage },
      ...options,
    });
    return {
      data: parseArray(CouponSchema, response.body, "/coupons"),
      meta: extractPaginationMeta(response, page, perPage),
    };
  }

  iterate(query: CouponListQuery = {}, options?: RequestOptions): AsyncGenerator<Coupon> {
    const perPage = query.per_page ?? 100;
    return paginate<Coupon>((page) =>
      this.list({ ...query, page, per_page: perPage }, options),
    );
  }

  async get(id: number, options?: RequestOptions): Promise<Coupon> {
    const body = await this.client.request<unknown>("GET", `/coupons/${id}`, options);
    return parseOne(CouponSchema, body, `/coupons/${id}`);
  }

  async create(input: CouponCreateInput, options?: RequestOptions): Promise<Coupon> {
    const body = await this.client.request<unknown>("POST", "/coupons", {
      body: input,
      ...options,
    });
    return parseOne(CouponSchema, body, "/coupons");
  }

  async update(id: number, input: CouponUpdateInput, options?: RequestOptions): Promise<Coupon> {
    const body = await this.client.request<unknown>("PUT", `/coupons/${id}`, {
      body: input,
      ...options,
    });
    return parseOne(CouponSchema, body, `/coupons/${id}`);
  }

  async delete(
    id: number,
    opts: { force?: boolean } = {},
    options?: RequestOptions,
  ): Promise<Coupon> {
    const body = await this.client.request<unknown>("DELETE", `/coupons/${id}`, {
      query: opts.force ? { force: true } : undefined,
      ...options,
    });
    return parseOne(CouponSchema, body, `/coupons/${id}`);
  }
}
