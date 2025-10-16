/**
 * @typedef {Object} APIError
 * @property {string} code
 * @property {string} error
 * @property {string} message
 */

/**
 * Type guard for API responses
 * @param {unknown} response
 * @returns {boolean}
 */
export function isApiError(response) {
  return (
    response !== null &&
    typeof response === "object" &&
    typeof response.code === "string" &&
    typeof response.error === "string" &&
    typeof response.message === "string"
  );
}
