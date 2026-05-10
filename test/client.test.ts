import { afterEach, describe, expect, it } from "vitest";
import { makeMockClient } from "./_mock.js";

describe("WooCommerceClient", () => {
  let cleanup: (() => Promise<void>) | undefined;
  afterEach(async () => {
    await cleanup?.();
    cleanup = undefined;
  });

  it("exposes all resource services", () => {
    const { client, agent } = makeMockClient();
    cleanup = () => agent.close();

    expect(client.products).toBeDefined();
    expect(client.orders).toBeDefined();
    expect(client.customers).toBeDefined();
    expect(client.coupons).toBeDefined();
    expect(client.refunds).toBeDefined();
    expect(client.reports).toBeDefined();
    expect(client.tax).toBeDefined();
    expect(client.shipping).toBeDefined();
    expect(client.payments).toBeDefined();
    expect(client.webhooks).toBeDefined();
    expect(client.system).toBeDefined();
    expect(client.settings).toBeDefined();
    expect(client.data).toBeDefined();
  });

  it("supports generic request<T>() for arbitrary endpoints", async () => {
    const { client, agent, mockPool } = makeMockClient();
    cleanup = () => agent.close();

    mockPool
      .intercept({ path: "/wp-json/wc/v3/reports/sales?period=week", method: "GET" })
      .reply(200, [{ total_sales: "1000.00" }], {
        headers: { "content-type": "application/json" },
      });

    type SalesRow = { total_sales: string };
    const result = await client.request<SalesRow[]>("GET", "/reports/sales", {
      query: { period: "week" },
    });
    expect(result).toEqual([{ total_sales: "1000.00" }]);
  });

  it("supports custom api version", async () => {
    const { WooCommerceClient } = await import("../src/client.js");
    const { createLogger } = await import("../src/logger.js");
    const { MockAgent } = await import("undici");

    const agent = new MockAgent();
    agent.disableNetConnect();
    const pool = agent.get("https://store.test");

    cleanup = () => agent.close();

    const client = new WooCommerceClient({
      url: "https://store.test",
      consumerKey: "ck_test",
      consumerSecret: "cs_test",
      authMethod: "basic",
      logger: createLogger({ level: "silent" }),
      dispatcher: agent,
      version: "wc/v2",
      retries: 0,
    });

    pool
      .intercept({ path: "/wp-json/wc/v2/products/1", method: "GET" })
      .reply(200, { id: 1, name: "Test" }, { headers: { "content-type": "application/json" } });

    const p = await client.products.get(1);
    expect(p.id).toBe(1);
  });

  it("rejects http URL at construction", async () => {
    const { WooCommerceClient } = await import("../src/client.js");
    expect(
      () =>
        new WooCommerceClient({
          url: "http://insecure.test",
          consumerKey: "ck_test",
          consumerSecret: "cs_test",
        }),
    ).toThrow(/HTTPS required/);
  });

  it("query auth mode: credentials in URL, no Authorization header", async () => {
    const { client, agent, mockPool } = makeMockClient({ authMethod: "query" });
    cleanup = () => agent.close();

    let seenAuth: string | undefined;
    let seenKey: string | null = null;
    let seenSecret: string | null = null;

    mockPool
      .intercept({
        path: (p: string) => {
          const url = new URL(`https://store.test${p}`);
          seenKey = url.searchParams.get("consumer_key");
          seenSecret = url.searchParams.get("consumer_secret");
          return p.startsWith("/wp-json/wc/v3/products/1");
        },
        method: "GET",
        headers: (h: Record<string, string>) => {
          seenAuth = h["authorization"] ?? h["Authorization"];
          return true;
        },
      })
      .reply(200, { id: 1, name: "Q" }, { headers: { "content-type": "application/json" } });

    const product = await client.products.get(1);
    expect(product.id).toBe(1);
    expect(seenKey).toBe("ck_test");
    expect(seenSecret).toBe("cs_test");
    expect(seenAuth).toBeUndefined();
  });

  it("basic auth mode: Authorization header sent, URL has no credentials", async () => {
    const { client, agent, mockPool } = makeMockClient({ authMethod: "basic" });
    cleanup = () => agent.close();

    let seenAuth: string | undefined;
    let seenKey: string | null = null;

    mockPool
      .intercept({
        path: (p: string) => {
          const url = new URL(`https://store.test${p}`);
          seenKey = url.searchParams.get("consumer_key");
          return p.startsWith("/wp-json/wc/v3/products/1");
        },
        method: "GET",
        headers: (h: Record<string, string>) => {
          seenAuth = h["authorization"] ?? h["Authorization"];
          return true;
        },
      })
      .reply(200, { id: 1, name: "B" }, { headers: { "content-type": "application/json" } });

    await client.products.get(1);
    expect(seenAuth).toMatch(/^Basic /);
    expect(seenKey).toBeNull();
  });
});
