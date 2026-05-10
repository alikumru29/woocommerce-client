import { describe, expect, it } from "vitest";
import { extractPaginationMeta, paginate } from "../src/pagination.js";

describe("pagination", () => {
  describe("extractPaginationMeta", () => {
    it("reads X-WP-Total and X-WP-TotalPages headers", () => {
      const meta = extractPaginationMeta(
        {
          status: 200,
          headers: { "x-wp-total": "123", "x-wp-totalpages": "13" },
          body: [],
        },
        2,
        10,
      );
      expect(meta.total).toBe(123);
      expect(meta.totalPages).toBe(13);
      expect(meta.page).toBe(2);
      expect(meta.perPage).toBe(10);
    });

    it("falls back to data length when headers missing", () => {
      const meta = extractPaginationMeta(
        { status: 200, headers: {}, body: [{}, {}, {}] },
        1,
        10,
      );
      expect(meta.total).toBe(3);
      expect(meta.totalPages).toBe(1);
    });
  });

  describe("paginate", () => {
    it("yields items across pages until totalPages", async () => {
      const fetched: number[] = [];
      const all: number[] = [];
      const fetchPage = async (page: number) => {
        fetched.push(page);
        if (page === 1) {
          return {
            data: [1, 2, 3],
            meta: { total: 5, totalPages: 2, page: 1, perPage: 3 },
          };
        }
        return {
          data: [4, 5],
          meta: { total: 5, totalPages: 2, page: 2, perPage: 3 },
        };
      };

      for await (const x of paginate<number>(fetchPage)) all.push(x);

      expect(all).toEqual([1, 2, 3, 4, 5]);
      expect(fetched).toEqual([1, 2]);
    });

    it("stops on empty page", async () => {
      const fetchPage = async () => ({
        data: [] as number[],
        meta: { total: 0, totalPages: 0, page: 1, perPage: 10 },
      });
      const out: number[] = [];
      for await (const x of paginate<number>(fetchPage)) out.push(x);
      expect(out).toEqual([]);
    });
  });
});
