import { z } from "zod";
import type { WooCommerceClient } from "../client.js";
import type { ListQuery, ListResult, RequestOptions } from "../types/common.js";
export declare const RefundSchema: z.ZodObject<{
    id: z.ZodNumber;
    date_created: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    amount: z.ZodOptional<z.ZodString>;
    reason: z.ZodOptional<z.ZodString>;
    refunded_by: z.ZodOptional<z.ZodNumber>;
    refunded_payment: z.ZodOptional<z.ZodBoolean>;
    meta_data: z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodOptional<z.ZodNumber>;
        key: z.ZodString;
        value: z.ZodUnknown;
    }, "strip", z.ZodTypeAny, {
        key: string;
        value?: unknown;
        id?: number | undefined;
    }, {
        key: string;
        value?: unknown;
        id?: number | undefined;
    }>, "many">>;
    line_items: z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodOptional<z.ZodNumber>;
        name: z.ZodOptional<z.ZodString>;
        product_id: z.ZodOptional<z.ZodNumber>;
        variation_id: z.ZodOptional<z.ZodNumber>;
        quantity: z.ZodOptional<z.ZodNumber>;
        refund_total: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
        total: z.ZodOptional<z.ZodString>;
        total_tax: z.ZodOptional<z.ZodString>;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        id: z.ZodOptional<z.ZodNumber>;
        name: z.ZodOptional<z.ZodString>;
        product_id: z.ZodOptional<z.ZodNumber>;
        variation_id: z.ZodOptional<z.ZodNumber>;
        quantity: z.ZodOptional<z.ZodNumber>;
        refund_total: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
        total: z.ZodOptional<z.ZodString>;
        total_tax: z.ZodOptional<z.ZodString>;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        id: z.ZodOptional<z.ZodNumber>;
        name: z.ZodOptional<z.ZodString>;
        product_id: z.ZodOptional<z.ZodNumber>;
        variation_id: z.ZodOptional<z.ZodNumber>;
        quantity: z.ZodOptional<z.ZodNumber>;
        refund_total: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
        total: z.ZodOptional<z.ZodString>;
        total_tax: z.ZodOptional<z.ZodString>;
    }, z.ZodTypeAny, "passthrough">>, "many">>;
}, "passthrough", z.ZodTypeAny, z.objectOutputType<{
    id: z.ZodNumber;
    date_created: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    amount: z.ZodOptional<z.ZodString>;
    reason: z.ZodOptional<z.ZodString>;
    refunded_by: z.ZodOptional<z.ZodNumber>;
    refunded_payment: z.ZodOptional<z.ZodBoolean>;
    meta_data: z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodOptional<z.ZodNumber>;
        key: z.ZodString;
        value: z.ZodUnknown;
    }, "strip", z.ZodTypeAny, {
        key: string;
        value?: unknown;
        id?: number | undefined;
    }, {
        key: string;
        value?: unknown;
        id?: number | undefined;
    }>, "many">>;
    line_items: z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodOptional<z.ZodNumber>;
        name: z.ZodOptional<z.ZodString>;
        product_id: z.ZodOptional<z.ZodNumber>;
        variation_id: z.ZodOptional<z.ZodNumber>;
        quantity: z.ZodOptional<z.ZodNumber>;
        refund_total: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
        total: z.ZodOptional<z.ZodString>;
        total_tax: z.ZodOptional<z.ZodString>;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        id: z.ZodOptional<z.ZodNumber>;
        name: z.ZodOptional<z.ZodString>;
        product_id: z.ZodOptional<z.ZodNumber>;
        variation_id: z.ZodOptional<z.ZodNumber>;
        quantity: z.ZodOptional<z.ZodNumber>;
        refund_total: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
        total: z.ZodOptional<z.ZodString>;
        total_tax: z.ZodOptional<z.ZodString>;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        id: z.ZodOptional<z.ZodNumber>;
        name: z.ZodOptional<z.ZodString>;
        product_id: z.ZodOptional<z.ZodNumber>;
        variation_id: z.ZodOptional<z.ZodNumber>;
        quantity: z.ZodOptional<z.ZodNumber>;
        refund_total: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
        total: z.ZodOptional<z.ZodString>;
        total_tax: z.ZodOptional<z.ZodString>;
    }, z.ZodTypeAny, "passthrough">>, "many">>;
}, z.ZodTypeAny, "passthrough">, z.objectInputType<{
    id: z.ZodNumber;
    date_created: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    amount: z.ZodOptional<z.ZodString>;
    reason: z.ZodOptional<z.ZodString>;
    refunded_by: z.ZodOptional<z.ZodNumber>;
    refunded_payment: z.ZodOptional<z.ZodBoolean>;
    meta_data: z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodOptional<z.ZodNumber>;
        key: z.ZodString;
        value: z.ZodUnknown;
    }, "strip", z.ZodTypeAny, {
        key: string;
        value?: unknown;
        id?: number | undefined;
    }, {
        key: string;
        value?: unknown;
        id?: number | undefined;
    }>, "many">>;
    line_items: z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodOptional<z.ZodNumber>;
        name: z.ZodOptional<z.ZodString>;
        product_id: z.ZodOptional<z.ZodNumber>;
        variation_id: z.ZodOptional<z.ZodNumber>;
        quantity: z.ZodOptional<z.ZodNumber>;
        refund_total: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
        total: z.ZodOptional<z.ZodString>;
        total_tax: z.ZodOptional<z.ZodString>;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        id: z.ZodOptional<z.ZodNumber>;
        name: z.ZodOptional<z.ZodString>;
        product_id: z.ZodOptional<z.ZodNumber>;
        variation_id: z.ZodOptional<z.ZodNumber>;
        quantity: z.ZodOptional<z.ZodNumber>;
        refund_total: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
        total: z.ZodOptional<z.ZodString>;
        total_tax: z.ZodOptional<z.ZodString>;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        id: z.ZodOptional<z.ZodNumber>;
        name: z.ZodOptional<z.ZodString>;
        product_id: z.ZodOptional<z.ZodNumber>;
        variation_id: z.ZodOptional<z.ZodNumber>;
        quantity: z.ZodOptional<z.ZodNumber>;
        refund_total: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
        total: z.ZodOptional<z.ZodString>;
        total_tax: z.ZodOptional<z.ZodString>;
    }, z.ZodTypeAny, "passthrough">>, "many">>;
}, z.ZodTypeAny, "passthrough">>;
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
        refund_tax?: Array<{
            id?: number;
            refund_total?: number | string;
        }>;
    }>;
    meta_data?: Array<{
        key: string;
        value: unknown;
    }>;
}
/** Refunds resource service. */
export declare class RefundsService {
    private readonly client;
    constructor(client: WooCommerceClient);
    /**
     * Bir siparişin refund'larını listeler.
     */
    list(orderId: number, query?: ListQuery, options?: RequestOptions): Promise<ListResult<Refund>>;
    get(orderId: number, refundId: number, options?: RequestOptions): Promise<Refund>;
    create(orderId: number, input: RefundCreateInput, options?: RequestOptions): Promise<Refund>;
    delete(orderId: number, refundId: number, opts?: {
        force?: boolean;
    }, options?: RequestOptions): Promise<Refund>;
    /**
     * Cross-order refund listesi (`/refunds`). WooCommerce'in REST cross-order endpoint'i.
     */
    listAll(query?: ListQuery, options?: RequestOptions): Promise<ListResult<Refund>>;
}
//# sourceMappingURL=refunds.d.ts.map