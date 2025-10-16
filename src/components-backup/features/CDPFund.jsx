"use client";

import { FundModal, Fund } from "@coinbase/cdp-react";
import { useEvmAddress } from "@coinbase/cdp-hooks";
import { useCallback } from "react";
import { createBuyQuote, getBuyOptions } from "@/lib/onramp-api";
import { useAccount } from "wagmi";
import CDPProvider from "@/app/cdp";

export default function CDPFund() {
  const { address, isConnected } = useAccount();

  // Get the user's location (i.e. from IP geolocation)
  const userCountry = "US";

  // If user is in the US, the state is also required
  const userSubdivision = userCountry === "US" ? "CA" : undefined;

  // Call your buy quote endpoint
  const fetchBuyQuote = useCallback(async (params) => {
    return createBuyQuote(params);
  }, []);

  // Call your buy options endpoint
  const fetchBuyOptions = useCallback(async (params) => {
    return getBuyOptions(params);
  }, []);

  return (
    <Fund
      country={userCountry}
      subdivision={userSubdivision}
      cryptoCurrency="eth"
      fiatCurrency="usd"
      fetchBuyQuote={fetchBuyQuote}
      fetchBuyOptions={fetchBuyOptions}
      network="base"
      presetAmountInputs={[10, 25, 50]}
      destinationAddress={address}
      className={`bg-white border rounded-lg shadow-xl `}
    />
  );
}
