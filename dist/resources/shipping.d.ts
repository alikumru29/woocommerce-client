import type { WooCommerceClient } from "../client.js";
import type { RequestOptions } from "../types/common.js";
/**
 * Shipping resource — generic typed.
 *
 * Kapsama: shipping zones, zone locations, zone methods, ve shipping methods katalog.
 * Endpoints: https://woocommerce.github.io/woocommerce-rest-api-docs/#shipping-zones
 */
export declare class ShippingService {
    private readonly client;
    constructor(client: WooCommerceClient);
    listZones<T = unknown>(options?: RequestOptions): Promise<T>;
    getZone<T = unknown>(id: number, options?: RequestOptions): Promise<T>;
    createZone<T = unknown>(input: {
        name: string;
        order?: number;
    }, options?: RequestOptions): Promise<T>;
    updateZone<T = unknown>(id: number, input: Record<string, unknown>, options?: RequestOptions): Promise<T>;
    deleteZone<T = unknown>(id: number, opts?: {
        force?: boolean;
    }, options?: RequestOptions): Promise<T>;
    listZoneLocations<T = unknown>(zoneId: number, options?: RequestOptions): Promise<T>;
    /**
     * Zone'un location'larını topluca değiştirir (PUT, replace semantics).
     */
    setZoneLocations<T = unknown>(zoneId: number, locations: Array<{
        code: string;
        type: "postcode" | "state" | "country" | "continent";
    }>, options?: RequestOptions): Promise<T>;
    listZoneMethods<T = unknown>(zoneId: number, options?: RequestOptions): Promise<T>;
    getZoneMethod<T = unknown>(zoneId: number, instanceId: number, options?: RequestOptions): Promise<T>;
    addZoneMethod<T = unknown>(zoneId: number, input: {
        method_id: string;
        settings?: Record<string, unknown>;
    }, options?: RequestOptions): Promise<T>;
    updateZoneMethod<T = unknown>(zoneId: number, instanceId: number, input: Record<string, unknown>, options?: RequestOptions): Promise<T>;
    deleteZoneMethod<T = unknown>(zoneId: number, instanceId: number, opts?: {
        force?: boolean;
    }, options?: RequestOptions): Promise<T>;
    listMethods<T = unknown>(options?: RequestOptions): Promise<T>;
    getMethod<T = unknown>(id: string, options?: RequestOptions): Promise<T>;
}
//# sourceMappingURL=shipping.d.ts.map