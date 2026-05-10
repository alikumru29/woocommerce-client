import type { WooCommerceClient } from "../client.js";
import type { RequestOptions } from "../types/common.js";

/**
 * Shipping resource — generic typed.
 *
 * Kapsama: shipping zones, zone locations, zone methods, ve shipping methods katalog.
 * Endpoints: https://woocommerce.github.io/woocommerce-rest-api-docs/#shipping-zones
 */

export class ShippingService {
  constructor(private readonly client: WooCommerceClient) {}

  // --- Zones ---

  listZones<T = unknown>(options?: RequestOptions): Promise<T> {
    return this.client.request<T>("GET", "/shipping/zones", options);
  }

  getZone<T = unknown>(id: number, options?: RequestOptions): Promise<T> {
    return this.client.request<T>("GET", `/shipping/zones/${id}`, options);
  }

  createZone<T = unknown>(
    input: { name: string; order?: number },
    options?: RequestOptions,
  ): Promise<T> {
    return this.client.request<T>("POST", "/shipping/zones", { body: input, ...options });
  }

  updateZone<T = unknown>(
    id: number,
    input: Record<string, unknown>,
    options?: RequestOptions,
  ): Promise<T> {
    return this.client.request<T>("PUT", `/shipping/zones/${id}`, { body: input, ...options });
  }

  deleteZone<T = unknown>(
    id: number,
    opts: { force?: boolean } = {},
    options?: RequestOptions,
  ): Promise<T> {
    return this.client.request<T>("DELETE", `/shipping/zones/${id}`, {
      query: opts.force ? { force: true } : undefined,
      ...options,
    });
  }

  // --- Zone locations ---

  listZoneLocations<T = unknown>(zoneId: number, options?: RequestOptions): Promise<T> {
    return this.client.request<T>("GET", `/shipping/zones/${zoneId}/locations`, options);
  }

  /**
   * Zone'un location'larını topluca değiştirir (PUT, replace semantics).
   */
  setZoneLocations<T = unknown>(
    zoneId: number,
    locations: Array<{ code: string; type: "postcode" | "state" | "country" | "continent" }>,
    options?: RequestOptions,
  ): Promise<T> {
    return this.client.request<T>("PUT", `/shipping/zones/${zoneId}/locations`, {
      body: locations,
      ...options,
    });
  }

  // --- Zone methods ---

  listZoneMethods<T = unknown>(zoneId: number, options?: RequestOptions): Promise<T> {
    return this.client.request<T>("GET", `/shipping/zones/${zoneId}/methods`, options);
  }

  getZoneMethod<T = unknown>(
    zoneId: number,
    instanceId: number,
    options?: RequestOptions,
  ): Promise<T> {
    return this.client.request<T>(
      "GET",
      `/shipping/zones/${zoneId}/methods/${instanceId}`,
      options,
    );
  }

  addZoneMethod<T = unknown>(
    zoneId: number,
    input: { method_id: string; settings?: Record<string, unknown> },
    options?: RequestOptions,
  ): Promise<T> {
    return this.client.request<T>("POST", `/shipping/zones/${zoneId}/methods`, {
      body: input,
      ...options,
    });
  }

  updateZoneMethod<T = unknown>(
    zoneId: number,
    instanceId: number,
    input: Record<string, unknown>,
    options?: RequestOptions,
  ): Promise<T> {
    return this.client.request<T>(
      "PUT",
      `/shipping/zones/${zoneId}/methods/${instanceId}`,
      { body: input, ...options },
    );
  }

  deleteZoneMethod<T = unknown>(
    zoneId: number,
    instanceId: number,
    opts: { force?: boolean } = {},
    options?: RequestOptions,
  ): Promise<T> {
    return this.client.request<T>(
      "DELETE",
      `/shipping/zones/${zoneId}/methods/${instanceId}`,
      { query: opts.force ? { force: true } : undefined, ...options },
    );
  }

  // --- Shipping methods katalog ---

  listMethods<T = unknown>(options?: RequestOptions): Promise<T> {
    return this.client.request<T>("GET", "/shipping_methods", options);
  }

  getMethod<T = unknown>(id: string, options?: RequestOptions): Promise<T> {
    return this.client.request<T>("GET", `/shipping_methods/${id}`, options);
  }
}
