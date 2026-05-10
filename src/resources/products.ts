import { z } from "zod";
import type { WooCommerceClient } from "../client.js";
import { extractPaginationMeta, paginate } from "../pagination.js";
import type { ListQuery, ListResult, RequestOptions } from "../types/common.js";
import { parseArray, parseOne } from "./_helpers.js";

/**
 * Products resource — WooCommerce REST API'nin en yoğun kullanılan kaynağı.
 *
 * Kapsama: products + variations + categories + tags + attributes + attribute terms
 *        + reviews + shipping classes.
 *
 * Endpoints: https://woocommerce.github.io/woocommerce-rest-api-docs/#products
 */

const MetaDataSchema = z.object({
  id: z.number().optional(),
  key: z.string(),
  value: z.unknown(),
});

const ImageSchema = z.object({
  id: z.number().optional(),
  date_created: z.string().optional(),
  date_modified: z.string().optional(),
  src: z.string(),
  name: z.string().optional(),
  alt: z.string().optional(),
});

const ProductDimensionsSchema = z.object({
  length: z.string().optional(),
  width: z.string().optional(),
  height: z.string().optional(),
});

const ProductCategorySchema = z.object({
  id: z.number(),
  name: z.string().optional(),
  slug: z.string().optional(),
});

const ProductTagSchema = z.object({
  id: z.number(),
  name: z.string().optional(),
  slug: z.string().optional(),
});

const ProductAttributeSchema = z.object({
  id: z.number().optional(),
  name: z.string(),
  position: z.number().optional(),
  visible: z.boolean().optional(),
  variation: z.boolean().optional(),
  options: z.array(z.string()).optional(),
});

export const ProductSchema = z
  .object({
    id: z.number(),
    name: z.string(),
    slug: z.string().optional(),
    permalink: z.string().optional(),
    date_created: z.string().nullable().optional(),
    date_modified: z.string().nullable().optional(),
    type: z.enum(["simple", "grouped", "external", "variable"]).optional(),
    status: z.enum(["draft", "pending", "private", "publish"]).optional(),
    featured: z.boolean().optional(),
    catalog_visibility: z.enum(["visible", "catalog", "search", "hidden"]).optional(),
    description: z.string().optional(),
    short_description: z.string().optional(),
    sku: z.string().optional(),
    price: z.string().optional(),
    regular_price: z.string().optional(),
    sale_price: z.string().optional(),
    on_sale: z.boolean().optional(),
    purchasable: z.boolean().optional(),
    total_sales: z.number().optional(),
    virtual: z.boolean().optional(),
    downloadable: z.boolean().optional(),
    tax_status: z.enum(["taxable", "shipping", "none"]).optional(),
    tax_class: z.string().optional(),
    manage_stock: z.boolean().optional(),
    stock_quantity: z.number().nullable().optional(),
    stock_status: z.enum(["instock", "outofstock", "onbackorder"]).optional(),
    backorders: z.enum(["no", "notify", "yes"]).optional(),
    sold_individually: z.boolean().optional(),
    weight: z.string().optional(),
    dimensions: ProductDimensionsSchema.optional(),
    shipping_required: z.boolean().optional(),
    shipping_taxable: z.boolean().optional(),
    shipping_class: z.string().optional(),
    shipping_class_id: z.number().optional(),
    reviews_allowed: z.boolean().optional(),
    average_rating: z.string().optional(),
    rating_count: z.number().optional(),
    parent_id: z.number().optional(),
    purchase_note: z.string().optional(),
    categories: z.array(ProductCategorySchema).optional(),
    tags: z.array(ProductTagSchema).optional(),
    images: z.array(ImageSchema).optional(),
    attributes: z.array(ProductAttributeSchema).optional(),
    variations: z.array(z.number()).optional(),
    menu_order: z.number().optional(),
    meta_data: z.array(MetaDataSchema).optional(),
  })
  .passthrough();

export type Product = z.infer<typeof ProductSchema>;
export type ProductCreateInput = Partial<Omit<Product, "id">> & { name: string };
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

export const ProductCategoryFullSchema = z
  .object({
    id: z.number(),
    name: z.string(),
    slug: z.string().optional(),
    parent: z.number().optional(),
    description: z.string().optional(),
    display: z.string().optional(),
    image: ImageSchema.nullable().optional(),
    menu_order: z.number().optional(),
    count: z.number().optional(),
  })
  .passthrough();
export type ProductCategoryFull = z.infer<typeof ProductCategoryFullSchema>;

export const ProductTagFullSchema = z
  .object({
    id: z.number(),
    name: z.string(),
    slug: z.string().optional(),
    description: z.string().optional(),
    count: z.number().optional(),
  })
  .passthrough();
export type ProductTagFull = z.infer<typeof ProductTagFullSchema>;

export const ProductVariationSchema = z
  .object({
    id: z.number(),
    sku: z.string().optional(),
    price: z.string().optional(),
    regular_price: z.string().optional(),
    sale_price: z.string().optional(),
    stock_quantity: z.number().nullable().optional(),
    stock_status: z.enum(["instock", "outofstock", "onbackorder"]).optional(),
    attributes: z
      .array(z.object({ id: z.number().optional(), name: z.string(), option: z.string() }))
      .optional(),
  })
  .passthrough();
export type ProductVariation = z.infer<typeof ProductVariationSchema>;

