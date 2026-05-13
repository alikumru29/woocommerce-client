import { z } from "zod";
import type { WooCommerceClient } from "../client.js";
import type { ListQuery, ListResult, RequestOptions } from "../types/common.js";
export declare const ProductSchema: z.ZodObject<{
    id: z.ZodNumber;
    name: z.ZodString;
    slug: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    permalink: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    date_created: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    date_modified: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    type: z.ZodOptional<z.ZodEnum<["simple", "grouped", "external", "variable"]>>;
    status: z.ZodOptional<z.ZodEnum<["draft", "pending", "private", "publish"]>>;
    featured: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
    catalog_visibility: z.ZodOptional<z.ZodEnum<["visible", "catalog", "search", "hidden"]>>;
    description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    short_description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    sku: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    price: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    regular_price: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    sale_price: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    on_sale: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
    purchasable: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
    total_sales: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    virtual: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
    downloadable: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
    tax_status: z.ZodOptional<z.ZodEnum<["taxable", "shipping", "none"]>>;
    tax_class: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    manage_stock: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
    stock_quantity: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    stock_status: z.ZodOptional<z.ZodEnum<["instock", "outofstock", "onbackorder"]>>;
    backorders: z.ZodOptional<z.ZodEnum<["no", "notify", "yes"]>>;
    sold_individually: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
    weight: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    dimensions: z.ZodOptional<z.ZodObject<{
        length: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        width: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        height: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
        length?: string | null | undefined;
        width?: string | null | undefined;
        height?: string | null | undefined;
    }, {
        length?: string | null | undefined;
        width?: string | null | undefined;
        height?: string | null | undefined;
    }>>;
    shipping_required: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
    shipping_taxable: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
    shipping_class: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    shipping_class_id: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    reviews_allowed: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
    average_rating: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    rating_count: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    parent_id: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    purchase_note: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    categories: z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodNumber;
        name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        slug: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
        id: number;
        name?: string | null | undefined;
        slug?: string | null | undefined;
    }, {
        id: number;
        name?: string | null | undefined;
        slug?: string | null | undefined;
    }>, "many">>;
    tags: z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodNumber;
        name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        slug: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
        id: number;
        name?: string | null | undefined;
        slug?: string | null | undefined;
    }, {
        id: number;
        name?: string | null | undefined;
        slug?: string | null | undefined;
    }>, "many">>;
    images: z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        date_created: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        date_modified: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        src: z.ZodString;
        name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        alt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
        src: string;
        name?: string | null | undefined;
        id?: number | null | undefined;
        date_created?: string | null | undefined;
        date_modified?: string | null | undefined;
        alt?: string | null | undefined;
    }, {
        src: string;
        name?: string | null | undefined;
        id?: number | null | undefined;
        date_created?: string | null | undefined;
        date_modified?: string | null | undefined;
        alt?: string | null | undefined;
    }>, "many">>;
    attributes: z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        name: z.ZodString;
        position: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        visible: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
        variation: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
        options: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        options?: string[] | undefined;
        id?: number | null | undefined;
        position?: number | null | undefined;
        visible?: boolean | null | undefined;
        variation?: boolean | null | undefined;
    }, {
        name: string;
        options?: string[] | undefined;
        id?: number | null | undefined;
        position?: number | null | undefined;
        visible?: boolean | null | undefined;
        variation?: boolean | null | undefined;
    }>, "many">>;
    variations: z.ZodOptional<z.ZodArray<z.ZodNumber, "many">>;
    menu_order: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
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
    name: z.ZodString;
    slug: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    permalink: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    date_created: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    date_modified: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    type: z.ZodOptional<z.ZodEnum<["simple", "grouped", "external", "variable"]>>;
    status: z.ZodOptional<z.ZodEnum<["draft", "pending", "private", "publish"]>>;
    featured: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
    catalog_visibility: z.ZodOptional<z.ZodEnum<["visible", "catalog", "search", "hidden"]>>;
    description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    short_description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    sku: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    price: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    regular_price: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    sale_price: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    on_sale: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
    purchasable: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
    total_sales: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    virtual: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
    downloadable: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
    tax_status: z.ZodOptional<z.ZodEnum<["taxable", "shipping", "none"]>>;
    tax_class: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    manage_stock: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
    stock_quantity: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    stock_status: z.ZodOptional<z.ZodEnum<["instock", "outofstock", "onbackorder"]>>;
    backorders: z.ZodOptional<z.ZodEnum<["no", "notify", "yes"]>>;
    sold_individually: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
    weight: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    dimensions: z.ZodOptional<z.ZodObject<{
        length: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        width: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        height: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
        length?: string | null | undefined;
        width?: string | null | undefined;
        height?: string | null | undefined;
    }, {
        length?: string | null | undefined;
        width?: string | null | undefined;
        height?: string | null | undefined;
    }>>;
    shipping_required: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
    shipping_taxable: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
    shipping_class: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    shipping_class_id: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    reviews_allowed: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
    average_rating: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    rating_count: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    parent_id: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    purchase_note: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    categories: z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodNumber;
        name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        slug: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
        id: number;
        name?: string | null | undefined;
        slug?: string | null | undefined;
    }, {
        id: number;
        name?: string | null | undefined;
        slug?: string | null | undefined;
    }>, "many">>;
    tags: z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodNumber;
        name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        slug: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
        id: number;
        name?: string | null | undefined;
        slug?: string | null | undefined;
    }, {
        id: number;
        name?: string | null | undefined;
        slug?: string | null | undefined;
    }>, "many">>;
    images: z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        date_created: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        date_modified: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        src: z.ZodString;
        name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        alt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
        src: string;
        name?: string | null | undefined;
        id?: number | null | undefined;
        date_created?: string | null | undefined;
        date_modified?: string | null | undefined;
        alt?: string | null | undefined;
    }, {
        src: string;
        name?: string | null | undefined;
        id?: number | null | undefined;
        date_created?: string | null | undefined;
        date_modified?: string | null | undefined;
        alt?: string | null | undefined;
    }>, "many">>;
    attributes: z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        name: z.ZodString;
        position: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        visible: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
        variation: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
        options: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        options?: string[] | undefined;
        id?: number | null | undefined;
        position?: number | null | undefined;
        visible?: boolean | null | undefined;
        variation?: boolean | null | undefined;
    }, {
        name: string;
        options?: string[] | undefined;
        id?: number | null | undefined;
        position?: number | null | undefined;
        visible?: boolean | null | undefined;
        variation?: boolean | null | undefined;
    }>, "many">>;
    variations: z.ZodOptional<z.ZodArray<z.ZodNumber, "many">>;
    menu_order: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
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
    name: z.ZodString;
    slug: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    permalink: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    date_created: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    date_modified: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    type: z.ZodOptional<z.ZodEnum<["simple", "grouped", "external", "variable"]>>;
    status: z.ZodOptional<z.ZodEnum<["draft", "pending", "private", "publish"]>>;
    featured: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
    catalog_visibility: z.ZodOptional<z.ZodEnum<["visible", "catalog", "search", "hidden"]>>;
    description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    short_description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    sku: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    price: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    regular_price: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    sale_price: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    on_sale: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
    purchasable: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
    total_sales: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    virtual: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
    downloadable: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
    tax_status: z.ZodOptional<z.ZodEnum<["taxable", "shipping", "none"]>>;
    tax_class: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    manage_stock: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
    stock_quantity: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    stock_status: z.ZodOptional<z.ZodEnum<["instock", "outofstock", "onbackorder"]>>;
    backorders: z.ZodOptional<z.ZodEnum<["no", "notify", "yes"]>>;
    sold_individually: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
    weight: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    dimensions: z.ZodOptional<z.ZodObject<{
        length: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        width: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        height: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
        length?: string | null | undefined;
        width?: string | null | undefined;
        height?: string | null | undefined;
    }, {
        length?: string | null | undefined;
        width?: string | null | undefined;
        height?: string | null | undefined;
    }>>;
    shipping_required: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
    shipping_taxable: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
    shipping_class: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    shipping_class_id: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    reviews_allowed: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
    average_rating: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    rating_count: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    parent_id: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    purchase_note: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    categories: z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodNumber;
        name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        slug: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
        id: number;
        name?: string | null | undefined;
        slug?: string | null | undefined;
    }, {
        id: number;
        name?: string | null | undefined;
        slug?: string | null | undefined;
    }>, "many">>;
    tags: z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodNumber;
        name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        slug: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
        id: number;
        name?: string | null | undefined;
        slug?: string | null | undefined;
    }, {
        id: number;
        name?: string | null | undefined;
        slug?: string | null | undefined;
    }>, "many">>;
    images: z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        date_created: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        date_modified: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        src: z.ZodString;
        name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        alt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
        src: string;
        name?: string | null | undefined;
        id?: number | null | undefined;
        date_created?: string | null | undefined;
        date_modified?: string | null | undefined;
        alt?: string | null | undefined;
    }, {
        src: string;
        name?: string | null | undefined;
        id?: number | null | undefined;
        date_created?: string | null | undefined;
        date_modified?: string | null | undefined;
        alt?: string | null | undefined;
    }>, "many">>;
    attributes: z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        name: z.ZodString;
        position: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        visible: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
        variation: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
        options: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        options?: string[] | undefined;
        id?: number | null | undefined;
        position?: number | null | undefined;
        visible?: boolean | null | undefined;
        variation?: boolean | null | undefined;
    }, {
        name: string;
        options?: string[] | undefined;
        id?: number | null | undefined;
        position?: number | null | undefined;
        visible?: boolean | null | undefined;
        variation?: boolean | null | undefined;
    }>, "many">>;
    variations: z.ZodOptional<z.ZodArray<z.ZodNumber, "many">>;
    menu_order: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
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
export type Product = z.infer<typeof ProductSchema>;
export type ProductCreateInput = Partial<Omit<Product, "id">> & {
    name: string;
};
export type ProductUpdateInput = Partial<Omit<Product, "id">>;
export interface ProductListQuery extends ListQuery {
    status?: "draft" | "pending" | "private" | "publish" | "any";
    type?: "simple" | "grouped" | "external" | "variable";
    sku?: string;
    category?: string;
    tag?: string;
    featured?: boolean;
    on_sale?: boolean;
    min_price?: string;
    max_price?: string;
    stock_status?: "instock" | "outofstock" | "onbackorder";
}
export declare const ProductCategoryFullSchema: z.ZodObject<{
    id: z.ZodNumber;
    name: z.ZodString;
    slug: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    parent: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    display: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    image: z.ZodOptional<z.ZodNullable<z.ZodObject<{
        id: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        date_created: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        date_modified: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        src: z.ZodString;
        name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        alt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
        src: string;
        name?: string | null | undefined;
        id?: number | null | undefined;
        date_created?: string | null | undefined;
        date_modified?: string | null | undefined;
        alt?: string | null | undefined;
    }, {
        src: string;
        name?: string | null | undefined;
        id?: number | null | undefined;
        date_created?: string | null | undefined;
        date_modified?: string | null | undefined;
        alt?: string | null | undefined;
    }>>>;
    menu_order: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    count: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
}, "passthrough", z.ZodTypeAny, z.objectOutputType<{
    id: z.ZodNumber;
    name: z.ZodString;
    slug: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    parent: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    display: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    image: z.ZodOptional<z.ZodNullable<z.ZodObject<{
        id: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        date_created: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        date_modified: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        src: z.ZodString;
        name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        alt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
        src: string;
        name?: string | null | undefined;
        id?: number | null | undefined;
        date_created?: string | null | undefined;
        date_modified?: string | null | undefined;
        alt?: string | null | undefined;
    }, {
        src: string;
        name?: string | null | undefined;
        id?: number | null | undefined;
        date_created?: string | null | undefined;
        date_modified?: string | null | undefined;
        alt?: string | null | undefined;
    }>>>;
    menu_order: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    count: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
}, z.ZodTypeAny, "passthrough">, z.objectInputType<{
    id: z.ZodNumber;
    name: z.ZodString;
    slug: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    parent: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    display: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    image: z.ZodOptional<z.ZodNullable<z.ZodObject<{
        id: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        date_created: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        date_modified: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        src: z.ZodString;
        name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        alt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
        src: string;
        name?: string | null | undefined;
        id?: number | null | undefined;
        date_created?: string | null | undefined;
        date_modified?: string | null | undefined;
        alt?: string | null | undefined;
    }, {
        src: string;
        name?: string | null | undefined;
        id?: number | null | undefined;
        date_created?: string | null | undefined;
        date_modified?: string | null | undefined;
        alt?: string | null | undefined;
    }>>>;
    menu_order: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    count: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
}, z.ZodTypeAny, "passthrough">>;
export type ProductCategoryFull = z.infer<typeof ProductCategoryFullSchema>;
export declare const ProductTagFullSchema: z.ZodObject<{
    id: z.ZodNumber;
    name: z.ZodString;
    slug: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    count: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
}, "passthrough", z.ZodTypeAny, z.objectOutputType<{
    id: z.ZodNumber;
    name: z.ZodString;
    slug: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    count: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
}, z.ZodTypeAny, "passthrough">, z.objectInputType<{
    id: z.ZodNumber;
    name: z.ZodString;
    slug: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    count: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
}, z.ZodTypeAny, "passthrough">>;
export type ProductTagFull = z.infer<typeof ProductTagFullSchema>;
export declare const ProductVariationSchema: z.ZodObject<{
    id: z.ZodNumber;
    sku: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    price: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    regular_price: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    sale_price: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    stock_quantity: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    stock_status: z.ZodOptional<z.ZodEnum<["instock", "outofstock", "onbackorder"]>>;
    attributes: z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        name: z.ZodString;
        option: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        name: string;
        option: string;
        id?: number | null | undefined;
    }, {
        name: string;
        option: string;
        id?: number | null | undefined;
    }>, "many">>;
}, "passthrough", z.ZodTypeAny, z.objectOutputType<{
    id: z.ZodNumber;
    sku: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    price: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    regular_price: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    sale_price: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    stock_quantity: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    stock_status: z.ZodOptional<z.ZodEnum<["instock", "outofstock", "onbackorder"]>>;
    attributes: z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        name: z.ZodString;
        option: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        name: string;
        option: string;
        id?: number | null | undefined;
    }, {
        name: string;
        option: string;
        id?: number | null | undefined;
    }>, "many">>;
}, z.ZodTypeAny, "passthrough">, z.objectInputType<{
    id: z.ZodNumber;
    sku: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    price: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    regular_price: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    sale_price: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    stock_quantity: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    stock_status: z.ZodOptional<z.ZodEnum<["instock", "outofstock", "onbackorder"]>>;
    attributes: z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        name: z.ZodString;
        option: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        name: string;
        option: string;
        id?: number | null | undefined;
    }, {
        name: string;
        option: string;
        id?: number | null | undefined;
    }>, "many">>;
}, z.ZodTypeAny, "passthrough">>;
export type ProductVariation = z.infer<typeof ProductVariationSchema>;
export declare const ProductReviewSchema: z.ZodObject<{
    id: z.ZodNumber;
    product_id: z.ZodNumber;
    status: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    reviewer: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    reviewer_email: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    review: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    rating: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    verified: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
}, "passthrough", z.ZodTypeAny, z.objectOutputType<{
    id: z.ZodNumber;
    product_id: z.ZodNumber;
    status: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    reviewer: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    reviewer_email: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    review: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    rating: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    verified: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
}, z.ZodTypeAny, "passthrough">, z.objectInputType<{
    id: z.ZodNumber;
    product_id: z.ZodNumber;
    status: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    reviewer: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    reviewer_email: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    review: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    rating: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    verified: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
}, z.ZodTypeAny, "passthrough">>;
export type ProductReview = z.infer<typeof ProductReviewSchema>;
/** Products resource'u için service. */
export declare class ProductsService {
    private readonly client;
    constructor(client: WooCommerceClient);
    /** Ürün listesini sayfalayarak getirir. Pagination meta dahil. */
    list(query?: ProductListQuery, options?: RequestOptions): Promise<ListResult<Product>>;
    /** Tüm ürünleri sırayla yield eder (otomatik sayfalama). */
    iterate(query?: ProductListQuery, options?: RequestOptions): AsyncGenerator<Product>;
    /** Tek ürün getirir. */
    get(id: number, options?: RequestOptions): Promise<Product>;
    /** Yeni ürün oluşturur. */
    create(input: ProductCreateInput, options?: RequestOptions): Promise<Product>;
    /** Mevcut ürünü günceller (partial update). */
    update(id: number, input: ProductUpdateInput, options?: RequestOptions): Promise<Product>;
    /** Ürünü siler. `force=true` çöp kutusuna atmadan kalıcı siler. */
    delete(id: number, opts?: {
        force?: boolean;
    }, options?: RequestOptions): Promise<Product>;
    /** Bir ürünün variation'larını listeler. */
    listVariations(productId: number, query?: ListQuery, options?: RequestOptions): Promise<ListResult<ProductVariation>>;
    getVariation(productId: number, variationId: number, options?: RequestOptions): Promise<ProductVariation>;
    listCategories(query?: ListQuery, options?: RequestOptions): Promise<ListResult<ProductCategoryFull>>;
    listTags(query?: ListQuery, options?: RequestOptions): Promise<ListResult<ProductTagFull>>;
    listReviews(query?: ListQuery, options?: RequestOptions): Promise<ListResult<ProductReview>>;
}
//# sourceMappingURL=products.d.ts.map