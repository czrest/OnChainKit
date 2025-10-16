import { SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Avatar, Name, EthBalance } from "@coinbase/onchainkit/identity";

import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { useEffect, useState } from "react";
import { useAccount, useBalance } from "wagmi";
import DynamicIcons from "../ui/DynamicIcons";
import MoonBuy from "../features/MoonBuy";
import BaseFund from "../features/BaseFund";
import BaseDeposit from "../features/BaseDeposit";
import BaseSwap from "../features/BaseSwap";
import CDPFund from "../features/CDPFund";

const actionButtons = [
  {
    text: "Buy",
    icon: "Plus",
    title: "Buy ETH",
  },
  {
    text: "Swap",
    icon: "ArrowDownUp",
    title: "Swap",
  },
  {
    text: "Deposit",
    icon: "ScanQrCode",
    title: "Deposit",
  },
];

const actionComponents = {
  Send: () => <div>Send form here</div>,
  Swap: ({ address }) => <BaseSwap address={address} />,
  Deposit: ({ address }) => <BaseDeposit address={address} />,
  Buy: CDPFund,
};

export default function SheetActions() {
  const [action, setAction] = useState();
  const { address } = useAccount();

  const ActionComponent = action ? actionComponents[action.text] : null;

  return (
    <>
      <SheetContent className={`flex flex-col gap-5`}>
        <SheetTitle className={`font-bold flex items-center gap-3`}>
          {action ? (
            <span className="text-bold text-2xl flex items-center gap-3 leading-none">
              <DynamicIcons
                className={`cursor-pointer aspect-square`}
                iconName={"ChevronLeft"}
                size={24}
                onClick={() => setAction()}
              />
              {action.title}
            </span>
          ) : (
            <ProfileIdentity address={address} />
          )}
        </SheetTitle>
        <Separator />

        {action ? (
          <ActionComponent address={address} />
        ) : (
          <WalletActions address={address} changeAction={setAction} />
        )}
      </SheetContent>
    </>
  );
}

function ProfileIdentity({ address }) {
  return (
    <>
      <Avatar address={address} />
      <Name address={address} />
    </>
  );
}

function WalletActions({ address, changeAction }) {
  const { data } = useBalance({ address, watch: true });
  const [usdPrice, setUsdPrice] = useState(null);

  useEffect(() => {
    async function fetchPrice() {
      const res = await fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
      );
      const json = await res.json();
      setUsdPrice(json.ethereum.usd);
    }
    fetchPrice();
  }, []);

  const eth = parseFloat(data?.formatted);
  const usd = usdPrice && eth ? (eth * usdPrice).toFixed(2) : 0;
  return (
    <>
      <SheetHeader>
        <h1 className="font-bold text-black flex flex-col">
          <EthBalance address={address} className={`text-black text-3xl`} />
          <span className="text-md text-black/80">$ {usd}</span>
        </h1>
      </SheetHeader>
      <div className="grid grid-cols-3 gap-3">
        {actionButtons.map((action) => (
          <Button
            key={action.text + action.icon}
            className={`flex flex-col h-fit items-start p-3 cursor-pointer`}
            onClick={() => changeAction(action)}
          >
            <DynamicIcons iconName={action.icon} size={24} /> {action.text}
          </Button>
        ))}
      </div>
    </>
  );
}
