/**
 * Legacy shared styles module - DEPRECATED
 * 
 * This module is maintained for backwards compatibility only.
 * New code should use the assets/styles.js module instead.
 * 
 * @deprecated Use ../assets/styles.js instead
 */

import { baseStyles } from "../assets/styles.js";
import { getPageTemplate as getBasePageTemplate } from "../templates/base.js";

/**
 * @deprecated Use getStyles() from ../assets/styles.js instead
 */
export const getSharedCSS = () => {
  console.warn("getSharedCSS is deprecated. Use getStyles() from ../assets/styles.js instead.");
  return baseStyles;
};

/**
 * @deprecated Use getPageTemplate() from ../templates/base.js instead
 */
export const getPageTemplate = (title, content) => {
  console.warn("getPageTemplate from shared-styles.js is deprecated. Use getPageTemplate() from ../templates/base.js instead.");
  return getBasePageTemplate(title, content);
};
