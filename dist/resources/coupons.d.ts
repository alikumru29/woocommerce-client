import { z } from "zod";
import type { WooCommerceClient } from "../client.js";
import type { ListQuery, ListResult, RequestOptions } from "../types/common.js";
/**
 * Coupons resource — kupon CRUD.
 *
 * Endpoints: https://woocommerce.github.io/woocommerce-rest-api-docs/#coupons
 */
export declare const CouponDiscountTypeSchema: z.ZodEnum<["percent", "fixed_cart", "fixed_product"]>;
export type CouponDiscountType = z.infer<typeof CouponDiscountTypeSchema>;
export declare const CouponSchema: z.ZodObject<{
    id: z.ZodNumber;
    code: z.ZodString;
    amount: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    date_created: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    date_modified: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    discount_type: z.ZodOptional<z.ZodEnum<["percent", "fixed_cart", "fixed_product"]>>;
    description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    date_expires: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    usage_count: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    individual_use: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
    product_ids: z.ZodOptional<z.ZodArray<z.ZodNumber, "many">>;
    excluded_product_ids: z.ZodOptional<z.ZodArray<z.ZodNumber, "many">>;
    usage_limit: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    usage_limit_per_user: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    limit_usage_to_x_items: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    free_shipping: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
    product_categories: z.ZodOptional<z.ZodArray<z.ZodNumber, "many">>;
    excluded_product_categories: z.ZodOptional<z.ZodArray<z.ZodNumber, "many">>;
    exclude_sale_items: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
    minimum_amount: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    maximum_amount: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    email_restrictions: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    used_by: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    meta_data: z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        key: z.ZodString;
        value: z.ZodUnknown;
    }, "strip", z.ZodTypeAny, {
        key: string;
        value?: unknown;
        id?: number | null | undefined;
    }, {
        key: string;
        value?: unknown;
        id?: number | null | undefined;
    }>, "many">>;
}, "passthrough", z.ZodTypeAny, z.objectOutputType<{
    id: z.ZodNumber;
    code: z.ZodString;
    amount: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    date_created: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    date_modified: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    discount_type: z.ZodOptional<z.ZodEnum<["percent", "fixed_cart", "fixed_product"]>>;
    description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    date_expires: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    usage_count: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    individual_use: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
    product_ids: z.ZodOptional<z.ZodArray<z.ZodNumber, "many">>;
    excluded_product_ids: z.ZodOptional<z.ZodArray<z.ZodNumber, "many">>;
    usage_limit: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    usage_limit_per_user: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    limit_usage_to_x_items: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    free_shipping: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
    product_categories: z.ZodOptional<z.ZodArray<z.ZodNumber, "many">>;
    excluded_product_categories: z.ZodOptional<z.ZodArray<z.ZodNumber, "many">>;
    exclude_sale_items: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
    minimum_amount: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    maximum_amount: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    email_restrictions: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    used_by: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    meta_data: z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        key: z.ZodString;
        value: z.ZodUnknown;
    }, "strip", z.ZodTypeAny, {
        key: string;
        value?: unknown;
        id?: number | null | undefined;
    }, {
        key: string;
        value?: unknown;
        id?: number | null | undefined;
    }>, "many">>;
}, z.ZodTypeAny, "passthrough">, z.objectInputType<{
    id: z.ZodNumber;
    code: z.ZodString;
    amount: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    date_created: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    date_modified: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    discount_type: z.ZodOptional<z.ZodEnum<["percent", "fixed_cart", "fixed_product"]>>;
    description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    date_expires: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    usage_count: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    individual_use: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
    product_ids: z.ZodOptional<z.ZodArray<z.ZodNumber, "many">>;
    excluded_product_ids: z.ZodOptional<z.ZodArray<z.ZodNumber, "many">>;
    usage_limit: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    usage_limit_per_user: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    limit_usage_to_x_items: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    free_shipping: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
    product_categories: z.ZodOptional<z.ZodArray<z.ZodNumber, "many">>;
    excluded_product_categories: z.ZodOptional<z.ZodArray<z.ZodNumber, "many">>;
    exclude_sale_items: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
    minimum_amount: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    maximum_amount: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    email_restrictions: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    used_by: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    meta_data: z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        key: z.ZodString;
        value: z.ZodUnknown;
    }, "strip", z.ZodTypeAny, {
        key: string;
        value?: unknown;
        id?: number | null | undefined;
    }, {
        key: string;
        value?: unknown;
        id?: number | null | undefined;
    }>, "many">>;
}, z.ZodTypeAny, "passthrough">>;
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
    meta_data?: Array<{
        key: string;
        value: unknown;
    }>;
}
export type CouponUpdateInput = Partial<CouponCreateInput>;
export interface CouponListQuery extends ListQuery {
    code?: string;
}
/** Coupons resource service. */
export declare class CouponsService {
    private readonly client;
    constructor(client: WooCommerceClient);
    list(query?: CouponListQuery, options?: RequestOptions): Promise<ListResult<Coupon>>;
    iterate(query?: CouponListQuery, options?: RequestOptions): AsyncGenerator<Coupon>;
    get(id: number, options?: RequestOptions): Promise<Coupon>;
    create(input: CouponCreateInput, options?: RequestOptions): Promise<Coupon>;
    update(id: number, input: CouponUpdateInput, options?: RequestOptions): Promise<Coupon>;
    delete(id: number, opts?: {
        force?: boolean;
    }, options?: RequestOptions): Promise<Coupon>;
}
//# sourceMappingURL=coupons.d.ts.map