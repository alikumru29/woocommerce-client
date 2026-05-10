import { describe, expect, it } from "vitest";
import { assertHttpsUrl, buildBasicAuthHeader } from "../src/auth.js";

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
});
