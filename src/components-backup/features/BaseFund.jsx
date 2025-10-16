"use client";

import {
  FundCard,
  FundCardHeader,
  FundCardAmountInput,
  FundCardAmountInputTypeSwitch,
  FundCardPresetAmountInputList,
  FundCardPaymentMethodDropdown,
  FundCardSubmitButton,
  FundCardProvider,
  useFundContext,
} from "@coinbase/onchainkit/fund";
import { Button } from "../ui/button";
import { generateSessionToken } from "@/utils/sessionTokenApi";
import { useEffect } from "react";

import { useState } from "react";
import { generateOnrampURL } from "@/utils/rampUtils";

export default function BaseFund({ address }) {
  return (
    <>
      <FundCard
        assetSymbol={"ETH"}
        country={"US"}
        currency={"USD"}
        headerText={"Purchase Ethereum"}
        presetAmountInputs={[5, 10, 20, 50, 100]}
      >
        <FundContent address={address} />
      </FundCard>
    </>
  );
}

function FundContent({ address }) {
  const [isGeneratingToken, setIsGeneratingToken] = useState(false);

  const {
    asset,
    currency,
    selectedPaymentMethod,
    setSelectedPaymentMethod,
    fundAmountFiat,
    setFundAmountFiat,
    fundAmountCrypto,
    setFundAmountCrypto,
    selectedInputType,
    setSelectedInputType,
    exchangeRate,
    setExchangeRate,
    exchangeRateLoading,
    setExchangeRateLoading,
    submitButtonState,
    setSubmitButtonState,
    paymentMethods,
    setPaymentMethods,
    paymentMethodsLoading,
    setPaymentMethodsLoading,
    headerText,
    buttonText,
    country,
    subdivision,
    lifecycleStatus,
    updateLifecycleStatus,
    presetAmountInputs,
  } = useFundContext();

  console.log(asset);

  // Generate session token
  const generateSessionToken = async () => {
    try {
      setIsGeneratingToken(true);

      // Prepare addresses array based on selected network
      const addresses = [
        {
          address: address || "0x0000000000000000000000000000000000000000",
          blockchains: ["base"],
        },
      ];

      // Make request to our API endpoint
      const response = await fetch("/api/session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          addresses,
          assets: [asset],
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to generate session token");
      }

      const data = await response.json();

      // Check if this is a mock token
      if (data.mock) {
        console.warn(
          "Using mock session token. In production, configure CDP API credentials."
        );
        // For demo purposes, we'll skip using the session token
        return null;
      }

      return data.token;
    } catch (error) {
      console.error("Error generating session token:", error);
      alert(
        `Session token generation failed. The transaction will proceed with standard authentication.\n\nFor production use, ensure your CDP API credentials are properly configured.`
      );
      return null;
    } finally {
      setIsGeneratingToken(false);
    }
  };

  // Handle direct onramp
  const handleOnramp = async () => {
    let sessionToken;

    // Generate session token if secure init is enabled
    const token = await generateSessionToken();
    if (!token) return; // Exit if token generation failed
    sessionToken = token;

    // Note: This is a demo app - actual payments require ownership of assets and sufficient funds
    const url = generateOnrampURL({
      asset: asset,
      amount: fundAmountFiat,
      //   network: selectedNetwork,
      paymentMethod: selectedPaymentMethod,
      paymentCurrency: currency,
      address: address || "0x0000000000000000000000000000000000000000",
      redirectUrl: `${window.location.origin}/onramp`,
      enableGuestCheckout: true,
      sessionToken,
    });

    window.open(url, "_blank");
  };

  return (
    <>
      <FundCardAmountInput className="relative [&_input]:w-full [&>div>div>div]:w-full" />
      <FundCardAmountInputTypeSwitch />
      <FundCardPresetAmountInputList />
      <FundCardPaymentMethodDropdown />
      <Button
        className={`w-full`}
        type={`button`}
        onClick={handleOnramp}
        disabled={!fundAmountFiat}
      >
        Buy
      </Button>
    </>
  );
}
