import { MockAgent } from "undici";
import { createLogger } from "../src/logger.js";
import { WooCommerceClient } from "../src/client.js";

/**
 * Test helper'ı — sessiz logger + MockAgent + hazır WooCommerceClient.
 *
 * Kullanım:
 * ```ts
 * const { client, mockPool } = makeMockClient();
 * mockPool.intercept({ path: "/wp-json/wc/v3/products", method: "GET" })
 *         .reply(200, [], { headers: { "x-wp-total": "0" } });
 * await client.products.list();
 * ```
 */
export function makeMockClient(opts: { url?: string } = {}) {
  const url = opts.url ?? "https://store.test";
  const agent = new MockAgent();
  agent.disableNetConnect();
  const mockPool = agent.get(url);

  const client = new WooCommerceClient({
    url,
    consumerKey: "ck_test",
    consumerSecret: "cs_test",
    logger: createLogger({ level: "silent" }),
    dispatcher: agent,
    retries: 0,
  });

  return { client, agent, mockPool };
}
