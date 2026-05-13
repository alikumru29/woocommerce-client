import { z } from "zod";
import { extractPaginationMeta, paginate } from "../pagination.js";
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
export const CouponSchema = z
    .object({
    id: z.number(),
    code: z.string(),
    amount: z.string().nullable().optional(),
    date_created: z.string().nullable().optional(),
    date_modified: z.string().nullable().optional(),
    discount_type: CouponDiscountTypeSchema.optional(),
    description: z.string().nullable().optional(),
    date_expires: z.string().nullable().optional(),
    usage_count: z.number().nullable().optional(),
    individual_use: z.boolean().nullable().optional(),
    product_ids: z.array(z.number()).optional(),
    excluded_product_ids: z.array(z.number()).optional(),
    usage_limit: z.number().nullable().optional(),
    usage_limit_per_user: z.number().nullable().optional(),
    limit_usage_to_x_items: z.number().nullable().optional(),
    free_shipping: z.boolean().nullable().optional(),
    product_categories: z.array(z.number()).optional(),
    excluded_product_categories: z.array(z.number()).optional(),
    exclude_sale_items: z.boolean().nullable().optional(),
    minimum_amount: z.string().nullable().optional(),
    maximum_amount: z.string().nullable().optional(),
    email_restrictions: z.array(z.string()).optional(),
    used_by: z.array(z.string()).optional(),
    meta_data: z
        .array(z.object({ id: z.number().nullable().optional(), key: z.string(), value: z.unknown() }))
        .optional(),
})
    .passthrough();
/** Coupons resource service. */
export class CouponsService {
    client;
    constructor(client) {
        this.client = client;
    }
    async list(query = {}, options) {
        const page = query.page ?? 1;
        const perPage = query.per_page ?? 10;
        const response = await this.client.requestRaw("GET", "/coupons", {
            query: { ...query, page, per_page: perPage },
            ...options,
        });
        return {
            data: parseArray(CouponSchema, response.body, "/coupons"),
            meta: extractPaginationMeta(response, page, perPage),
        };
    }
    iterate(query = {}, options) {
        const perPage = query.per_page ?? 100;
        return paginate((page) => this.list({ ...query, page, per_page: perPage }, options));
    }
    async get(id, options) {
        const body = await this.client.request("GET", `/coupons/${id}`, options);
        return parseOne(CouponSchema, body, `/coupons/${id}`);
    }
    async create(input, options) {
        const body = await this.client.request("POST", "/coupons", {
            body: input,
            ...options,
        });
        return parseOne(CouponSchema, body, "/coupons");
    }
    async update(id, input, options) {
        const body = await this.client.request("PUT", `/coupons/${id}`, {
            body: input,
            ...options,
        });
        return parseOne(CouponSchema, body, `/coupons/${id}`);
    }
    async delete(id, opts = {}, options) {
        const body = await this.client.request("DELETE", `/coupons/${id}`, {
            query: opts.force ? { force: true } : undefined,
            ...options,
        });
        return parseOne(CouponSchema, body, `/coupons/${id}`);
    }
}
//# sourceMappingURL=coupons.js.map