import pino, { type Logger, type LoggerOptions } from "pino";

/**
 * Paket geneli logger factory.
 *
 * Kullanıcı kendi pino instance'ını verebilir; vermezse default oluşturulur.
 * Sessizlik için `level: "silent"` kullanılabilir.
 */
export function createLogger(options: LoggerOptions = {}): Logger {
  return pino({
    name: "woocommerce-client",
    level: process.env["WC_LOG_LEVEL"] ?? "info",
    ...options,
  });
}

export type { Logger };
