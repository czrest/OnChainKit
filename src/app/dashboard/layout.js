"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useAccount } from "wagmi";

export default function DashboardLayout({ children }) {
 const { address } = useAccount();

 if (!address) {
  return (
   <main className="min-h-screen bg-gradient-to-b from-background to-muted/20 py-12">
    <div className="container mx-auto px-4 max-w-4xl">
     <Card>
      <CardContent className="pt-12 pb-12 text-center">
       <p className="text-muted-foreground text-lg">
        Connect your wallet to view your dashboard.
       </p>
      </CardContent>
     </Card>
    </div>
   </main>
  );
 }

 return (
  <main className="min-h-screen bg-gradient-to-b from-background to-muted/20 py-12">
   {children}
  </main>
 );
}
