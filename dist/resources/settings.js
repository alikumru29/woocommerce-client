/**
 * Settings resource — generic typed.
 *
 * WooCommerce ayarları gruplara ayrılmıştır (general, products, tax, ...).
 * Her grup birden çok setting içerir.
 *
 * Endpoints: https://woocommerce.github.io/woocommerce-rest-api-docs/#settings
 */
export class SettingsService {
    client;
    constructor(client) {
        this.client = client;
    }
    /** Tüm setting gruplarını listeler. */
    listGroups(options) {
        return this.client.request("GET", "/settings", options);
    }
    /** Bir gruptaki tüm setting'leri listeler. */
    listOptions(groupId, options) {
        return this.client.request("GET", `/settings/${groupId}`, options);
    }
    /** Tek bir setting'i okur. */
    getOption(groupId, optionId, options) {
        return this.client.request("GET", `/settings/${groupId}/${optionId}`, options);
    }
    /** Tek bir setting'i günceller. */
    updateOption(groupId, optionId, input, options) {
        return this.client.request("PUT", `/settings/${groupId}/${optionId}`, {
            body: input,
            ...options,
        });
    }
    /** Bir gruptaki birden çok setting'i topluca günceller (batch). */
    batchUpdate(groupId, input, options) {
        return this.client.request("POST", `/settings/${groupId}/batch`, {
            body: input,
            ...options,
        });
    }
}
//# sourceMappingURL=settings.js.map