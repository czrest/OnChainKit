import dynamic from "next/dynamic";

const MoonPayBuyWidget = dynamic(
  () => import("@moonpay/moonpay-react").then((mod) => mod.MoonPayBuyWidget),
  { ssr: false }
);

export default function MoonBuy() {
  return (
    <>
      <MoonPayBuyWidget
        variant="embedded"
        baseCurrencyCode="usd"
        baseCurrencyAmount="100"
        defaultCurrencyCode="eth"
        onLogin={async () => console.log("Customer logged in!")}
        visible
        style={{
          margin: 0,
          width: "100%",
          height: "100%",
        }}
      />
    </>
  );
}
