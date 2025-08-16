/**
 * CRX download handler
 */

import { getItems } from "../services/cache.js";
import { handle404 } from "./error.js";

/**
 * Handles requests for CRX file downloads.
 * @param {Request} request The incoming request.
 * @returns {Promise<Response>} A promise that resolves to the response.
 */
export async function handleCrx(request) {
  const url = new URL(request.url);
  const itemId = url.pathname.split("/")[2];
  const items = await getItems();
  const item = items.find((i) => i.id === itemId);

  if (!item) {
    return handle404(request);
  }

  const crxResponse = await fetch(item.file);
  const newHeaders = new Headers(crxResponse.headers);
  newHeaders.set(
    "Content-Disposition",
    `attachment; filename="${item.id}.crx"`
  );

  return new Response(crxResponse.body, {
    status: crxResponse.status,
    statusText: crxResponse.statusText,
    headers: newHeaders,
  });
}
