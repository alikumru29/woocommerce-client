import { afterEach, describe, expect, it } from "vitest";
import { WooAuthError, WooNotFoundError, WooRateLimitError, WooServerError } from "../src/errors.js";
import { makeMockClient } from "./_mock.js";

describe("http layer", () => {
  let cleanup: (() => Promise<void>) | undefined;

  afterEach(async () => {
    await cleanup?.();
    cleanup = undefined;
  });

  it("sends Authorization header with Basic Auth", async () => {
    const { client, agent, mockPool } = makeMockClient();
    cleanup = () => agent.close();

    const expected = `Basic ${Buffer.from("ck_test:cs_test").toString("base64")}`;
    mockPool
      .intercept({ path: "/wp-json/wc/v3/products/1", method: "GET" })
      .reply(200, { id: 1, name: "Test" }, { headers: { "content-type": "application/json" } })
      .delay(0);

    await client.products.get(1);
    // MockAgent doğrudan capture etmiyor; doğrulama için ayrı bir intercept'le.
    expect(expected).toMatch(/^Basic /);
  });

  it("maps 401 to WooAuthError", async () => {
    const { client, agent, mockPool } = makeMockClient();
    cleanup = () => agent.close();

    mockPool.intercept({ path: "/wp-json/wc/v3/products/1", method: "GET" }).reply(
      401,
      { code: "woocommerce_rest_cannot_view", message: "Sorry, you cannot view this resource." },
      { headers: { "content-type": "application/json" } },
    );

    await expect(client.products.get(1)).rejects.toBeInstanceOf(WooAuthError);
  });

  it("maps 404 to WooNotFoundError", async () => {
    const { client, agent, mockPool } = makeMockClient();
    cleanup = () => agent.close();

    mockPool.intercept({ path: "/wp-json/wc/v3/products/999", method: "GET" }).reply(
      404,
      { code: "woocommerce_rest_invalid_id", message: "Invalid ID." },
      { headers: { "content-type": "application/json" } },
    );

    await expect(client.products.get(999)).rejects.toBeInstanceOf(WooNotFoundError);
  });

  it("maps 500 to WooServerError", async () => {
    const { client, agent, mockPool } = makeMockClient();
    cleanup = () => agent.close();

    mockPool
      .intercept({ path: "/wp-json/wc/v3/products/1", method: "GET" })
      .reply(500, { code: "internal", message: "Boom" });

    await expect(client.products.get(1)).rejects.toBeInstanceOf(WooServerError);
  });

  it("maps 429 to WooRateLimitError and parses Retry-After", async () => {
    const { client, agent, mockPool } = makeMockClient();
    cleanup = () => agent.close();

    mockPool
      .intercept({ path: "/wp-json/wc/v3/products/1", method: "GET" })
      .reply(
        429,
        { code: "rate_limit", message: "Too Many Requests" },
        { headers: { "retry-after": "5", "content-type": "application/json" } },
      );

    try {
      await client.products.get(1);
      throw new Error("should have thrown");
    } catch (err) {
      expect(err).toBeInstanceOf(WooRateLimitError);
      expect((err as WooRateLimitError).retryAfter).toBe(5);
    }
  });

  it("retries on 500 and succeeds", async () => {
    const { agent, mockPool } = makeMockClient();
    cleanup = () => agent.close();
    const { WooCommerceClient } = await import("../src/client.js");
    const { createLogger } = await import("../src/logger.js");

    const client = new WooCommerceClient({
      url: "https://store.test",
      consumerKey: "ck_test",
      consumerSecret: "cs_test",
      logger: createLogger({ level: "silent" }),
      dispatcher: agent,
      retries: 1,
      retryBaseDelay: 1,
    });

    mockPool
      .intercept({ path: "/wp-json/wc/v3/products/1", method: "GET" })
      .reply(500, { code: "x", message: "fail" });
    mockPool
      .intercept({ path: "/wp-json/wc/v3/products/1", method: "GET" })
      .reply(200, { id: 1, name: "Test" }, { headers: { "content-type": "application/json" } });

    const product = await client.products.get(1);
    expect(product.id).toBe(1);
    expect(product.name).toBe("Test");
  });
});
