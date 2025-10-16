"use client";

import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import {
 getSurveysByCreator,
 getSurveysByResponder,
 getAllSurveys,
} from "@/lib/survey-contract";
import { motion } from "framer-motion";
import { Coins, TrendingUp, Users } from "lucide-react";
import DashboardTitle from "@/components/dashboard/dashboard-title";
import DashboardStatsCard from "@/components/dashboard/dashboard-stats-card";
import DashboardTabs from "@/components/dashboard/dashboard-tabs";

export default function DashboardPage() {
 const { address } = useAccount();
 const [createdSurveys, setCreatedSurveys] = useState([]);
 const [answeredSurveys, setAnsweredSurveys] = useState([]);
 const [appliedSurveys, setAppliedSurveys] = useState([]);

 useEffect(() => {
  const loadDashboardData = () => {
   if (address) {
    const created = getSurveysByCreator(address);
    const answered = getSurveysByResponder(address);
    const allSurveys = getAllSurveys();
    const applied = allSurveys.filter((survey) =>
     survey.applicants.some(
      (a) => a.address.toLowerCase() === address.toLowerCase()
     )
    );
    setCreatedSurveys(created);
    setAnsweredSurveys(answered);
    setAppliedSurveys(applied);
   }
  };

  loadDashboardData();
  const interval = setInterval(loadDashboardData, 2000);
  return () => clearInterval(interval);
 }, [address]);

 const totalCreated = createdSurveys.length;
 const totalResponses = createdSurveys.reduce(
  (sum, survey) => sum + survey.responses.length,
  0
 );
 const totalRewardsDeposited = createdSurveys.reduce(
  (sum, survey) => sum + parseFloat(survey.reward),
  0
 );
 const totalEarned = answeredSurveys
  .filter((survey) => survey.finalized)
  .reduce((sum, survey) => {
   const rewardPerResponse =
    parseFloat(survey.reward) / survey.responses.length;
   return sum + rewardPerResponse;
  }, 0);

 const statsContent = [
  {
   title: "Surveys Created",
   data: totalCreated,
   icon: TrendingUp,
  },
  {
   title: "Total Respondents",
   data: totalResponses,
   icon: Users,
  },
  {
   title: "Rewards Deposited",
   data: totalRewardsDeposited.toFixed(3),
   icon: Coins,
  },
  {
   title: "Total Earned",
   data: totalEarned.toFixed(4),
   icon: Coins,
  },
 ];

 return (
  <>
   <div className="container mx-auto px-4 max-w-6xl">
    {/* dashboard title */}
    <DashboardTitle />

    {/* Stats Cards */}
    <motion.div
     initial={{ opacity: 0, y: 20 }}
     animate={{ opacity: 1, y: 0 }}
     transition={{ delay: 0.1, duration: 0.5 }}
     className="grid md:grid-cols-4 gap-4 mb-8"
    >
     {statsContent.map((stat) => (
      <DashboardStatsCard key={stat.title} stat={stat} />
     ))}
    </motion.div>

    {/* Tabs */}
    <DashboardTabs
     totalCreated={totalCreated}
     answeredSurveys={answeredSurveys}
     appliedSurveys={appliedSurveys}
     createdSurveys={createdSurveys}
    />
   </div>
  </>
 );
}
