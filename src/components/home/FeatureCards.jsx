import { Coins, Shield, Sparkles, Users, Zap } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { motion } from "framer-motion";

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

export default function FeatureCards() {
  return (
    <>
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
            Experience the future of surveys with blockchain-powered rewards and
            transparency
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
                  <Card className="h-full transition-all duration-300 bg-card/80 dark:bg-card/50 backdrop-blur-sm border-emerald-500/20 dark:border-emerald-500/30">
                    <CardContent className="pt-6">
                      <div className="mb-4">
                        <motion.div
                          className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center shadow-lg`}
                          whileHover={{ rotate: 360, scale: 1.2 }}
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
    </>
  );
}
