"use client";

import { useAccount } from "wagmi";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

export default function CreateLayout({ children }) {
 const { address } = useAccount();

 if (!address) {
  return (
   <main className="min-h-screen bg-gradient-to-b from-background to-muted/20 py-12">
    <div className="container mx-auto px-4 max-w-4xl">
     <Card>
      <CardContent className="pt-12 pb-12 text-center">
       <p className="text-muted-foreground text-lg">
        Connect your wallet to create your survey.
       </p>
      </CardContent>
     </Card>
    </div>
   </main>
  );
 }

 return (
  <main className="min-h-screen bg-gradient-to-b from-background to-muted/20 py-12">
   <div className="container mx-auto px-4 max-w-3xl">
    <motion.div
     initial={{ opacity: 0, y: 20 }}
     animate={{ opacity: 1, y: 0 }}
     transition={{ duration: 0.5 }}
    >
     {children}
    </motion.div>
   </div>
  </main>
 );
}
