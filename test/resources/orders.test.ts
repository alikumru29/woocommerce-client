import { afterEach, describe, expect, it } from "vitest";
import { makeMockClient } from "../_mock.js";

describe("OrdersService", () => {
  let cleanup: (() => Promise<void>) | undefined;
  afterEach(async () => {
    await cleanup?.();
    cleanup = undefined;
  });

  it("list() parses orders", async () => {
    const { client, agent, mockPool } = makeMockClient();
    cleanup = () => agent.close();

    mockPool
      .intercept({ path: /\/wp-json\/wc\/v3\/orders\?.*/, method: "GET" })
      .reply(
        200,
        [
          { id: 100, status: "processing", total: "50.00" },
          { id: 101, status: "completed", total: "120.00" },
        ],
        { headers: { "x-wp-total": "2", "x-wp-totalpages": "1", "content-type": "application/json" } },
      );

    const result = await client.orders.list({ status: "any" });
    expect(result.data).toHaveLength(2);
    expect(result.data[0]?.status).toBe("processing");
  });

  it("get() returns order with line items", async () => {
    const { client, agent, mockPool } = makeMockClient();
    cleanup = () => agent.close();

    mockPool.intercept({ path: "/wp-json/wc/v3/orders/100", method: "GET" }).reply(
      200,
      {
        id: 100,
        status: "processing",
        line_items: [{ id: 1, product_id: 5, quantity: 2 }],
      },
      { headers: { "content-type": "application/json" } },
    );

    const order = await client.orders.get(100);
    expect(order.id).toBe(100);
    expect(order.line_items?.[0]?.product_id).toBe(5);
  });

  it("addNote() POSTs to /orders/:id/notes", async () => {
    const { client, agent, mockPool } = makeMockClient();
    cleanup = () => agent.close();

    mockPool.intercept({ path: "/wp-json/wc/v3/orders/100/notes", method: "POST" }).reply(
      201,
      { id: 1, note: "Shipped today", customer_note: true },
      { headers: { "content-type": "application/json" } },
    );

    const note = await client.orders.addNote(100, { note: "Shipped today", customer_note: true });
    expect(note.id).toBe(1);
    expect(note.note).toBe("Shipped today");
  });
});
