import { MockAgent } from "undici";
import { createLogger } from "../src/logger.js";
import { WooCommerceClient } from "../src/client.js";
import type { AuthMethod } from "../src/auth.js";

/**
 * Test helper'ı — sessiz logger + MockAgent + hazır WooCommerceClient.
 *
 * Default `authMethod: "basic"` — test path'lerini sade tutar. Query-mode'u
 * doğrulayan testler `{ authMethod: "query" }` ile override eder.
 */
export function makeMockClient(opts: { url?: string; authMethod?: AuthMethod } = {}) {
  const url = opts.url ?? "https://store.test";
  const agent = new MockAgent();
  agent.disableNetConnect();
  const mockPool = agent.get(url);

  const client = new WooCommerceClient({
    url,
    consumerKey: "ck_test",
    consumerSecret: "cs_test",
    authMethod: opts.authMethod ?? "basic",
    logger: createLogger({ level: "silent" }),
    dispatcher: agent,
    retries: 0,
  });

  return { client, agent, mockPool };
}
