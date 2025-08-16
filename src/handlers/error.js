/**
 * Error handling utilities for Chrome Web Store Mirror
 * 
 * Provides standardized error pages and error handling functionality
 * using the centralized template system.
 */

import { get404PageTemplate, getErrorPageTemplate } from "../templates/error.js";

/**
 * Handles 404 errors with a custom 404 page
 * @param {Request} request - The incoming request
 * @returns {Promise<Response>} Response containing the 404 page
 */
export async function handle404(request) {
  const url = new URL(request.url);
  const requestedPath = url.pathname;

  const notFoundPageHtml = get404PageTemplate(requestedPath);

  return new Response(notFoundPageHtml, {
    status: 404,
    headers: { "Content-Type": "text/html;charset=UTF-8" },
  });
}

/**
 * Handles generic errors with a custom error page
 * @param {Request} request - The incoming request
 * @param {number} statusCode - HTTP status code
 * @param {string} statusText - HTTP status text
 * @param {string} message - Error message
 * @param {string} details - Additional error details
 * @returns {Promise<Response>} Response containing the error page
 */
export async function handleError(request, statusCode = 500, statusText = 'Internal Server Error', message = '', details = '') {
  const errorPageHtml = getErrorPageTemplate(statusCode, statusText, message, details);

  return new Response(errorPageHtml, {
    status: statusCode,
    headers: { "Content-Type": "text/html;charset=UTF-8" },
  });
}
