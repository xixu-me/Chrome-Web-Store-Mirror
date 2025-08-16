/**
 * Tests for URL utilities
 */

import { describe, expect, it } from "vitest";
import { rewriteUrls } from "../src/utils/url.js";

describe("URL Utils", () => {
  it("should rewrite Chrome Web Store URLs", () => {
    const content = "Visit https://chromewebstore.google.com/detail/test";
    const origin = "https://mirror.example.com";

    const result = rewriteUrls(content, origin);

    expect(result).toBe("Visit https://mirror.example.com/detail/test");
  });

  it("should rewrite HTML attributes", () => {
    const content = '<a href="/category/extensions">Extensions</a>';
    const origin = "https://mirror.example.com";

    const result = rewriteUrls(content, origin);

    expect(result).toBe(
      '<a href="https://mirror.example.com/category/extensions">Extensions</a>'
    );
  });

  it("should handle multiple URL replacements", () => {
    const content = `
      <link href="/styles.css" rel="stylesheet">
      <script src="/script.js"></script>
      Visit https://chromewebstore.google.com
    `;
    const origin = "https://mirror.example.com";

    const result = rewriteUrls(content, origin);

    expect(result).toContain('href="https://mirror.example.com/styles.css"');
    expect(result).toContain('src="https://mirror.example.com/script.js"');
    expect(result).toContain("Visit https://mirror.example.com");
  });
});
