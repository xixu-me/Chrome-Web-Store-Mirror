/**
 * Detail page handler
 */

import { getItems } from "../services/cache.js";
import { proxyRequest } from "../utils/proxy.js";
import { handle404 } from "./error.js";

/**
 * Handles requests for item detail pages.
 * @param {Request} request The incoming request.
 * @returns {Promise<Response>} A promise that resolves to the response.
 */
export async function handleDetail(request) {
  const url = new URL(request.url);
  const itemId = url.pathname.split("/")[2];
  const items = await getItems();
  const item = items.find((i) => i.id === itemId);

  if (!item) {
    return handle404(request);
  }

  return proxyRequest(request, item.page, itemId);
}