export const ProductReviewSchema = z
  .object({
    id: z.number(),
    product_id: z.number(),
    status: z.string().optional(),
    reviewer: z.string().optional(),
    reviewer_email: z.string().optional(),
    review: z.string().optional(),
    rating: z.number().optional(),
    verified: z.boolean().optional(),
  })
  .passthrough();
export type ProductReview = z.infer<typeof ProductReviewSchema>;

/** Products resource'u için service. */
export class ProductsService {
  constructor(private readonly client: WooCommerceClient) {}

  /** Ürün listesini sayfalayarak getirir. Pagination meta dahil. */
  async list(
    query: ProductListQuery = {},
    options?: RequestOptions,
  ): Promise<ListResult<Product>> {
    const page = query.page ?? 1;
    const perPage = query.per_page ?? 10;
    const response = await this.client.requestRaw<unknown[]>("GET", "/products", {
      query: { ...query, page, per_page: perPage },
      ...options,
    });
    const data = parseArray(ProductSchema, response.body, "/products");
    return { data, meta: extractPaginationMeta(response, page, perPage) };
  }

  /** Tüm ürünleri sırayla yield eder (otomatik sayfalama). */
  iterate(query: ProductListQuery = {}, options?: RequestOptions): AsyncGenerator<Product> {
    const perPage = query.per_page ?? 100;
    return paginate<Product>((page) =>
      this.list({ ...query, page, per_page: perPage }, options).then((r) => r),
    );
  }

  /** Tek ürün getirir. */
  async get(id: number, options?: RequestOptions): Promise<Product> {
    const body = await this.client.request<unknown>("GET", `/products/${id}`, options);
    return parseOne(ProductSchema, body, `/products/${id}`);
  }

  /** Yeni ürün oluşturur. */
  async create(input: ProductCreateInput, options?: RequestOptions): Promise<Product> {
    const body = await this.client.request<unknown>("POST", "/products", {
      body: input,
      ...options,
    });
    return parseOne(ProductSchema, body, "/products");
  }

  /** Mevcut ürünü günceller (partial update). */
  async update(
    id: number,
    input: ProductUpdateInput,
    options?: RequestOptions,
  ): Promise<Product> {
    const body = await this.client.request<unknown>("PUT", `/products/${id}`, {
      body: input,
      ...options,
    });
    return parseOne(ProductSchema, body, `/products/${id}`);
  }

  /** Ürünü siler. `force=true` çöp kutusuna atmadan kalıcı siler. */
  async delete(id: number, opts: { force?: boolean } = {}, options?: RequestOptions): Promise<Product> {
    const body = await this.client.request<unknown>("DELETE", `/products/${id}`, {
      query: opts.force ? { force: true } : undefined,
      ...options,
    });
    return parseOne(ProductSchema, body, `/products/${id}`);
  }

  // --- Variations ---

  /** Bir ürünün variation'larını listeler. */
  async listVariations(
    productId: number,
    query: ListQuery = {},
    options?: RequestOptions,
  ): Promise<ListResult<ProductVariation>> {
    const page = query.page ?? 1;
    const perPage = query.per_page ?? 10;
    const response = await this.client.requestRaw<unknown[]>(
      "GET",
      `/products/${productId}/variations`,
      { query: { ...query, page, per_page: perPage }, ...options },
    );
    return {
      data: parseArray(ProductVariationSchema, response.body, "variations"),
      meta: extractPaginationMeta(response, page, perPage),
    };
  }

  async getVariation(
    productId: number,
    variationId: number,
    options?: RequestOptions,
  ): Promise<ProductVariation> {
    const body = await this.client.request<unknown>(
      "GET",
      `/products/${productId}/variations/${variationId}`,
      options,
    );
    return parseOne(ProductVariationSchema, body, "variation");
  }

  // --- Categories ---

  async listCategories(
    query: ListQuery = {},
    options?: RequestOptions,
  ): Promise<ListResult<ProductCategoryFull>> {
    const page = query.page ?? 1;
    const perPage = query.per_page ?? 10;
    const response = await this.client.requestRaw<unknown[]>("GET", "/products/categories", {
      query: { ...query, page, per_page: perPage },
      ...options,
    });
    return {
      data: parseArray(ProductCategoryFullSchema, response.body, "categories"),
      meta: extractPaginationMeta(response, page, perPage),
    };
  }

  // --- Tags ---

  async listTags(
    query: ListQuery = {},
    options?: RequestOptions,
  ): Promise<ListResult<ProductTagFull>> {
    const page = query.page ?? 1;
    const perPage = query.per_page ?? 10;
    const response = await this.client.requestRaw<unknown[]>("GET", "/products/tags", {
      query: { ...query, page, per_page: perPage },
      ...options,
    });
    return {
      data: parseArray(ProductTagFullSchema, response.body, "tags"),
      meta: extractPaginationMeta(response, page, perPage),
    };
  }

  // --- Reviews ---

  async listReviews(
    query: ListQuery = {},
    options?: RequestOptions,
  ): Promise<ListResult<ProductReview>> {
    const page = query.page ?? 1;
    const perPage = query.per_page ?? 10;
    const response = await this.client.requestRaw<unknown[]>("GET", "/products/reviews", {
      query: { ...query, page, per_page: perPage },
      ...options,
    });
    return {
      data: parseArray(ProductReviewSchema, response.body, "reviews"),
      meta: extractPaginationMeta(response, page, perPage),
    };
  }
}

