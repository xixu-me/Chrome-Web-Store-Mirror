/**
 * Proxy utilities for handling requests to Chrome Web Store
 * 
 * Handles proxying requests to the original Chrome Web Store while
 * applying necessary URL rewrites and adding download banners.
 */

import { getStyles } from "../assets/styles.js";
import { handleRedirect, rewriteUrls } from "./url.js";

/**
 * Proxies and processes a request to the original Chrome Web Store
 * @param {Request} request - The incoming request
 * @param {string} targetUrl - The URL to proxy to
 * @param {string} itemId - The item ID (optional, only for detail pages)
 * @returns {Promise<Response>} A promise that resolves to the processed response
 */
export async function proxyRequest(request, targetUrl, itemId = null) {
  const response = await fetch(targetUrl, {
    headers: {
      "User-Agent": request.headers.get("User-Agent") || "Cloudflare Worker",
      Accept: request.headers.get("Accept") || "*/*",
      "Accept-Language":
        request.headers.get("Accept-Language") || "en-US,en;q=0.9",
      Referer: new URL(targetUrl).origin,
    },
    redirect: "manual",
  });

  if ([301, 302, 307, 308].includes(response.status)) {
    return handleRedirect(response, request);
  }

  if (!response.ok) {
    return new Response(
      `Failed to fetch from Chrome Web Store: ${response.status}`,
      {
        status: response.status,
      }
    );
  }

  const contentType = response.headers.get("Content-Type") || "";
  const workerUrl = new URL(request.url);

  if (contentType.includes("text/html")) {
    let html = await response.text();
    html = rewriteUrls(html, workerUrl.origin);
    // Only add banner on detail pages
    if (itemId) {
      html = addDownloadBanner(html, itemId, workerUrl.origin);
    }
    return new Response(html, {
      status: 200,
      headers: { "Content-Type": "text/html; charset=UTF-8" },
    });
  } else if (contentType.includes("text/css")) {
    let css = await response.text();
    css = rewriteUrls(css, workerUrl.origin);
    return new Response(css, {
      status: 200,
      headers: { "Content-Type": "text/css; charset=UTF-8" },
    });
  } else if (
    contentType.includes("javascript") ||
    contentType.includes("json")
  ) {
    let js = await response.text();
    js = rewriteUrls(js, workerUrl.origin);
    return new Response(js, {
      status: 200,
      headers: { "Content-Type": contentType },
    });
  } else {
    return new Response(response.body, {
      status: 200,
      headers: { "Content-Type": contentType },
    });
  }
}

/**
 * Adds a download banner to the HTML with a CRX download link (only for detail pages)
 * @param {string} html - The HTML content
 * @param {string} itemId - The item ID for the CRX download
 * @param {string} origin - The origin of the worker
 * @returns {string} The HTML with the banner added
 */
function addDownloadBanner(html, itemId, origin) {
  const banner = `
  <div id="mirror-banner">
    <style>${getStyles('banner')}</style>
    <div class="info">
      <span>📦</span>
      <span>Download this extension or theme safely</span>
    </div>
    <a href="${origin}/crx/${itemId}" class="download-btn">
      <span>⬇️</span>
      <span>Download CRX</span>
    </a>
  </div>
  `;
  
  return html.replace(/<body[^>]*>/, `$&${banner}`);
}
