import { z } from "zod";
import type { WooCommerceClient } from "../client.js";
import { extractPaginationMeta, paginate } from "../pagination.js";
import type { ListQuery, ListResult, RequestOptions } from "../types/common.js";
import { parseArray, parseOne } from "./_helpers.js";

/**
 * Customers resource — müşteri CRUD + downloads listesi.
 *
 * Endpoints: https://woocommerce.github.io/woocommerce-rest-api-docs/#customers
 */

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

export const CustomerSchema = z
  .object({
    id: z.number(),
    date_created: z.string().nullable().optional(),
    date_modified: z.string().nullable().optional(),
    email: z.string(),
    first_name: z.string().nullable().optional(),
    last_name: z.string().nullable().optional(),
    role: z.string().nullable().optional(),
    username: z.string().nullable().optional(),
    billing: AddressSchema.optional(),
    shipping: AddressSchema.optional(),
    is_paying_customer: z.boolean().nullable().optional(),
    avatar_url: z.string().nullable().optional(),
    meta_data: z
      .array(z.object({ id: z.number().nullable().optional(), key: z.string(), value: z.unknown() }))
      .optional(),
  })
  .passthrough();

export type Customer = z.infer<typeof CustomerSchema>;

export interface CustomerCreateInput {
  email: string;
  first_name?: string;
  last_name?: string;
  username?: string;
  password?: string;
  billing?: z.infer<typeof AddressSchema>;
  shipping?: z.infer<typeof AddressSchema>;
  meta_data?: Array<{ key: string; value: unknown }>;
}
export type CustomerUpdateInput = Partial<Omit<Customer, "id">>;

export interface CustomerListQuery extends ListQuery {
  email?: string;
  role?: string;
}

export const CustomerDownloadSchema = z
  .object({
    download_id: z.string(),
    download_url: z.string().nullable().optional(),
    product_id: z.number().nullable().optional(),
    product_name: z.string().nullable().optional(),
    download_name: z.string().nullable().optional(),
    order_id: z.number().nullable().optional(),
    order_key: z.string().nullable().optional(),
    downloads_remaining: z.union([z.string(), z.number()]).optional(),
    access_expires: z.string().nullable().optional(),
    access_expires_gmt: z.string().nullable().optional(),
    file: z.object({ name: z.string().nullable().optional(), file: z.string().nullable().optional() }).optional(),
  })
  .passthrough();
export type CustomerDownload = z.infer<typeof CustomerDownloadSchema>;

/** Customers resource service. */
export class CustomersService {
  constructor(private readonly client: WooCommerceClient) {}

  async list(
    query: CustomerListQuery = {},
    options?: RequestOptions,
  ): Promise<ListResult<Customer>> {
    const page = query.page ?? 1;
    const perPage = query.per_page ?? 10;
    const response = await this.client.requestRaw<unknown[]>("GET", "/customers", {
      query: { ...query, page, per_page: perPage },
      ...options,
    });
    return {
      data: parseArray(CustomerSchema, response.body, "/customers"),
      meta: extractPaginationMeta(response, page, perPage),
    };
  }

  iterate(query: CustomerListQuery = {}, options?: RequestOptions): AsyncGenerator<Customer> {
    const perPage = query.per_page ?? 100;
    return paginate<Customer>((page) =>
      this.list({ ...query, page, per_page: perPage }, options),
    );
  }

  async get(id: number, options?: RequestOptions): Promise<Customer> {
    const body = await this.client.request<unknown>("GET", `/customers/${id}`, options);
    return parseOne(CustomerSchema, body, `/customers/${id}`);
  }

  async create(input: CustomerCreateInput, options?: RequestOptions): Promise<Customer> {
    const body = await this.client.request<unknown>("POST", "/customers", {
      body: input,
      ...options,
    });
    return parseOne(CustomerSchema, body, "/customers");
  }

  async update(
    id: number,
    input: CustomerUpdateInput,
    options?: RequestOptions,
  ): Promise<Customer> {
    const body = await this.client.request<unknown>("PUT", `/customers/${id}`, {
      body: input,
      ...options,
    });
    return parseOne(CustomerSchema, body, `/customers/${id}`);
  }

  async delete(
    id: number,
    opts: { force?: boolean; reassign?: number } = {},
    options?: RequestOptions,
  ): Promise<Customer> {
    const query: Record<string, unknown> = {};
    if (opts.force !== undefined) query["force"] = opts.force;
    if (opts.reassign !== undefined) query["reassign"] = opts.reassign;
    const body = await this.client.request<unknown>("DELETE", `/customers/${id}`, {
      query: Object.keys(query).length > 0 ? query : undefined,
      ...options,
    });
    return parseOne(CustomerSchema, body, `/customers/${id}`);
  }

  /** Müşterinin satın aldığı downloadable dosyalar. */
  async listDownloads(
    customerId: number,
    options?: RequestOptions,
  ): Promise<CustomerDownload[]> {
    const body = await this.client.request<unknown>(
      "GET",
      `/customers/${customerId}/downloads`,
      options,
    );
    return parseArray(CustomerDownloadSchema, body, `/customers/${customerId}/downloads`);
  }
}
