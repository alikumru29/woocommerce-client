import { describe, expect, it } from "vitest";
import {
  appendQueryAuth,
  assertHttpsUrl,
  buildBasicAuthHeader,
  sanitizeUrlForLog,
} from "../src/auth.js";

describe("auth", () => {
  describe("buildBasicAuthHeader", () => {
    it("creates a Basic Auth header from key/secret", () => {
      const header = buildBasicAuthHeader({
        consumerKey: "ck_test",
        consumerSecret: "cs_test",
      });
      const expected = Buffer.from("ck_test:cs_test").toString("base64");
      expect(header).toBe(`Basic ${expected}`);
    });

    it("throws when consumerKey is empty", () => {
      expect(() =>
        buildBasicAuthHeader({ consumerKey: "", consumerSecret: "cs_test" }),
      ).toThrow(/consumerKey/);
    });

    it("throws when consumerSecret is empty", () => {
      expect(() =>
        buildBasicAuthHeader({ consumerKey: "ck_test", consumerSecret: "" }),
      ).toThrow(/consumerSecret/);
    });
  });

  describe("assertHttpsUrl", () => {
    it("accepts https URLs", () => {
      const url = assertHttpsUrl("https://store.example.com");
      expect(url.protocol).toBe("https:");
    });

    it("rejects http URLs", () => {
      expect(() => assertHttpsUrl("http://store.example.com")).toThrow(/HTTPS required/);
    });

    it("rejects malformed URLs", () => {
      expect(() => assertHttpsUrl("not-a-url")).toThrow(/invalid URL/);
    });
  });

  describe("appendQueryAuth", () => {
    it("appends consumer_key and consumer_secret to a clean URL", () => {
      const out = appendQueryAuth("https://s.test/wp-json/wc/v3/products", {
        consumerKey: "ck_a",
        consumerSecret: "cs_b",
      });
      const url = new URL(out);
      expect(url.searchParams.get("consumer_key")).toBe("ck_a");
      expect(url.searchParams.get("consumer_secret")).toBe("cs_b");
    });

    it("preserves existing query params", () => {
      const out = appendQueryAuth("https://s.test/products?per_page=50&status=publish", {
        consumerKey: "ck_a",
        consumerSecret: "cs_b",
      });
      const url = new URL(out);
      expect(url.searchParams.get("per_page")).toBe("50");
      expect(url.searchParams.get("status")).toBe("publish");
      expect(url.searchParams.get("consumer_key")).toBe("ck_a");
    });

    it("throws when credentials are empty", () => {
      expect(() =>
        appendQueryAuth("https://s.test/", { consumerKey: "", consumerSecret: "x" }),
      ).toThrow();
    });
  });

  describe("sanitizeUrlForLog", () => {
    it("masks consumer_key and consumer_secret", () => {
      const out = sanitizeUrlForLog(
        "https://s.test/products?consumer_key=ck_a&consumer_secret=cs_b&page=1",
      );
      const url = new URL(out);
      expect(url.searchParams.get("consumer_key")).toBe("***");
      expect(url.searchParams.get("consumer_secret")).toBe("***");
      expect(url.searchParams.get("page")).toBe("1");
    });

    it("returns input unchanged when not a URL", () => {
      expect(sanitizeUrlForLog("not a url")).toBe("not a url");
    });

    it("leaves URLs without credentials unchanged", () => {
      const original = "https://s.test/products?page=2";
      expect(sanitizeUrlForLog(original)).toBe(new URL(original).toString());
    });
  });
});
