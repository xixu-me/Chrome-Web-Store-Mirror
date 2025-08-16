/**
 * Search page handler for Chrome Web Store Mirror
 * 
 * Handles requests for the search functionality, allowing users to
 * search through available extensions and themes.
 */

import { MAX_SEARCH_RESULTS } from "../config/constants.js";
import { getItems } from "../services/cache.js";
import { getSearchPageTemplate } from "../templates/search.js";

/**
 * Handles requests for the search page
 * @param {Request} request - The incoming request
 * @returns {Promise<Response>} Response containing the search page
 */
export async function handleSearch(request) {
  const url = new URL(request.url);
  const pathSegments = url.pathname.split("/");
  const queryFromUrl = pathSegments[2]
    ? decodeURIComponent(pathSegments[2])
    : "";

  try {
    const items = await getItems();
    const searchPageHtml = getSearchPageTemplate(items, queryFromUrl, MAX_SEARCH_RESULTS);

    return new Response(searchPageHtml, {
      headers: { "Content-Type": "text/html;charset=UTF-8" },
    });
  } catch (error) {
    console.error("Error generating search page:", error);
    
    // Return a simple fallback search page
    const fallbackHtml = getSearchPageTemplate([], queryFromUrl, MAX_SEARCH_RESULTS);
    return new Response(fallbackHtml, {
      status: 500,
      headers: { "Content-Type": "text/html;charset=UTF-8" },
    });
  }
}
