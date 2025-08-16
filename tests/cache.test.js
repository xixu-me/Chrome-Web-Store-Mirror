/**
 * Tests for cache service
 */

import { beforeEach, describe, expect, it, vi } from "vitest";

// Mock fetch globally
global.fetch = vi.fn();

describe("Cache Service", () => {
  let getItems;

  beforeEach(async () => {
    vi.clearAllMocks();
    // Reset the module to clear cache state
    vi.resetModules();
    const module = await import("../src/services/cache.js");
    getItems = module.getItems;
  });

  it("should fetch and cache items successfully", async () => {
    const mockData = [
      { id: "test1", name: "Test Extension 1" },
      { id: "test2", name: "Test Extension 2" },
    ];

    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    const items = await getItems();

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(items).toEqual(mockData);
  });

  it("should return cached items on subsequent calls", async () => {
    const mockData = [{ id: "test1", name: "Test Extension 1" }];

    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    // First call
    const firstItems = await getItems();

    // Second call should use cache (mock cache duration check)
    const secondItems = await getItems();

    expect(fetch).toHaveBeenCalledTimes(1); // Should still be 1
    expect(firstItems).toEqual(mockData);
    expect(secondItems).toEqual(mockData);
  });

  it("should handle fetch errors gracefully", async () => {
    global.fetch.mockRejectedValueOnce(new Error("Network error"));

    const items = await getItems();

    expect(items).toEqual([]);
  });
});
