/**
 * Shipping resource — generic typed.
 *
 * Kapsama: shipping zones, zone locations, zone methods, ve shipping methods katalog.
 * Endpoints: https://woocommerce.github.io/woocommerce-rest-api-docs/#shipping-zones
 */
export class ShippingService {
    client;
    constructor(client) {
        this.client = client;
    }
    // --- Zones ---
    listZones(options) {
        return this.client.request("GET", "/shipping/zones", options);
    }
    getZone(id, options) {
        return this.client.request("GET", `/shipping/zones/${id}`, options);
    }
    createZone(input, options) {
        return this.client.request("POST", "/shipping/zones", { body: input, ...options });
    }
    updateZone(id, input, options) {
        return this.client.request("PUT", `/shipping/zones/${id}`, { body: input, ...options });
    }
    deleteZone(id, opts = {}, options) {
        return this.client.request("DELETE", `/shipping/zones/${id}`, {
            query: opts.force ? { force: true } : undefined,
            ...options,
        });
    }
    // --- Zone locations ---
    listZoneLocations(zoneId, options) {
        return this.client.request("GET", `/shipping/zones/${zoneId}/locations`, options);
    }
    /**
     * Zone'un location'larını topluca değiştirir (PUT, replace semantics).
     */
    setZoneLocations(zoneId, locations, options) {
        return this.client.request("PUT", `/shipping/zones/${zoneId}/locations`, {
            body: locations,
            ...options,
        });
    }
    // --- Zone methods ---
    listZoneMethods(zoneId, options) {
        return this.client.request("GET", `/shipping/zones/${zoneId}/methods`, options);
    }
    getZoneMethod(zoneId, instanceId, options) {
        return this.client.request("GET", `/shipping/zones/${zoneId}/methods/${instanceId}`, options);
    }
    addZoneMethod(zoneId, input, options) {
        return this.client.request("POST", `/shipping/zones/${zoneId}/methods`, {
            body: input,
            ...options,
        });
    }
    updateZoneMethod(zoneId, instanceId, input, options) {
        return this.client.request("PUT", `/shipping/zones/${zoneId}/methods/${instanceId}`, { body: input, ...options });
    }
    deleteZoneMethod(zoneId, instanceId, opts = {}, options) {
        return this.client.request("DELETE", `/shipping/zones/${zoneId}/methods/${instanceId}`, { query: opts.force ? { force: true } : undefined, ...options });
    }
    // --- Shipping methods katalog ---
    listMethods(options) {
        return this.client.request("GET", "/shipping_methods", options);
    }
    getMethod(id, options) {
        return this.client.request("GET", `/shipping_methods/${id}`, options);
    }
}
//# sourceMappingURL=shipping.js.map