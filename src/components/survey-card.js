"use client";

import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/status-badge";
import { Users, Coins, Calendar, Sparkles } from "lucide-react";
import Link from "next/link";

export function SurveyCard({ survey }) {
  const responseCount = survey.responses.length;
  const formattedDate = new Date(survey.createdAt).toLocaleDateString();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -8, scale: 1.02 }}
    >
      <Card className="h-full flex flex-col glow-card border-muted/50 dark:border-muted/20 bg-card/80 dark:bg-card/50 backdrop-blur-sm relative overflow-hidden group">
        {/* Animated gradient border effect on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 via-lime-400/20 to-lime-500/20 dark:from-emerald-500/30 dark:via-lime-400/30 dark:to-lime-500/30 blur-xl" />
        </div>

        <div className="relative z-10">
          <CardHeader>
            <div className="flex items-start justify-between gap-2">
              <CardTitle className="text-xl group-hover:bg-clip-text group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-emerald-600 group-hover:to-lime-500 dark:group-hover:from-emerald-400 dark:group-hover:to-lime-500 transition-all duration-300">
                {survey.title}
              </CardTitle>
              <StatusBadge survey={survey} />
            </div>
            <CardDescription className="line-clamp-2">
              {survey.description}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
            <div className="space-y-3">
              <motion.div
                className="flex items-center gap-2 text-sm"
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
              >
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-lime-500 flex items-center justify-center shadow-md">
                  <Coins className="h-4 w-4 text-white" />
                </div>
                <span className="font-semibold text-foreground">
                  {survey.reward} ETH
                </span>
                <span className="text-muted-foreground">reward</span>
              </motion.div>
              <motion.div
                className="flex items-center gap-2 text-sm text-muted-foreground"
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
              >
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-600 to-lime-600 flex items-center justify-center shadow-md">
                  <Users className="h-4 w-4 text-white" />
                </div>
                <span>
                  {responseCount}{" "}
                  {responseCount === 1 ? "response" : "responses"}
                </span>
              </motion.div>
              <motion.div
                className="flex items-center gap-2 text-sm text-muted-foreground"
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
              >
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-700 to-lime-700 flex items-center justify-center shadow-md">
                  <Calendar className="h-4 w-4 text-white" />
                </div>
                <span>{formattedDate}</span>
              </motion.div>
            </div>
          </CardContent>
          <CardFooter>
            <Link href={`/surveys/${survey.id}`} className="w-full">
              <Button className="w-full bg-gradient-to-r from-emerald-500 to-lime-500 hover:from-emerald-600 hover:to-lime-600 dark:from-emerald-500 dark:to-lime-500 dark:hover:from-emerald-600 dark:hover:to-lime-600 text-white border-0 shadow-md hover:shadow-lg transition-all duration-300">
                {survey.finalized ? "View Results" : "View & Respond"}
              </Button>
            </Link>
          </CardFooter>
        </div>
      </Card>
    </motion.div>
  );
}
