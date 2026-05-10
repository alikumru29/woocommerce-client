import { afterEach, describe, expect, it } from "vitest";
import { WooValidationError } from "../../src/errors.js";
import { makeMockClient } from "../_mock.js";

describe("ProductsService", () => {
  let cleanup: (() => Promise<void>) | undefined;
  afterEach(async () => {
    await cleanup?.();
    cleanup = undefined;
  });

  it("list() returns parsed products with pagination meta", async () => {
    const { client, agent, mockPool } = makeMockClient();
    cleanup = () => agent.close();

    mockPool
      .intercept({ path: /\/wp-json\/wc\/v3\/products\?.*/, method: "GET" })
      .reply(
        200,
        [
          { id: 1, name: "A" },
          { id: 2, name: "B" },
        ],
        { headers: { "x-wp-total": "2", "x-wp-totalpages": "1", "content-type": "application/json" } },
      );

    const result = await client.products.list({ per_page: 50 });
    expect(result.data).toHaveLength(2);
    expect(result.data[0]?.id).toBe(1);
    expect(result.meta.total).toBe(2);
    expect(result.meta.totalPages).toBe(1);
  });

  it("get() returns a parsed product", async () => {
    const { client, agent, mockPool } = makeMockClient();
    cleanup = () => agent.close();

    mockPool
      .intercept({ path: "/wp-json/wc/v3/products/42", method: "GET" })
      .reply(
        200,
        { id: 42, name: "Test Product", price: "9.99", status: "publish" },
        { headers: { "content-type": "application/json" } },
      );

    const product = await client.products.get(42);
    expect(product.id).toBe(42);
    expect(product.name).toBe("Test Product");
    expect(product.price).toBe("9.99");
    expect(product.status).toBe("publish");
  });

  it("create() POSTs and returns parsed product", async () => {
    const { client, agent, mockPool } = makeMockClient();
    cleanup = () => agent.close();

    mockPool
      .intercept({ path: "/wp-json/wc/v3/products", method: "POST" })
      .reply(
        201,
        { id: 99, name: "New Product" },
        { headers: { "content-type": "application/json" } },
      );

    const product = await client.products.create({ name: "New Product" });
    expect(product.id).toBe(99);
  });

  it("rejects invalid response shape with WooValidationError", async () => {
    const { client, agent, mockPool } = makeMockClient();
    cleanup = () => agent.close();

    mockPool
      .intercept({ path: "/wp-json/wc/v3/products/1", method: "GET" })
      .reply(200, { id: "not-a-number" }, { headers: { "content-type": "application/json" } });

    await expect(client.products.get(1)).rejects.toBeInstanceOf(WooValidationError);
  });

  it("delete() with force=true sends query param", async () => {
    const { client, agent, mockPool } = makeMockClient();
    cleanup = () => agent.close();

    mockPool
      .intercept({ path: "/wp-json/wc/v3/products/1?force=true", method: "DELETE" })
      .reply(200, { id: 1, name: "Deleted" }, { headers: { "content-type": "application/json" } });

    const product = await client.products.delete(1, { force: true });
    expect(product.id).toBe(1);
  });
});
