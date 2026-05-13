import pino from "pino";
/**
 * Paket geneli logger factory.
 *
 * Kullanıcı kendi pino instance'ını verebilir; vermezse default oluşturulur.
 * Sessizlik için `level: "silent"` kullanılabilir.
 */
export function createLogger(options = {}) {
    return pino({
        name: "woocommerce-client",
        level: process.env["WC_LOG_LEVEL"] ?? "info",
        ...options,
    });
}
//# sourceMappingURL=logger.js.map