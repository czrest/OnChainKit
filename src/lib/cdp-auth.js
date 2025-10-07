import { generateJwt } from "@coinbase/cdp-sdk/auth";

export function getCDPCredentials() {
  const apiKeyId = process.env.CDP_API_KEY_ID;
  const apiKeySecret = process.env.CDP_API_KEY_SECRET;

  if (!apiKeyId || !apiKeySecret) {
    throw new Error("CDP API credentials not configured");
  }

  return { apiKeyId, apiKeySecret };
}

export async function generateCDPJWT(config) {
  const { apiKeyId, apiKeySecret } = getCDPCredentials();

  return generateJwt({
    apiKeyId,
    apiKeySecret,
    requestMethod: config.requestMethod,
    requestHost: config.requestHost,
    requestPath: config.requestPath,
  });
}

export const ONRAMP_API_BASE_URL = "https://api.developer.coinbase.com";