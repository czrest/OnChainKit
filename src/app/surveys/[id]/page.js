"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAccount } from "wagmi";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle2, Clock, Sparkles, Users } from "lucide-react";
import {
  getSurveyById,
  finalizeSurvey,
  canAccessSurvey,
} from "@/lib/survey-contract";
import { toast } from "sonner";
import { motion } from "framer-motion";
import Link from "next/link";
import ApplicationForm from "@/components/survey/application-form";
import ResponseForm from "@/components/survey/response-form";
import ScreeningInfo from "@/components/survey/screening-info";
import SurveyHeader from "@/components/survey/survey-header";

export default function SurveyDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { address } = useAccount();
  const [survey, setSurvey] = useState(null);
  const [isFinalizing, setIsFinalizing] = useState(false);

  const surveyId = params?.id;

  useEffect(() => {
    const loadSurvey = () => {
      if (surveyId) {
        const loadedSurvey = getSurveyById(surveyId);
        if (loadedSurvey) {
          setSurvey(loadedSurvey);
        }
      }
    };

    loadSurvey();
    const interval = setInterval(loadSurvey, 2000);
    return () => clearInterval(interval);
  }, [surveyId]);

  const handleFinalizeSurvey = async () => {
    if (!address || !survey) return;

    setIsFinalizing(true);

    try {
      await finalizeSurvey(survey.id, address);
      toast.success(
        "Survey finalized! Rewards distributed to all respondents."
      );
      const updatedSurvey = getSurveyById(survey.id);
      if (updatedSurvey) {
        setSurvey(updatedSurvey);
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to finalize survey";
      toast.error(errorMessage);
    } finally {
      setIsFinalizing(false);
    }
  };

  const handleApplicationSuccess = () => {
    const updatedSurvey = getSurveyById(surveyId);
    if (updatedSurvey) {
      setSurvey(updatedSurvey);
    }
  };

  const handleResponseSuccess = () => {
    const updatedSurvey = getSurveyById(surveyId);
    if (updatedSurvey) {
      setSurvey(updatedSurvey);
    }
  };

  if (!survey) {
    return (
      <>
        <main className="min-h-screen pt-20 pb-12 px-4">
          <div className="container mx-auto text-center">
            <p className="text-gray-400">Survey not found</p>
            <Button onClick={() => router.push("/surveys")} className="mt-4">
              Back to Surveys
            </Button>
          </div>
        </main>
      </>
    );
  }

  const isCreator = address?.toLowerCase() === survey.creator.toLowerCase();
  const hasResponded = survey.responses.some(
    (r) => r.responder.toLowerCase() === address?.toLowerCase()
  );
  const rewardPerResponse =
    survey.responses.length > 0
      ? (parseFloat(survey.reward) / survey.responses.length).toFixed(4)
      : survey.reward;

  // Check applicant status
  const applicant = survey.applicants.find(
    (a) => address && a.address.toLowerCase() === address.toLowerCase()
  );
  const hasApplied = !!applicant;
  const applicationStatus = applicant?.status || "none";

  console.log(applicationStatus);

  // Check if user can access survey
  const hasAccess = address ? canAccessSurvey(survey, address) : false;

  // Check if screening is still open
  const deadline = survey.screeningInfo?.applicationDeadline
    ? new Date(survey.screeningInfo.applicationDeadline).getTime()
    : 0;
  const now = Date.now();
  const isScreeningOpen = deadline > now;

  return (
    <>
      <main className="min-h-screen pt-20 pb-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Button
              variant="ghost"
              onClick={() => router.push("/surveys")}
              className="mb-6 hover:bg-white/5"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Surveys
            </Button>

            <SurveyHeader survey={survey} />

            {/* Creator Management Link */}
            {isCreator && (
              <Card className="mb-6 border-white/10 bg-gradient-to-br from-white/5 to-white/10">
                <CardContent className="pt-6">
                  <Link href={`/dashboard/surveys/${survey.id}`}>
                    <Button
                      variant="outline"
                      className="w-full border-white/10 hover:border-emerald-500/50"
                    >
                      <Users className="h-4 w-4 mr-2" />
                      Manage Applicants ({survey.applicants.length})
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )}

            {/* Screening Information */}
            {!isCreator && <ScreeningInfo survey={survey} />}

            {/* Application Form */}
            {!isCreator && !hasApplied && isScreeningOpen && address && (
              <ApplicationForm
                survey={survey}
                userAddress={address}
                onSuccess={handleApplicationSuccess}
              />
            )}

            {/* Application Status */}
            {!isCreator && hasApplied && !hasResponded && (
              <Card className="mb-6 border-white/10 bg-gradient-to-br from-white/5 to-white/10">
                <CardContent className="pt-12 pb-12 text-center">
                  {applicationStatus === "pending" && (
                    <>
                      <Clock className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold mb-2">
                        Application Pending
                      </h3>
                      <p className="text-gray-400">
                        Your application is under review. You'll be notified of
                        the decision.
                      </p>
                    </>
                  )}
                  {applicationStatus === "accepted" && !hasAccess && (
                    <>
                      <CheckCircle2 className="h-12 w-12 text-emerald-400 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold mb-2">
                        Application Accepted!
                      </h3>
                      <p className="text-gray-400">
                        Congratulations! The survey will be available once the
                        creator opens it.
                      </p>
                    </>
                  )}
                  {applicationStatus === "accepted" && hasAccess && (
                    <>
                      <Sparkles className="h-12 w-12 text-emerald-400 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold mb-2">
                        Now Accepting Responses
                      </h3>
                      <p className="text-gray-400">Your feedback starts here</p>
                    </>
                  )}
                  {applicationStatus === "rejected" && (
                    <>
                      <div className="h-12 w-12 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
                        <Users className="h-6 w-6 text-gray-400" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">
                        Application Not Selected
                      </h3>
                      <p className="text-gray-400">
                        Thank you for your interest. Unfortunately, you were not
                        selected for this survey.
                      </p>
                    </>
                  )}
                </CardContent>
              </Card>
            )}

            {/* No Access Message */}
            {!isCreator && !hasApplied && !isScreeningOpen && (
              <Card className="mb-6 border-white/10 bg-gradient-to-br from-white/5 to-white/10">
                <CardContent className="pt-12 pb-12 text-center">
                  <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4 opacity-50" />
                  <h3 className="text-xl font-semibold mb-2">
                    Applications Closed
                  </h3>
                  <p className="text-gray-400">
                    The screening period for this survey has ended.
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Survey Questions */}
            {!survey.finalized && !hasResponded && address && hasAccess && (
              <ResponseForm
                survey={survey}
                userAddress={address}
                onSuccess={handleResponseSuccess}
              />
            )}

            {/* Already Responded */}
            {hasResponded && !survey.finalized && (
              <Card className="border-white/10 bg-gradient-to-br from-white/5 to-white/10">
                <CardContent className="pt-12 pb-12 text-center">
                  <CheckCircle2 className="h-16 w-16 text-emerald-400 mx-auto mb-4" />
                  <h3 className="text-2xl font-semibold mb-2">
                    Response Submitted!
                  </h3>
                  <p className="text-gray-400 mb-4">
                    Thank you for participating. You will receive your reward
                    when the survey is finalized.
                  </p>
                  <div className="inline-block px-4 py-2 bg-gradient-to-r from-emerald-500/20 to-lime-500/20 border border-emerald-500/30 rounded-lg">
                    <p className="text-sm text-gray-400">Expected reward</p>
                    <p className="text-xl font-bold">{rewardPerResponse} ETH</p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Finalized */}
            {survey.finalized && (
              <Card className="border-white/10 bg-gradient-to-br from-white/5 to-white/10">
                <CardContent className="pt-12 pb-12 text-center">
                  <CheckCircle2 className="h-16 w-16 text-emerald-400 mx-auto mb-4" />
                  <h3 className="text-2xl font-semibold mb-2">
                    Survey Finalized
                  </h3>
                  <p className="text-gray-400 mb-6">
                    This survey has been closed and rewards have been
                    distributed.
                  </p>
                  <div className="flex flex-wrap gap-4 justify-center">
                    <div className="px-4 py-2 bg-gradient-to-r from-emerald-500/20 to-lime-500/20 border border-emerald-500/30 rounded-lg">
                      <p className="text-sm text-gray-400">Total Responses</p>
                      <p className="text-xl font-bold">
                        {survey.responses.length}
                      </p>
                    </div>
                    <div className="px-4 py-2 bg-gradient-to-r from-emerald-500/20 to-lime-500/20 border border-emerald-500/30 rounded-lg">
                      <p className="text-sm text-gray-400">
                        Reward per Response
                      </p>
                      <p className="text-xl font-bold">
                        {rewardPerResponse} ETH
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Creator Actions */}
            {isCreator && !survey.finalized && survey.responses.length > 0 && (
              <Card className="mt-6 border-white/10 bg-gradient-to-br from-emerald-500/10 to-lime-500/10 dark:border-emerald-500/20">
                <CardContent className="pt-6">
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div>
                      <h4 className="font-semibold mb-1">Ready to finalize?</h4>
                      <p className="text-sm text-gray-400">
                        Distribute {rewardPerResponse} ETH to each of the{" "}
                        {survey.responses.length} respondents
                      </p>
                    </div>
                    <Button
                      onClick={handleFinalizeSurvey}
                      disabled={isFinalizing}
                      className="bg-gradient-to-r from-emerald-500 to-lime-500 hover:from-emerald-600 hover:to-lime-600 w-full md:w-auto"
                    >
                      {isFinalizing
                        ? "Finalizing..."
                        : "Finalize & Distribute Rewards"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {!address && !survey.finalized && (
              <Card className="mt-6 border-white/10 bg-gradient-to-br from-white/5 to-white/10">
                <CardContent className="pt-6 text-center">
                  <p className="text-gray-400">
                    Connect your wallet to respond to this survey
                  </p>
                </CardContent>
              </Card>
            )}
          </motion.div>
        </div>
      </main>
    </>
  );
}
