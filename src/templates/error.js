/**
 * Error page template for Chrome Web Store Mirror
 * 
 * Provides HTML templates for various error pages (404, 500, etc.).
 */

import { getPageTemplate, htmlElements } from "./base.js";

/**
 * Generates a 404 error page
 * @param {string} requestedPath - The path that was not found
 * @returns {string} Complete 404 page HTML
 */
export function get404PageTemplate(requestedPath = '') {
  const errorContent = `
    <div style="text-align: center;">
      <div class="error-icon">🔍</div>
      
      <h2 class="error-code">404</h2>
      
      <h3 class="error-title">Page Not Found</h3>
      
      <p class="error-description">
        Sorry, the page you are looking for could not be found. It might have been moved, deleted, or you entered the wrong URL.
      </p>
      
      ${requestedPath ? `<div class="error-path">${requestedPath}</div>` : ''}
      
      <div class="actions">
        ${htmlElements.button('🏠 Go to Home', '/', 'primary')}
      </div>
    </div>
  `;

  return getPageTemplate(
    "404 - Page Not Found | Chrome Web Store Mirror",
    errorContent,
    {
      pageType: 'error',
      meta: {
        'description': 'Page not found - Chrome Web Store Mirror',
        'robots': 'noindex, nofollow'
      }
    }
  );
}

/**
 * Generates a generic error page
 * @param {number} statusCode - HTTP status code
 * @param {string} statusText - HTTP status text
 * @param {string} message - Error message
 * @param {string} details - Additional error details
 * @returns {string} Complete error page HTML
 */
export function getErrorPageTemplate(statusCode = 500, statusText = 'Internal Server Error', message = '', details = '') {
  const errorContent = `
    <div style="text-align: center;">
      <div class="error-icon">⚠️</div>
      
      <h2 class="error-code">${statusCode}</h2>
      
      <h3 class="error-title">${statusText}</h3>
      
      ${message ? `<p class="error-description">${message}</p>` : ''}
      
      ${details ? `<div class="error-path">${details}</div>` : ''}
      
      <div class="actions">
        ${htmlElements.button('🏠 Go to Home', '/', 'primary')}
        ${htmlElements.button('🔄 Try Again', 'javascript:location.reload()', 'secondary')}
      </div>
    </div>
  `;

  return getPageTemplate(
    `${statusCode} - ${statusText} | Chrome Web Store Mirror`,
    errorContent,
    {
      pageType: 'error',
      meta: {
        'description': `${statusCode} error - Chrome Web Store Mirror`,
        'robots': 'noindex, nofollow'
      }
    }
  );
}
