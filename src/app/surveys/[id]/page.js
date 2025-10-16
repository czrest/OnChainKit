"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAccount } from "wagmi";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import {
 getSurveyById,
 submitResponse,
 finalizeSurvey,
 applyForScreening,
 canAccessSurvey,
} from "@/lib/survey-contract";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { SurveyCard } from "@/components/survey-card";

import SurveyScreeningApplication from "@/components/surveys/survey-id/survey-screening-application";
import SurveyApplicationStatus from "@/components/surveys/survey-id/survey-application-status";
import SurveyNoAccessMessage from "@/components/surveys/survey-id/survey-no-access-message";
import SurveyQuestions from "@/components/surveys/survey-id/survey-questions";
import SurveyAlreadyResponded from "@/components/surveys/survey-id/survey-already-responded";
import SurveyFinalized from "@/components/surveys/survey-id/survey-finalized";
import SurveyCreatorActions from "@/components/surveys/survey-id/survey-creator-actions";

export default function SurveyDetailPage() {
 const params = useParams();
 const router = useRouter();
 const { address } = useAccount();
 const [survey, setSurvey] = useState(null);
 const [answers, setAnswers] = useState({});
 const [isSubmitting, setIsSubmitting] = useState(false);
 const [isFinalizing, setIsFinalizing] = useState(false);

 // Screening application state
 const [applicationMessage, setApplicationMessage] = useState("");
 const [selectedSlot, setSelectedSlot] = useState("");
 const [isApplying, setIsApplying] = useState(false);

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

 const handleAnswerChange = (questionId, value) => {
  setAnswers({ ...answers, [questionId]: value });
 };

 const handleCheckboxChange = (questionId, option, checked) => {
  const currentValues = answers[questionId] || [];
  const newValues = checked
   ? [...currentValues, option]
   : currentValues.filter((v) => v !== option);
  setAnswers({ ...answers, [questionId]: newValues });
 };

 const handleSubmitResponse = async () => {
  if (!address) {
   toast.error("Please connect your wallet first");
   return;
  }

  if (!survey) {
   toast.error("Survey not found");
   return;
  }

  const answersArray = Object.entries(answers).map(([questionId, value]) => ({
   questionId,
   value,
  }));

  if (answersArray.length !== survey.questions.length) {
   toast.error("Please answer all questions");
   return;
  }

  setIsSubmitting(true);

  try {
   await submitResponse(survey.id, address, answersArray);
   toast.success("Response submitted successfully!");
   const updatedSurvey = getSurveyById(survey.id);
   if (updatedSurvey) {
    setSurvey(updatedSurvey);
   }
   setAnswers({});
  } catch (error) {
   const errorMessage =
    error instanceof Error ? error.message : "Failed to submit response";
   toast.error(errorMessage);
  } finally {
   setIsSubmitting(false);
  }
 };

 const handleFinalizeSurvey = async () => {
  if (!address || !survey) return;

  setIsFinalizing(true);

  try {
   await finalizeSurvey(survey.id, address);
   toast.success("Survey finalized! Rewards distributed to all respondents.");
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

 const handleApplyForScreening = async () => {
  if (!address || !survey) return;

  setIsApplying(true);

  try {
   await applyForScreening(
    survey.id,
    address,
    applicationMessage,
    selectedSlot
   );
   toast.success(
    "Application submitted! You will be notified about the screening decision."
   );
   const updatedSurvey = getSurveyById(survey.id);
   if (updatedSurvey) {
    setSurvey(updatedSurvey);
   }
   setApplicationMessage("");
   setSelectedSlot("");
  } catch (error) {
   const errorMessage =
    error instanceof Error ? error.message : "Failed to submit application";
   toast.error(errorMessage);
  } finally {
   setIsApplying(false);
  }
 };

 if (!survey) {
  return (
   <>
    <div className="container mx-auto px-4 text-center">
     <p className="text-muted-foreground">Survey not found</p>
     <Button onClick={() => router.push("/surveys")} className="mt-4">
      Back to Surveys
     </Button>
    </div>
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

 // Check if user can access survey
 const hasAccess = address ? canAccessSurvey(survey, address) : false;

 // Check if screening is still open
 const deadline = survey.screeningInfo?.deadline
  ? new Date(survey.screeningInfo.deadline).getTime()
  : 0;
 const now = Date.now();
 const isScreeningOpen = deadline > now;

 return (
  <>
   <div className="container mx-auto px-4 max-w-4xl">
    <motion.div
     initial={{ opacity: 0, y: 20 }}
     animate={{ opacity: 1, y: 0 }}
     transition={{ duration: 0.5 }}
    >
     <Button
      variant="ghost"
      onClick={() => router.push("/surveys")}
      className="mb-6"
     >
      <ArrowLeft className="h-4 w-4 mr-2" />
      Back to Surveys
     </Button>

     {/* survey card */}
     <SurveyCard
      survey={survey}
      rewardPerResponse={rewardPerResponse}
      isCreator={isCreator}
     />

     {/* Screening Application for Targeted Surveys */}
     {survey.respondentType === "targeted" &&
      !isCreator &&
      !hasApplied &&
      isScreeningOpen && (
       <SurveyScreeningApplication
        handleApplyForScreening={handleApplyForScreening}
        setSelectedSlot={setSelectedSlot}
        survey={survey}
        selectedSlot={selectedSlot}
        deadline={deadline}
        isApplying={isApplying}
        address={address}
       />
      )}

     {/* Application Status */}
     {survey.respondentType === "targeted" && !isCreator && hasApplied && (
      <SurveyApplicationStatus
       applicationStatus={applicationStatus}
       hasAccess={hasAccess}
      />
     )}

     {/* No Access Message */}
     {survey.respondentType === "targeted" &&
      !isCreator &&
      !hasApplied &&
      !isScreeningOpen && <SurveyNoAccessMessage />}

     {/* Survey Questions */}
     {!survey.finalized && !hasResponded && address && hasAccess && (
      <SurveyQuestions
       survey={survey}
       answers={answers}
       handleAnswerChange={handleAnswerChange}
       handleCheckboxChange={handleCheckboxChange}
       handleSubmitResponse={handleSubmitResponse}
       isSubmitting={isSubmitting}
      />
     )}

     {/* Already Responded */}
     {hasResponded && (
      <SurveyAlreadyResponded rewardPerResponse={rewardPerResponse} />
     )}

     {/* Finalized */}
     {survey.finalized && (
      <SurveyFinalized survey={survey} rewardPerResponse={rewardPerResponse} />
     )}

     {/* Creator Actions */}
     {isCreator && !survey.finalized && survey.responses.length > 0 && (
      <SurveyCreatorActions
       handleFinalizeSurvey={handleFinalizeSurvey}
       rewardPerResponse={rewardPerResponse}
       survey={survey}
       isFinalizing={isFinalizing}
      />
     )}

     {!address && !survey.finalized && (
      <Card className="mt-6">
       <CardContent className="pt-6 text-center">
        <p className="text-muted-foreground">
         Connect your wallet to respond to this survey
        </p>
       </CardContent>
      </Card>
     )}
    </motion.div>
   </div>
  </>
 );
}
