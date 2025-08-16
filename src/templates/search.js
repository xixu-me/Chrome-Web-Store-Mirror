/**
 * Search page template for Chrome Web Store Mirror
 * 
 * Provides the HTML template and structure for the search functionality.
 */

import { getSearchScript } from "../assets/scripts.js";
import { getPageTemplate } from "./base.js";

/**
 * Generates the search page HTML
 * @param {Array} items - Array of extension items
 * @param {string} initialQuery - Initial search query from URL
 * @param {number} maxResults - Maximum number of results to display
 * @returns {string} Complete search page HTML
 */
export function getSearchPageTemplate(items, initialQuery = '', maxResults = 100) {
  const searchContent = `
    <div class="search-container">
      <input type="text" id="search-input" placeholder="Search extensions and themes...">
      <div class="search-icon">🔍</div>
    </div>
    
    <div id="results"></div>
  `;

  const searchPageHtml = getPageTemplate(
    "Chrome Web Store Mirror", 
    searchContent,
    {
      pageType: 'search',
      scripts: getSearchScript(items, initialQuery, maxResults),
      meta: {
        'description': 'Search and browse extensions and themes safely',
        'keywords': 'chrome extensions, search, web store mirror, crx download'
      }
    }
  );

  return searchPageHtml;
}
