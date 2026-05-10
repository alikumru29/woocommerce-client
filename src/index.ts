/**
 * woocommerce-client — Type-safe WooCommerce REST API client for Node.js.
 *
 * Public API surface.
 */

export {
  WooCommerceClient,
  type WooCommerceClientConfig,
  type WooApiVersion,
  type GenericRequestOptions,
} from "./client.js";

export type { AuthMethod } from "./auth.js";

export {
  WooError,
  WooAuthError,
  WooNotFoundError,
  WooValidationError,
  WooRateLimitError,
  WooServerError,
  WooNetworkError,
  type WooErrorContext,
  type WooErrorOptions,
} from "./errors.js";

export type { HttpMethod, HttpResponse } from "./http.js";

export type {
  ListQuery,
  ListResult,
  PaginationMeta,
  RequestOptions,
  WooErrorResponseBody,
} from "./types/common.js";

export { paginate, extractPaginationMeta } from "./pagination.js";

// --- Resource exports (sınıflar + tipler + zod şemaları) ---

export {
  ProductsService,
  ProductSchema,
  ProductCategoryFullSchema,
  ProductTagFullSchema,
  ProductVariationSchema,
  ProductReviewSchema,
  type Product,
  type ProductCreateInput,
  type ProductUpdateInput,
  type ProductListQuery,
  type ProductCategoryFull,
  type ProductTagFull,
  type ProductVariation,
  type ProductReview,
} from "./resources/products.js";

export {
  OrdersService,
  OrderSchema,
  OrderStatusSchema,
  OrderNoteSchema,
  type Order,
  type OrderStatus,
  type OrderCreateInput,
  type OrderUpdateInput,
  type OrderListQuery,
  type OrderNote,
} from "./resources/orders.js";

export {
  CustomersService,
  CustomerSchema,
  CustomerDownloadSchema,
  type Customer,
  type CustomerCreateInput,
  type CustomerUpdateInput,
  type CustomerListQuery,
  type CustomerDownload,
} from "./resources/customers.js";

export {
  CouponsService,
  CouponSchema,
  CouponDiscountTypeSchema,
  type Coupon,
  type CouponCreateInput,
  type CouponUpdateInput,
  type CouponListQuery,
  type CouponDiscountType,
} from "./resources/coupons.js";

export {
  RefundsService,
  RefundSchema,
  type Refund,
  type RefundCreateInput,
} from "./resources/refunds.js";

export { ReportsService } from "./resources/reports.js";
export { TaxService } from "./resources/tax.js";
export { ShippingService } from "./resources/shipping.js";
export { PaymentGatewaysService } from "./resources/payments.js";
export { WebhooksService } from "./resources/webhooks.js";
export { SystemService } from "./resources/system.js";
export { SettingsService } from "./resources/settings.js";
export { DataService } from "./resources/data.js";

export { createLogger, type Logger } from "./logger.js";
