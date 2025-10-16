import { Coins, Shield, Sparkles, Users, Zap } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { motion } from "framer-motion";

export default function Hero() {
 return (
  <>
   <section className="container mx-auto px-4 pt-20 pb-32 relative z-10">
    <div className="max-w-4xl mx-auto text-center">
     <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
     >
      <motion.div
       className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 dark:bg-emerald-500/20 border border-emerald-500/20 dark:border-emerald-500/30 mb-6"
       initial={{ opacity: 0, scale: 0.9 }}
       animate={{ opacity: 1, scale: 1 }}
       transition={{ delay: 0.2 }}
      >
       <Sparkles className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
       <span className="text-sm font-medium bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-lime-600 dark:from-emerald-400 dark:to-lime-400">
        Powered by Base Blockchain
       </span>
      </motion.div>

      <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
       <span className="block mb-2">Decentralized Surveys</span>
       <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 via-emerald-500 to-lime-500 dark:from-emerald-400 dark:via-lime-500 dark:to-lime-400">
        Where surveys meet crypto earn ETH for every opinion
       </span>
      </h1>
      <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
       Create surveys, reward participants with ETH, and collect valuable
       insights with complete transparency on the blockchain.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
       <Link href="/create">
        <Button
         size="lg"
         className="text-lg px-8 bg-gradient-to-r from-emerald-500 to-lime-500 hover:from-emerald-600 hover:to-lime-600 dark:from-emerald-500 dark:to-lime-500 dark:hover:from-emerald-600 dark:hover:to-lime-600 text-white shadow-lg hover:shadow-xl hover:shadow-emerald-500/25 transition-all duration-300"
        >
         Create Survey
        </Button>
       </Link>
       <Link href="/surveys">
        <Button
         size="lg"
         variant="outline"
         className="text-lg px-8 border-2 hover:bg-accent/50 transition-all duration-300"
        >
         Browse Surveys
        </Button>
       </Link>
      </div>
     </motion.div>
    </div>
   </section>
  </>
 );
}
