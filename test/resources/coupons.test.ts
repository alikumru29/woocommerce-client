import { afterEach, describe, expect, it } from "vitest";
import { makeMockClient } from "../_mock.js";

describe("CouponsService", () => {
  let cleanup: (() => Promise<void>) | undefined;
  afterEach(async () => {
    await cleanup?.();
    cleanup = undefined;
  });

  it("create() POSTs new coupon", async () => {
    const { client, agent, mockPool } = makeMockClient();
    cleanup = () => agent.close();

    mockPool.intercept({ path: "/wp-json/wc/v3/coupons", method: "POST" }).reply(
      201,
      { id: 1, code: "SUMMER20", discount_type: "percent", amount: "20" },
      { headers: { "content-type": "application/json" } },
    );

    const coupon = await client.coupons.create({
      code: "SUMMER20",
      discount_type: "percent",
      amount: "20",
    });
    expect(coupon.code).toBe("SUMMER20");
  });

  it("list() parses coupons", async () => {
    const { client, agent, mockPool } = makeMockClient();
    cleanup = () => agent.close();

    mockPool.intercept({ path: /\/wp-json\/wc\/v3\/coupons\?.*/, method: "GET" }).reply(
      200,
      [{ id: 1, code: "X" }],
      { headers: { "x-wp-total": "1", "content-type": "application/json" } },
    );

    const result = await client.coupons.list();
    expect(result.data[0]?.code).toBe("X");
  });
});
