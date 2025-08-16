/**
 * Base HTML template system for Chrome Web Store Mirror
 * 
 * Provides a consistent base template and utilities for generating
 * HTML pages with proper structure and styling.
 */

import { getStyles } from "../assets/styles.js";

/**
 * Generates a complete HTML page with consistent structure
 * @param {string} title - Page title
 * @param {string} content - Main page content (HTML)
 * @param {Object} options - Additional options
 * @param {string} options.pageType - Type of page for specific styles
 * @param {string} options.additionalCSS - Additional CSS to include
 * @param {string} options.scripts - JavaScript code to include
 * @returns {string} Complete HTML page
 */
export function getPageTemplate(title, content, options = {}) {
  const {
    pageType = 'base',
    additionalCSS = '',
    scripts = ''
  } = options;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <title>${title}</title>
  <style>
    ${getStyles(pageType)}
    ${additionalCSS}
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Chrome Web Store Mirror</h1>
      <p class="subtitle">Browse and download extensions and themes safely</p>
    </div>
    ${content}
  </div>
  ${scripts ? `<script>${scripts}</script>` : ''}
</body>
</html>`;
}

/**
 * Generates a simple content wrapper for pages that don't need the full header
 * @param {string} content - Content to wrap
 * @param {string} additionalCSS - Additional CSS
 * @returns {string} Wrapped content
 */
export function getContentWrapper(content, additionalCSS = '') {
  return `
    <div class="content-wrapper">
      ${content}
    </div>
    ${additionalCSS ? `<style>${additionalCSS}</style>` : ''}
  `;
}

/**
 * Generates common HTML elements with consistent styling
 */
export const htmlElements = {
  /**
   * Creates a styled button element
   * @param {string} text - Button text
   * @param {string} href - Button link
   * @param {string} type - Button type (primary, secondary)
   * @param {Object} attributes - Additional attributes
   * @returns {string} Button HTML
   */
  button(text, href = '#', type = 'primary', attributes = {}) {
    const attrs = Object.entries(attributes)
      .map(([key, value]) => `${key}="${value}"`)
      .join(' ');
    
    return `<a href="${href}" class="btn btn-${type}" ${attrs}>${text}</a>`;
  },

  /**
   * Creates a card container
   * @param {string} content - Card content
   * @param {Object} attributes - Additional attributes
   * @returns {string} Card HTML
   */
  card(content, attributes = {}) {
    const attrs = Object.entries(attributes)
      .map(([key, value]) => `${key}="${value}"`)
      .join(' ');
    
    return `<div class="card" ${attrs}>${content}</div>`;
  },

  /**
   * Creates an icon element
   * @param {string} icon - Icon character or emoji
   * @param {string} className - Additional CSS classes
   * @returns {string} Icon HTML
   */
  icon(icon, className = '') {
    return `<span class="icon ${className}">${icon}</span>`;
  },

  /**
   * Creates a loading spinner
   * @param {string} text - Loading text
   * @returns {string} Loading spinner HTML
   */
  loading(text = 'Loading...') {
    return `
      <div class="loading">
        <div class="loading-spinner"></div>
        ${text}
      </div>
    `;
  }
};
