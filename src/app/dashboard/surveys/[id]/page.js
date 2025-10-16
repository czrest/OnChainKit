"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAccount } from "wagmi";
import { Button } from "@/components/ui/button";
import {
 ArrowLeft,
 CheckCircle2,
 Users,
 TrendingUp,
 Calendar,
} from "lucide-react";
import {
 getSurveyById,
 acceptApplicant,
 rejectApplicant,
 openSurveyEarly,
} from "@/lib/survey-contract";
import { toast } from "sonner";
import { motion } from "framer-motion";

import DashboardSurveyHeader from "@/components/dashboard/dashboard-survey/dashboard-survey-header";
import DashboardStatsCard from "@/components/dashboard/dashboard-stats-card";
import DashboardSurveyScreeningStats from "@/components/dashboard/dashboard-survey/dashboard-survey-screening-stats";
import DashboardSurveyTabs from "@/components/dashboard/dashboard-survey/dashboard-survey-tabs";

export default function SurveyManagementPage() {
 const params = useParams();
 const router = useRouter();
 const { address } = useAccount();
 const [survey, setSurvey] = useState(null);
 const [loading, setLoading] = useState(false);

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

 const handleAccept = async (applicantAddress) => {
  if (!address || !survey) return;

  setLoading(true);
  try {
   await acceptApplicant(survey.id, applicantAddress, address);
   toast.success("Applicant accepted!");
   const updatedSurvey = getSurveyById(survey.id);
   if (updatedSurvey) {
    setSurvey(updatedSurvey);
   }
  } catch (error) {
   const errorMessage =
    error instanceof Error ? error.message : "Failed to accept applicant";
   toast.error(errorMessage);
  } finally {
   setLoading(false);
  }
 };

 const handleReject = async (applicantAddress) => {
  if (!address || !survey) return;

  setLoading(true);
  try {
   await rejectApplicant(survey.id, applicantAddress, address);
   toast.success("Applicant rejected");
   const updatedSurvey = getSurveyById(survey.id);
   if (updatedSurvey) {
    setSurvey(updatedSurvey);
   }
  } catch (error) {
   const errorMessage =
    error instanceof Error ? error.message : "Failed to reject applicant";
   toast.error(errorMessage);
  } finally {
   setLoading(false);
  }
 };

 const handleOpenEarly = async () => {
  if (!address || !survey) return;

  setLoading(true);
  try {
   await openSurveyEarly(survey.id, address);
   toast.success(
    "Survey opened early! Accepted respondents can now participate."
   );
   const updatedSurvey = getSurveyById(survey.id);
   if (updatedSurvey) {
    setSurvey(updatedSurvey);
   }
  } catch (error) {
   const errorMessage =
    error instanceof Error ? error.message : "Failed to open survey";
   toast.error(errorMessage);
  } finally {
   setLoading(false);
  }
 };

 if (!survey) {
  return (
   <>
    <div className="container mx-auto px-4 text-center">
     <p className="text-muted-foreground">Survey not found</p>
     <Button onClick={() => router.push("/dashboard")} className="mt-4">
      Back to Dashboard
     </Button>
    </div>
   </>
  );
 }

 if (!address || survey.creator.toLowerCase() !== address.toLowerCase()) {
  return (
   <>
    <div className="container mx-auto px-4 text-center">
     <p className="text-muted-foreground">
      You don't have permission to manage this survey
     </p>
     <Button onClick={() => router.push("/dashboard")} className="mt-4">
      Back to Dashboard
     </Button>
    </div>
   </>
  );
 }

 const pendingApplicants = survey.applicants.filter(
  (a) => a.status === "pending"
 );

 const acceptedApplicants = survey.applicants.filter(
  (a) => a.status === "accepted"
 );

 const rejectedApplicants = survey.applicants.filter(
  (a) => a.status === "rejected"
 );

 const completionRate = survey.numberOfRespondents
  ? (survey.responses.length / survey.numberOfRespondents) * 100
  : 0;

 const deadline = survey.screeningInfo?.deadline
  ? new Date(survey.screeningInfo.deadline).getTime()
  : 0;
 const now = Date.now();
 const isScreeningOpen = deadline > now;

 const statsContent = [
  {
   title: "Applicants",
   data: survey.applicants.length,
   icon: Users,
  },
  {
   title: "Accepted",
   data: survey.numberOfRespondents && ` / ${survey.numberOfRespondents}`,
   icon: CheckCircle2,
  },
  {
   title: "Responses",
   data: survey.responses.length,
   icon: TrendingUp,
  },
  {
   title: "Completion",
   data: `${completionRate.toFixed(0)}%`,
   icon: Calendar,
  },
 ];

 return (
  <>
   <div className="container mx-auto px-4 max-w-6xl">
    <motion.div
     initial={{ opacity: 0, y: 20 }}
     animate={{ opacity: 1, y: 0 }}
     transition={{ duration: 0.5 }}
    >
     <Button
      variant="ghost"
      onClick={() => router.push("/dashboard")}
      className="mb-6"
     >
      <ArrowLeft className="h-4 w-4 mr-2" />
      Back to Dashboard
     </Button>

     {/* Survey Header */}
     <DashboardSurveyHeader survey={survey} />

     {/* Stats */}
     <div className="grid md:grid-cols-4 gap-4 mb-6">
      {statsContent.map((stat) => (
       <DashboardStatsCard key={stat.title} stat={stat} />
      ))}
     </div>

     {/* Screening Status */}
     {survey.respondentType === "targeted" && (
      <DashboardSurveyScreeningStats
       survey={survey}
       isScreeningOpen={isScreeningOpen}
       deadline={deadline}
       handleOpenEarly={handleOpenEarly}
       loading={loading}
      />
     )}

     {/* Applicants Management */}
     <DashboardSurveyTabs
      pendingApplicants={pendingApplicants}
      acceptedApplicants={acceptedApplicants}
      rejectedApplicants={rejectedApplicants}
      handleAccept={handleAccept}
      handleReject={handleReject}
      loading={loading}
     />
    </motion.div>
   </div>
  </>
 );
}
