"use client";

import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  getSurveysByCreator,
  getSurveysByResponder,
  getAllSurveys,
} from "@/lib/survey-contract";
import { motion } from "framer-motion";
import { Coins, TrendingUp, Users } from "lucide-react";
import AnsweredSurveysTab from "@/components/dashboard/answered-surveys-tab";
import ApplicationsTab from "@/components/dashboard/applications-tab";
import CreatedSurveysTab from "@/components/dashboard/created-surveys-tab";

export default function DashboardPage() {
  const { address } = useAccount();
  const [createdSurveys, setCreatedSurveys] = useState([]);
  const [answeredSurveys, setAnsweredSurveys] = useState([]);
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const loadDashboardData = () => {
      if (address) {
        const created = getSurveysByCreator(address);
        const answered = getSurveysByResponder(address);
        const allSurveys = getAllSurveys();

        const userApplications = allSurveys
          .filter((survey) =>
            survey.applicants.some(
              (a) => a.address.toLowerCase() === address.toLowerCase()
            )
          )
          .map((survey) => ({
            survey,
            applicant: survey.applicants.find(
              (a) => a.address.toLowerCase() === address.toLowerCase()
            ),
          }));

        setCreatedSurveys(created);
        setAnsweredSurveys(answered);
        setApplications(userApplications);
      }
    };

    loadDashboardData();
    const interval = setInterval(loadDashboardData, 2000);
    return () => clearInterval(interval);
  }, [address]);

  if (!address) {
    return (
      <>
        <main className="min-h-screen pt-20 pb-12 px-4">
          <div className="container mx-auto max-w-4xl">
            <Card className="border-white/10 bg-gradient-to-br from-white/5 to-white/10">
              <CardContent className="pt-12 pb-12 text-center">
                <p className="text-gray-400 text-lg">
                  Connect your wallet to view your dashboard
                </p>
              </CardContent>
            </Card>
          </div>
        </main>
      </>
    );
  }

  const totalCreated = createdSurveys.length;
  const totalResponses = createdSurveys.reduce(
    (sum, survey) => sum + (survey.responses ? survey.responses.length : 0),
    0
  );
  const totalRewardsDeposited = createdSurveys.reduce(
    (sum, survey) => sum + parseFloat(survey.reward || 0),
    0
  );
  const totalEarned = answeredSurveys
    .filter((survey) => survey.finalized)
    .reduce((sum, survey) => {
      const responsesLen = survey.responses ? survey.responses.length : 0;
      const rewardPerResponse = responsesLen
        ? parseFloat(survey.reward || 0) / responsesLen
        : 0;
      return sum + rewardPerResponse;
    }, 0);

  return (
    <>
      <main className="min-h-screen pt-20 pb-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-emerald-400 to-lime-400 bg-clip-text text-transparent">
              Dashboard
            </h1>
            <p className="text-gray-400 text-lg">
              Track your created surveys and earned rewards
            </p>
          </motion.div>

          {/* Stats Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="grid md:grid-cols-4 gap-4 mb-8"
          >
            <Card className="border-white/10 bg-gradient-to-br from-white/5 to-white/10 hover:border-emerald-500/50 transition-colors">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400 mb-1">
                      Surveys Created
                    </p>
                    <p className="text-3xl font-bold">{totalCreated}</p>
                  </div>
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-emerald-500/20 to-lime-500/20 flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-emerald-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-white/10 bg-gradient-to-br from-white/5 to-white/10 hover:border-emerald-500/50 transition-colors">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400 mb-1">
                      Total Responses
                    </p>
                    <p className="text-3xl font-bold">{totalResponses}</p>
                  </div>
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-emerald-500/20 to-lime-500/20 flex items-center justify-center">
                    <Users className="h-6 w-6 text-emerald-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-white/10 bg-gradient-to-br from-white/5 to-white/10 hover:border-emerald-500/50 transition-colors">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400 mb-1">
                      Rewards Deposited
                    </p>
                    <p className="text-3xl font-bold">
                      {totalRewardsDeposited.toFixed(3)}
                    </p>
                    <p className="text-xs text-gray-400">ETH</p>
                  </div>
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-emerald-500/20 to-lime-500/20 flex items-center justify-center">
                    <Coins className="h-6 w-6 text-emerald-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-white/10 bg-gradient-to-br from-white/5 to-white/10 hover:border-emerald-500/50 transition-colors">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Total Earned</p>
                    <p className="text-3xl font-bold">
                      {totalEarned.toFixed(4)}
                    </p>
                    <p className="text-xs text-gray-400">ETH</p>
                  </div>
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-emerald-500/20 to-lime-500/20 flex items-center justify-center">
                    <Coins className="h-6 w-6 text-lime-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Tabs defaultValue="created" className="w-full">
              <TabsList className="w-full md:w-auto bg-white/5 border border-white/10">
                <TabsTrigger value="created" className="flex-1 md:flex-none">
                  Created ({totalCreated})
                </TabsTrigger>
                <TabsTrigger value="answered" className="flex-1 md:flex-none">
                  Answered ({answeredSurveys.length})
                </TabsTrigger>
                <TabsTrigger
                  value="applications"
                  className="flex-1 md:flex-none"
                >
                  Applications ({applications.length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="created" className="mt-6">
                <CreatedSurveysTab surveys={createdSurveys} />
              </TabsContent>

              <TabsContent value="answered" className="mt-6">
                <AnsweredSurveysTab
                  surveys={answeredSurveys}
                  userAddress={address}
                />
              </TabsContent>

              <TabsContent value="applications" className="mt-6">
                <ApplicationsTab applications={applications} />
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </main>
    </>
  );
}
