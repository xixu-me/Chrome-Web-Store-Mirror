/**
 * Client-side JavaScript utilities for Chrome Web Store Mirror
 * 
 * This module contains all client-side JavaScript functionality,
 * providing interactive features for the mirror application.
 */

/**
 * Search functionality for the search page
 * @param {Array} items - Array of extension items to search through
 * @param {string} initialQuery - Initial search query from URL
 * @param {number} maxResults - Maximum number of results to display
 * @returns {string} JavaScript code for search functionality
 */
export function getSearchScript(items, initialQuery = '', maxResults = 100) {
  return `
    const items = ${JSON.stringify(items)};
    const searchInput = document.getElementById('search-input');
    const resultsDiv = document.getElementById('results');
    
    // Get initial query from URL
    const initialQuery = '${initialQuery}';
    if (initialQuery) {
      searchInput.value = initialQuery;
      performSearch(initialQuery);
    }

    /**
     * Performs search and updates the results display
     * @param {string} query - Search query
     */
    function performSearch(query) {
      const lowerQuery = query.toLowerCase();
      if (lowerQuery.length < 1) {
        resultsDiv.innerHTML = '';
        return;
      }

      // Show loading state
      resultsDiv.innerHTML = '<div class="loading"><div class="loading-spinner"></div>Searching...</div>';
      
      // Simulate brief delay for better UX
      setTimeout(() => {
        const filteredItems = items.filter(item => 
          item.name.toLowerCase().includes(lowerQuery) || 
          item.id.toLowerCase() === lowerQuery
        );
        
        if (filteredItems.length === 0) {
          resultsDiv.innerHTML = \`
            <div class="empty-state">
              <div class="empty-state-icon">📦</div>
              <p>No extensions or themes found matching "\${query}"</p>
            </div>
          \`;
          return;
        }

        let html = '';
        filteredItems.slice(0, ${maxResults}).forEach((item, index) => {
          html += \`
            <div class="item" style="--index: \${index}" onclick="window.open('/detail/\${item.id}', '_blank')">
              <a href="/detail/\${item.id}" target="_blank">\${item.name}</a>
              <div class="id">\${item.id}</div>
            </div>
          \`;
        });
        resultsDiv.innerHTML = html;
        
        // Trigger animation
        resultsDiv.style.opacity = '0';
        setTimeout(() => {
          resultsDiv.style.opacity = '1';
        }, 10);
      }, 150);
    }

    // Event listeners for search functionality
    searchInput.addEventListener('input', () => {
      const query = searchInput.value;
      
      // Update URL without page reload
      const currentPath = window.location.pathname;
      let newUrl;
      
      if (query) {
        // If there's a query, use /search/{query}
        newUrl = \`/search/\${encodeURIComponent(query)}\`;
      } else {
        // If no query, go back to home page
        newUrl = '/';
      }
      
      window.history.pushState({}, '', newUrl);
      performSearch(query);
    });

    searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        const query = searchInput.value;
        if (query) {
          window.location.href = \`/search/\${encodeURIComponent(query)}\`;
        } else {
          window.location.href = '/';
        }
      }
    });
  `;
}

/**
 * Generic utility functions that can be used across different pages
 * @returns {string} JavaScript code for utility functions
 */
export function getUtilityScript() {
  return `
    /**
     * Debounce function to limit the rate of function execution
     * @param {Function} func - Function to debounce
     * @param {number} wait - Wait time in milliseconds
     * @param {boolean} immediate - Execute immediately on first call
     * @returns {Function} Debounced function
     */
    function debounce(func, wait, immediate) {
      let timeout;
      return function executedFunction(...args) {
        const later = () => {
          timeout = null;
          if (!immediate) func(...args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func(...args);
      };
    }

    /**
     * Throttle function to limit the rate of function execution
     * @param {Function} func - Function to throttle
     * @param {number} limit - Time limit in milliseconds
     * @returns {Function} Throttled function
     */
    function throttle(func, limit) {
      let inThrottle;
      return function(...args) {
        if (!inThrottle) {
          func.apply(this, args);
          inThrottle = true;
          setTimeout(() => inThrottle = false, limit);
        }
      };
    }

    /**
     * Smooth scroll to element
     * @param {string} elementId - ID of element to scroll to
     */
    function smoothScrollTo(elementId) {
      const element = document.getElementById(elementId);
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }

    /**
     * Copy text to clipboard
     * @param {string} text - Text to copy
     * @returns {Promise<boolean>} Success status
     */
    async function copyToClipboard(text) {
      try {
        await navigator.clipboard.writeText(text);
        return true;
      } catch (err) {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        try {
          document.execCommand('copy');
          return true;
        } catch (fallbackErr) {
          return false;
        } finally {
          document.body.removeChild(textArea);
        }
      }
    }
  `;
}
