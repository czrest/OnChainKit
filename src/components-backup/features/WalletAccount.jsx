"use client";

import {
  ConnectWallet,
  Wallet,
  WalletDropdown,
  WalletDropdownBasename,
  WalletDropdownFundLink,
  WalletDropdownLink,
  WalletAdvancedAddressDetails,
  WalletAdvancedTokenHoldings,
  WalletAdvancedTransactionActions,
  WalletAdvancedWalletActions,
  WalletDropdownDisconnect,
} from "@coinbase/onchainkit/wallet";
import {
  Address,
  Avatar,
  Name,
  Identity,
  EthBalance,
} from "@coinbase/onchainkit/identity";

export default function WalletAccount() {
  return (
    <>
      <div>
        <Wallet>
          <ConnectWallet className={`h-9 px-4 py-2 rounded-md flex items-center justify-center`}>
            <Name />
          </ConnectWallet>
          <WalletDropdown>
            <WalletAdvancedWalletActions />
            <Identity hasCopyAddressOnClick>
              <Avatar />
              <Name />
              <Address />
              <EthBalance />
            </Identity>
            <WalletDropdownLink
              target="_blank"
              href="https://keys.coinbase.com"
              icon="wallet"
              className={"relative"}
            >
              Wallet
            </WalletDropdownLink>
            <WalletDropdownDisconnect />
          </WalletDropdown>
        </Wallet>
      </div>
    </>
  );
}
