import { z } from "zod";
import type { WooCommerceClient } from "../client.js";
import type { ListQuery, ListResult, RequestOptions } from "../types/common.js";
/**
 * Orders resource — sipariş, sipariş notları, sipariş iadeleri.
 *
 * Endpoints: https://woocommerce.github.io/woocommerce-rest-api-docs/#orders
 */
export declare const OrderStatusSchema: z.ZodEnum<["pending", "processing", "on-hold", "completed", "cancelled", "refunded", "failed", "trash"]>;
export type OrderStatus = z.infer<typeof OrderStatusSchema>;
export declare const OrderSchema: z.ZodObject<{
    id: z.ZodNumber;
    parent_id: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    number: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    order_key: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    created_via: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    version: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    status: z.ZodOptional<z.ZodEnum<["pending", "processing", "on-hold", "completed", "cancelled", "refunded", "failed", "trash"]>>;
    currency: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    date_created: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    date_modified: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    discount_total: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    discount_tax: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    shipping_total: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    shipping_tax: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    cart_tax: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    total: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    total_tax: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    prices_include_tax: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
    customer_id: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    customer_ip_address: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    customer_user_agent: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    customer_note: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    billing: z.ZodOptional<z.ZodObject<{
        first_name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        last_name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        company: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        address_1: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        address_2: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        city: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        state: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        postcode: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        country: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        email: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        phone: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        first_name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        last_name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        company: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        address_1: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        address_2: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        city: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        state: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        postcode: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        country: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        email: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        phone: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        first_name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        last_name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        company: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        address_1: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        address_2: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        city: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        state: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        postcode: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        country: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        email: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        phone: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, z.ZodTypeAny, "passthrough">>>;
    shipping: z.ZodOptional<z.ZodObject<{
        first_name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        last_name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        company: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        address_1: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        address_2: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        city: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        state: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        postcode: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        country: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        email: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        phone: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        first_name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        last_name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        company: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        address_1: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        address_2: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        city: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        state: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        postcode: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        country: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        email: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        phone: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        first_name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        last_name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        company: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        address_1: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        address_2: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        city: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        state: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        postcode: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        country: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        email: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        phone: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, z.ZodTypeAny, "passthrough">>>;
    payment_method: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    payment_method_title: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    transaction_id: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    date_paid: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    date_completed: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    cart_hash: z.ZodOptional<z.ZodNullable<z.ZodString>>;
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
    line_items: z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        product_id: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        variation_id: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        quantity: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        tax_class: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        subtotal: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        subtotal_tax: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        total: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        total_tax: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        sku: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        price: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        id: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        product_id: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        variation_id: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        quantity: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        tax_class: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        subtotal: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        subtotal_tax: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        total: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        total_tax: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        sku: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        price: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        id: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        product_id: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        variation_id: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        quantity: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        tax_class: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        subtotal: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        subtotal_tax: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        total: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        total_tax: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        sku: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        price: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
    }, z.ZodTypeAny, "passthrough">>, "many">>;
    tax_lines: z.ZodOptional<z.ZodArray<z.ZodUnknown, "many">>;
    shipping_lines: z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        method_title: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        method_id: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        instance_id: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        total: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        total_tax: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        id: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        method_title: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        method_id: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        instance_id: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        total: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        total_tax: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        id: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        method_title: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        method_id: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        instance_id: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        total: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        total_tax: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, z.ZodTypeAny, "passthrough">>, "many">>;
    fee_lines: z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        tax_class: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        tax_status: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        total: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        total_tax: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        id: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        tax_class: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        tax_status: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        total: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        total_tax: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        id: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        tax_class: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        tax_status: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        total: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        total_tax: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, z.ZodTypeAny, "passthrough">>, "many">>;
    coupon_lines: z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        code: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        discount: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        discount_tax: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        id: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        code: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        discount: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        discount_tax: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        id: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        code: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        discount: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        discount_tax: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, z.ZodTypeAny, "passthrough">>, "many">>;
    refunds: z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodNumber;
        reason: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        total: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        id: z.ZodNumber;
        reason: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        total: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        id: z.ZodNumber;
        reason: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        total: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, z.ZodTypeAny, "passthrough">>, "many">>;
}, "passthrough", z.ZodTypeAny, z.objectOutputType<{
    id: z.ZodNumber;
    parent_id: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    number: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    order_key: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    created_via: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    version: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    status: z.ZodOptional<z.ZodEnum<["pending", "processing", "on-hold", "completed", "cancelled", "refunded", "failed", "trash"]>>;
    currency: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    date_created: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    date_modified: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    discount_total: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    discount_tax: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    shipping_total: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    shipping_tax: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    cart_tax: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    total: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    total_tax: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    prices_include_tax: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
    customer_id: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    customer_ip_address: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    customer_user_agent: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    customer_note: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    billing: z.ZodOptional<z.ZodObject<{
        first_name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        last_name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        company: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        address_1: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        address_2: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        city: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        state: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        postcode: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        country: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        email: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        phone: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        first_name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        last_name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        company: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        address_1: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        address_2: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        city: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        state: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        postcode: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        country: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        email: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        phone: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        first_name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        last_name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        company: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        address_1: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        address_2: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        city: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        state: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        postcode: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        country: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        email: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        phone: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, z.ZodTypeAny, "passthrough">>>;
    shipping: z.ZodOptional<z.ZodObject<{
        first_name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        last_name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        company: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        address_1: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        address_2: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        city: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        state: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        postcode: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        country: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        email: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        phone: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        first_name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        last_name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        company: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        address_1: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        address_2: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        city: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        state: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        postcode: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        country: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        email: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        phone: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        first_name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        last_name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        company: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        address_1: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        address_2: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        city: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        state: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        postcode: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        country: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        email: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        phone: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, z.ZodTypeAny, "passthrough">>>;
    payment_method: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    payment_method_title: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    transaction_id: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    date_paid: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    date_completed: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    cart_hash: z.ZodOptional<z.ZodNullable<z.ZodString>>;
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
    line_items: z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        product_id: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        variation_id: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        quantity: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        tax_class: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        subtotal: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        subtotal_tax: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        total: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        total_tax: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        sku: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        price: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        id: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        product_id: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        variation_id: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        quantity: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        tax_class: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        subtotal: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        subtotal_tax: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        total: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        total_tax: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        sku: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        price: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        id: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        product_id: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        variation_id: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        quantity: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        tax_class: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        subtotal: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        subtotal_tax: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        total: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        total_tax: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        sku: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        price: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
    }, z.ZodTypeAny, "passthrough">>, "many">>;
    tax_lines: z.ZodOptional<z.ZodArray<z.ZodUnknown, "many">>;
    shipping_lines: z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        method_title: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        method_id: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        instance_id: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        total: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        total_tax: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        id: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        method_title: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        method_id: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        instance_id: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        total: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        total_tax: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        id: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        method_title: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        method_id: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        instance_id: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        total: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        total_tax: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, z.ZodTypeAny, "passthrough">>, "many">>;
    fee_lines: z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        tax_class: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        tax_status: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        total: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        total_tax: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        id: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        tax_class: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        tax_status: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        total: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        total_tax: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        id: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        tax_class: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        tax_status: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        total: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        total_tax: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, z.ZodTypeAny, "passthrough">>, "many">>;
    coupon_lines: z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        code: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        discount: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        discount_tax: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        id: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        code: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        discount: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        discount_tax: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        id: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        code: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        discount: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        discount_tax: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, z.ZodTypeAny, "passthrough">>, "many">>;
    refunds: z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodNumber;
        reason: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        total: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        id: z.ZodNumber;
        reason: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        total: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        id: z.ZodNumber;
        reason: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        total: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, z.ZodTypeAny, "passthrough">>, "many">>;
}, z.ZodTypeAny, "passthrough">, z.objectInputType<{
    id: z.ZodNumber;
    parent_id: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    number: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    order_key: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    created_via: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    version: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    status: z.ZodOptional<z.ZodEnum<["pending", "processing", "on-hold", "completed", "cancelled", "refunded", "failed", "trash"]>>;
    currency: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    date_created: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    date_modified: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    discount_total: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    discount_tax: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    shipping_total: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    shipping_tax: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    cart_tax: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    total: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    total_tax: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    prices_include_tax: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
    customer_id: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    customer_ip_address: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    customer_user_agent: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    customer_note: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    billing: z.ZodOptional<z.ZodObject<{
        first_name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        last_name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        company: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        address_1: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        address_2: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        city: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        state: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        postcode: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        country: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        email: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        phone: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        first_name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        last_name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        company: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        address_1: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        address_2: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        city: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        state: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        postcode: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        country: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        email: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        phone: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        first_name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        last_name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        company: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        address_1: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        address_2: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        city: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        state: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        postcode: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        country: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        email: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        phone: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, z.ZodTypeAny, "passthrough">>>;
    shipping: z.ZodOptional<z.ZodObject<{
        first_name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        last_name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        company: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        address_1: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        address_2: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        city: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        state: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        postcode: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        country: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        email: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        phone: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        first_name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        last_name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        company: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        address_1: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        address_2: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        city: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        state: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        postcode: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        country: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        email: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        phone: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        first_name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        last_name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        company: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        address_1: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        address_2: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        city: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        state: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        postcode: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        country: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        email: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        phone: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, z.ZodTypeAny, "passthrough">>>;
    payment_method: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    payment_method_title: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    transaction_id: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    date_paid: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    date_completed: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    cart_hash: z.ZodOptional<z.ZodNullable<z.ZodString>>;
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
    line_items: z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        product_id: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        variation_id: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        quantity: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        tax_class: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        subtotal: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        subtotal_tax: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        total: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        total_tax: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        sku: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        price: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        id: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        product_id: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        variation_id: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        quantity: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        tax_class: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        subtotal: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        subtotal_tax: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        total: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        total_tax: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        sku: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        price: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        id: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        product_id: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        variation_id: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        quantity: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        tax_class: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        subtotal: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        subtotal_tax: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        total: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        total_tax: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        sku: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        price: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
    }, z.ZodTypeAny, "passthrough">>, "many">>;
    tax_lines: z.ZodOptional<z.ZodArray<z.ZodUnknown, "many">>;
    shipping_lines: z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        method_title: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        method_id: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        instance_id: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        total: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        total_tax: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        id: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        method_title: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        method_id: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        instance_id: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        total: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        total_tax: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        id: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        method_title: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        method_id: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        instance_id: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        total: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        total_tax: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, z.ZodTypeAny, "passthrough">>, "many">>;
    fee_lines: z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        tax_class: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        tax_status: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        total: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        total_tax: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        id: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        tax_class: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        tax_status: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        total: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        total_tax: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        id: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        tax_class: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        tax_status: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        total: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        total_tax: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, z.ZodTypeAny, "passthrough">>, "many">>;
    coupon_lines: z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        code: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        discount: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        discount_tax: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        id: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        code: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        discount: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        discount_tax: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        id: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        code: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        discount: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        discount_tax: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, z.ZodTypeAny, "passthrough">>, "many">>;
    refunds: z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodNumber;
        reason: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        total: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        id: z.ZodNumber;
        reason: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        total: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        id: z.ZodNumber;
        reason: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        total: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, z.ZodTypeAny, "passthrough">>, "many">>;
}, z.ZodTypeAny, "passthrough">>;
export type Order = z.infer<typeof OrderSchema>;
export type OrderCreateInput = Partial<Omit<Order, "id">>;
export type OrderUpdateInput = Partial<Omit<Order, "id">>;
export interface OrderListQuery extends ListQuery {
    status?: OrderStatus | OrderStatus[] | "any";
    customer?: number;
    product?: number;
    dp?: number;
}
export declare const OrderNoteSchema: z.ZodObject<{
    id: z.ZodNumber;
    author: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    date_created: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    note: z.ZodString;
    customer_note: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
}, "passthrough", z.ZodTypeAny, z.objectOutputType<{
    id: z.ZodNumber;
    author: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    date_created: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    note: z.ZodString;
    customer_note: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
}, z.ZodTypeAny, "passthrough">, z.objectInputType<{
    id: z.ZodNumber;
    author: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    date_created: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    note: z.ZodString;
    customer_note: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
}, z.ZodTypeAny, "passthrough">>;
export type OrderNote = z.infer<typeof OrderNoteSchema>;
/** Orders resource service. */
export declare class OrdersService {
    private readonly client;
    constructor(client: WooCommerceClient);
    list(query?: OrderListQuery, options?: RequestOptions): Promise<ListResult<Order>>;
    iterate(query?: OrderListQuery, options?: RequestOptions): AsyncGenerator<Order>;
    get(id: number, options?: RequestOptions): Promise<Order>;
    create(input: OrderCreateInput, options?: RequestOptions): Promise<Order>;
    update(id: number, input: OrderUpdateInput, options?: RequestOptions): Promise<Order>;
    delete(id: number, opts?: {
        force?: boolean;
    }, options?: RequestOptions): Promise<Order>;
    listNotes(orderId: number, query?: ListQuery, options?: RequestOptions): Promise<OrderNote[]>;
    addNote(orderId: number, input: {
        note: string;
        customer_note?: boolean;
        added_by_user?: boolean;
    }, options?: RequestOptions): Promise<OrderNote>;
    deleteNote(orderId: number, noteId: number, options?: RequestOptions): Promise<OrderNote>;
}
//# sourceMappingURL=orders.d.ts.map