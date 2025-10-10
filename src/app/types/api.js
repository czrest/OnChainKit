// Base API error type for OnchainKit responses
// Note: In JavaScript, we use JSDoc for type annotations

export function isApiError(response) {
  return (
    response !== null && typeof response === "object" && "error" in response
  );
}
