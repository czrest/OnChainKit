"use client";
import { useEffect } from "react";

import { PageTransition } from "@/components/page-transition";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Navbar } from "@/components/navbar";
import Link from "next/link";
import { motion } from "framer-motion";
import { Coins, Users, Shield, Zap, Sparkles } from "lucide-react";
import { sdk } from "@farcaster/miniapp-sdk";

export default function HomePage() {
  useEffect(() => {
    const initializeFarcaster = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 100));
        if (document.readyState !== "complete") {
          await new Promise((resolve) => {
            if (document.readyState === "complete") {
              resolve(void 0);
            } else {
              window.addEventListener("load", () => resolve(void 0), {
                once: true,
              });
            }
          });
        }

        await sdk.actions.ready();
        console.log(
          "Farcaster SDK initialized successfully - app fully loaded"
        );
      } catch (error) {
        console.error("Failed to initialize Farcaster SDK:", error);
        setTimeout(async () => {
          try {
            await sdk.actions.ready();
            console.log("Farcaster SDK initialized on retry");
          } catch (retryError) {
            console.error("Farcaster SDK retry failed:", retryError);
          }
        }, 1000);
      }
    };
    initializeFarcaster();
  }, []);
  const features = [
    {
      icon: Coins,
      title: "ETH Rewards",
      description:
        "Deposit ETH when creating surveys to reward respondents fairly",
      color: "from-emerald-500 to-lime-500",
    },
    {
      icon: Users,
      title: "Decentralized",
      description: "Built on Base blockchain for transparency and trust",
      color: "from-emerald-600 to-lime-600",
    },
    {
      icon: Shield,
      title: "Secure & Transparent",
      description: "Smart contracts ensure fair reward distribution",
      color: "from-emerald-500 to-lime-500",
    },
    {
      icon: Zap,
      title: "Instant Payouts",
      description: "Automatic reward splitting when surveys are finalized",
      color: "from-emerald-600 to-lime-600",
    },
  ];

  return (
    <>
      <Navbar />
      <PageTransition>
        <main className="min-h-screen bg-gradient-to-br from-background via-background to-emerald-500/5 dark:to-emerald-500/10 relative overflow-hidden">
          {/* Animated Background Orbs */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              className="absolute top-20 left-10 w-72 h-72 bg-emerald-500/20 dark:bg-emerald-500/30 rounded-full blur-3xl"
              animate={{
                x: [0, 100, 0],
                y: [0, 50, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute top-40 right-10 w-96 h-96 bg-lime-500/20 dark:bg-lime-500/30 rounded-full blur-3xl"
              animate={{
                x: [0, -80, 0],
                y: [0, 100, 0],
                scale: [1, 1.3, 1],
              }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute bottom-20 left-1/2 w-80 h-80 bg-emerald-400/20 dark:bg-emerald-400/30 rounded-full blur-3xl"
              animate={{
                x: [0, -100, 0],
                y: [0, -50, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 18,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>

          {/* Hero Section */}
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
                    Earn While You Share
                  </span>
                </h1>
                <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
                  Create surveys, reward participants with ETH, and collect
                  valuable insights with complete transparency on the
                  blockchain.
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

          {/* Features Section */}
          <section className="container mx-auto px-4 pb-20 relative z-10">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
                Why SurveyChain?
              </h2>
              <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
                Experience the future of surveys with blockchain-powered rewards
                and transparency
              </p>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {features.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <motion.div
                      key={feature.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index, duration: 0.5 }}
                    >
                      <Card className="h-full glow-card hover:scale-105 transition-all duration-300 border-muted/50 dark:border-muted/20 bg-card/80 dark:bg-card/50 backdrop-blur-sm">
                        <CardContent className="pt-6">
                          <div className="mb-4">
                            <motion.div
                              className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center shadow-lg`}
                              whileHover={{ rotate: 360, scale: 1.1 }}
                              transition={{ duration: 0.6 }}
                            >
                              <Icon className="h-7 w-7 text-white" />
                            </motion.div>
                          </div>
                          <h3 className="font-bold text-lg mb-2">
                            {feature.title}
                          </h3>
                          <p className="text-muted-foreground text-sm leading-relaxed">
                            {feature.description}
                          </p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </section>

          {/* CTA Section */}
          <section className="container mx-auto px-4 pb-20 relative z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <Card className="max-w-3xl mx-auto relative overflow-hidden border-2 border-emerald-500/20 dark:border-emerald-500/30">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-lime-400/10 to-lime-500/10 dark:from-emerald-500/20 dark:via-lime-400/20 dark:to-lime-500/20" />
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
        </main>
      </PageTransition>
    </>
  );
}
