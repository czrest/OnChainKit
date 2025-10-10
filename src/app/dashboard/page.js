"use client";

import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { PageTransition } from "@/components/page-transition";
import { Navbar } from "@/components/navbar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SurveyCard } from "@/components/survey-card";
import { Button } from "@/components/ui/button";
import {
  getSurveysByCreator,
  getSurveysByResponder,
  getAllSurveys,
} from "@/lib/survey-contract";
import { motion } from "framer-motion";
import { Coins, TrendingUp, Users, Clock } from "lucide-react";
import Link from "next/link";

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

  if (!address) {
    return (
      <>
        <Navbar />
        <PageTransition>
          <main className="min-h-screen bg-gradient-to-b from-background to-muted/20 py-12">
            <div className="container mx-auto px-4 max-w-4xl">
              <Card>
                <CardContent className="pt-12 pb-12 text-center">
                  <p className="text-muted-foreground text-lg">
                    Connect your wallet to view your dashboard
                  </p>
                </CardContent>
              </Card>
            </div>
          </main>
        </PageTransition>
      </>
    );
  }

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

  return (
    <>
      <Navbar />
      <PageTransition>
        <main className="min-h-screen bg-gradient-to-b from-background to-muted/20 py-12">
          <div className="container mx-auto px-4 max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
              <p className="text-muted-foreground text-lg">
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
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">
                        Surveys Created
                      </p>
                      <p className="text-3xl font-bold">{totalCreated}</p>
                    </div>
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <TrendingUp className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">
                        Total Responses
                      </p>
                      <p className="text-3xl font-bold">{totalResponses}</p>
                    </div>
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">
                        Rewards Deposited
                      </p>
                      <p className="text-3xl font-bold">
                        {totalRewardsDeposited.toFixed(3)}
                      </p>
                      <p className="text-xs text-muted-foreground">ETH</p>
                    </div>
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Coins className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">
                        Total Earned
                      </p>
                      <p className="text-3xl font-bold">
                        {totalEarned.toFixed(4)}
                      </p>
                      <p className="text-xs text-muted-foreground">ETH</p>
                    </div>
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Coins className="h-6 w-6 text-primary" />
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
                <TabsList className="w-full md:w-auto">
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
                    Applications ({appliedSurveys.length})
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="created" className="mt-6">
                  {createdSurveys.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {createdSurveys.map((survey, index) => (
                        <motion.div
                          key={survey.id}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.05, duration: 0.3 }}
                        >
                          <div className="relative">
                            <SurveyCard survey={survey} />
                            {survey.respondentType === "targeted" && (
                              <Link href={`/dashboard/surveys/${survey.id}`}>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="absolute top-16 right-4 z-20"
                                >
                                  <Users className="h-3 w-3 mr-1" />
                                  Manage ({survey.applicants.length})
                                </Button>
                              </Link>
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <Card>
                      <CardContent className="pt-12 pb-12 text-center">
                        <p className="text-muted-foreground">
                          You haven&apos;t created any surveys yet
                        </p>
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>

                <TabsContent value="answered" className="mt-6">
                  {answeredSurveys.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {answeredSurveys.map((survey, index) => (
                        <motion.div
                          key={survey.id}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.05, duration: 0.3 }}
                        >
                          <div className="relative">
                            <SurveyCard survey={survey} />
                            {survey.finalized && (
                              <Badge
                                variant="default"
                                className="absolute top-4 right-4"
                              >
                                Reward Received
                              </Badge>
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <Card>
                      <CardContent className="pt-12 pb-12 text-center">
                        <p className="text-muted-foreground">
                          You haven&apos;t answered any surveys yet
                        </p>
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>

                <TabsContent value="applications" className="mt-6">
                  {appliedSurveys.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {appliedSurveys.map((survey, index) => {
                        const applicant = survey.applicants.find(
                          (a) =>
                            a.address.toLowerCase() === address?.toLowerCase()
                        );
                        return (
                          <motion.div
                            key={survey.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.05, duration: 0.3 }}
                          >
                            <div className="relative">
                              <SurveyCard survey={survey} />
                              <Badge
                                variant={
                                  applicant?.status === "accepted"
                                    ? "default"
                                    : applicant?.status === "rejected"
                                    ? "destructive"
                                    : "secondary"
                                }
                                className="absolute top-4 right-4 z-20"
                              >
                                {applicant?.status === "accepted" && "Accepted"}
                                {applicant?.status === "rejected" && "Rejected"}
                                {applicant?.status === "pending" && (
                                  <>
                                    <Clock className="h-3 w-3 mr-1" />
                                    Pending
                                  </>
                                )}
                              </Badge>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  ) : (
                    <Card>
                      <CardContent className="pt-12 pb-12 text-center">
                        <p className="text-muted-foreground">
                          You haven&apos;t applied to any targeted surveys yet
                        </p>
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>
              </Tabs>
            </motion.div>
          </div>
        </main>
      </PageTransition>
    </>
  );
}
