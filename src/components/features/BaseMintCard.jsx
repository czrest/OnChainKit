"use client";

import { useAccount, useWriteContract } from "wagmi";
import { parseAbi } from "viem";
import { useState } from "react";

const CONTRACT_ADDRESS = "0x151FC2d543998E5D9D9BD9Dde9cDB07250ed4c28";

const ABI = parseAbi([
  "function safeMint(address to, string uri) public returns (uint256)",
]);

export default function BaseMintCard() {
  const { writeContract, isPending, data, error } = useWriteContract();
  const { address, isConnected } = useAccount();

  const [uri, setUri] = useState("");
  const [recipient, setRecipient] = useState("");

  const handleMint = async () => {
    try {
      writeContract({
        address: CONTRACT_ADDRESS,
        abi: ABI,
        functionName: "safeMint",
        args: [
          address,
          "ipfs://bafybeihb2wavmjs3ub7hqi6nkqai6pr7eh6ym6yoqmee2gb7u22lt4fo6q/1.json",
        ],
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {isConnected && (
        <div className="p-4 rounded-xl border shadow-md space-y-4">
          <h2 className="text-lg font-semibold">Mint Portfolio NFT</h2>

          <button
            onClick={handleMint}
            disabled={isPending}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {isPending ? "Minting..." : "Mint NFT"}
          </button>
          {error && (
            <p className="text-sm text-red-600">❌ Error: {error.message}</p>
          )}
        </div>
      )}
    </>
  );
}
