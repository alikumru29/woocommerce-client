import { afterEach, describe, expect, it } from "vitest";
import { makeMockClient } from "../_mock.js";

describe("CustomersService", () => {
  let cleanup: (() => Promise<void>) | undefined;
  afterEach(async () => {
    await cleanup?.();
    cleanup = undefined;
  });

  it("create() POSTs new customer", async () => {
    const { client, agent, mockPool } = makeMockClient();
    cleanup = () => agent.close();

    mockPool.intercept({ path: "/wp-json/wc/v3/customers", method: "POST" }).reply(
      201,
      { id: 1, email: "a@b.c", first_name: "A" },
      { headers: { "content-type": "application/json" } },
    );

    const customer = await client.customers.create({ email: "a@b.c", first_name: "A" });
    expect(customer.id).toBe(1);
    expect(customer.email).toBe("a@b.c");
  });

  it("get() retrieves customer", async () => {
    const { client, agent, mockPool } = makeMockClient();
    cleanup = () => agent.close();

    mockPool.intercept({ path: "/wp-json/wc/v3/customers/5", method: "GET" }).reply(
      200,
      { id: 5, email: "x@y.z" },
      { headers: { "content-type": "application/json" } },
    );

    const c = await client.customers.get(5);
    expect(c.id).toBe(5);
  });

  it("listDownloads() returns array", async () => {
    const { client, agent, mockPool } = makeMockClient();
    cleanup = () => agent.close();

    mockPool.intercept({ path: "/wp-json/wc/v3/customers/5/downloads", method: "GET" }).reply(
      200,
      [{ download_id: "d1", product_id: 10 }],
      { headers: { "content-type": "application/json" } },
    );

    const downloads = await client.customers.listDownloads(5);
    expect(downloads).toHaveLength(1);
    expect(downloads[0]?.download_id).toBe("d1");
  });
});
