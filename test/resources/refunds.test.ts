import { afterEach, describe, expect, it } from "vitest";
import { makeMockClient } from "../_mock.js";

describe("RefundsService", () => {
  let cleanup: (() => Promise<void>) | undefined;
  afterEach(async () => {
    await cleanup?.();
    cleanup = undefined;
  });

  it("list() returns refunds for an order", async () => {
    const { client, agent, mockPool } = makeMockClient();
    cleanup = () => agent.close();

    mockPool.intercept({ path: /\/wp-json\/wc\/v3\/orders\/100\/refunds\?.*/, method: "GET" }).reply(
      200,
      [{ id: 1, amount: "10.00", reason: "test" }],
      { headers: { "x-wp-total": "1", "content-type": "application/json" } },
    );

    const result = await client.refunds.list(100);
    expect(result.data[0]?.amount).toBe("10.00");
  });

  it("create() POSTs new refund", async () => {
    const { client, agent, mockPool } = makeMockClient();
    cleanup = () => agent.close();

    mockPool.intercept({ path: "/wp-json/wc/v3/orders/100/refunds", method: "POST" }).reply(
      201,
      { id: 50, amount: "25.00", reason: "Customer request" },
      { headers: { "content-type": "application/json" } },
    );

    const refund = await client.refunds.create(100, {
      amount: "25.00",
      reason: "Customer request",
    });
    expect(refund.id).toBe(50);
  });
});
