import { z } from "zod";
import { extractPaginationMeta } from "../pagination.js";
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
/** Refunds resource service. */
export class RefundsService {
    client;
    constructor(client) {
        this.client = client;
    }
    /**
     * Bir siparişin refund'larını listeler.
     */
    async list(orderId, query = {}, options) {
        const page = query.page ?? 1;
        const perPage = query.per_page ?? 10;
        const response = await this.client.requestRaw("GET", `/orders/${orderId}/refunds`, { query: { ...query, page, per_page: perPage }, ...options });
        return {
            data: parseArray(RefundSchema, response.body, `/orders/${orderId}/refunds`),
            meta: extractPaginationMeta(response, page, perPage),
        };
    }
    async get(orderId, refundId, options) {
        const body = await this.client.request("GET", `/orders/${orderId}/refunds/${refundId}`, options);
        return parseOne(RefundSchema, body, `/orders/${orderId}/refunds/${refundId}`);
    }
    async create(orderId, input, options) {
        const body = await this.client.request("POST", `/orders/${orderId}/refunds`, {
            body: input,
            ...options,
        });
        return parseOne(RefundSchema, body, `/orders/${orderId}/refunds`);
    }
    async delete(orderId, refundId, opts = {}, options) {
        const body = await this.client.request("DELETE", `/orders/${orderId}/refunds/${refundId}`, { query: opts.force ? { force: true } : undefined, ...options });
        return parseOne(RefundSchema, body, `/orders/${orderId}/refunds/${refundId}`);
    }
    /**
     * Cross-order refund listesi (`/refunds`). WooCommerce'in REST cross-order endpoint'i.
     */
    async listAll(query = {}, options) {
        const page = query.page ?? 1;
        const perPage = query.per_page ?? 10;
        const response = await this.client.requestRaw("GET", "/refunds", {
            query: { ...query, page, per_page: perPage },
            ...options,
        });
        return {
            data: parseArray(RefundSchema, response.body, "/refunds"),
            meta: extractPaginationMeta(response, page, perPage),
        };
    }
}
//# sourceMappingURL=refunds.js.map