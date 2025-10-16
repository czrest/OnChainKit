import { Coins, Shield, Sparkles, Users, Zap } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { motion } from "framer-motion";

export default function CallToActionCard() {
  return (
    <>
      {/* CTA Section */}
      <section className="container mx-auto px-4 pb-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <Card className="max-w-3xl mx-auto relative overflow-hidden border-2 border-emerald-500/20 dark:border-emerald-500/30">
            <div className="absolute inset-0" />
            <CardContent className="pt-12 pb-12 text-center relative z-10">
              <motion.div
                animate={{
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 3,
                }}
                className="inline-block mb-4"
              >
                <Sparkles className="h-12 w-12 text-emerald-600 dark:text-emerald-400" />
              </motion.div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-muted-foreground mb-6 text-lg max-w-xl mx-auto">
                Connect your wallet and start creating surveys or earning
                rewards today. Join the decentralized survey revolution!
              </p>
              <Link href="/create">
                <Button
                  size="lg"
                  className="text-lg px-8 bg-gradient-to-r from-emerald-500 to-lime-500 hover:from-emerald-600 hover:to-lime-600 dark:from-emerald-500 dark:to-lime-500 dark:hover:from-emerald-600 dark:hover:to-lime-600 text-white shadow-lg hover:shadow-xl hover:shadow-emerald-500/25 transition-all duration-300"
                >
                  Launch Your First Survey
                </Button>
              </Link>
            </CardContent>
          </Card>
        </motion.div>
      </section>
    </>
  );
}
