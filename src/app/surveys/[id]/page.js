"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { StatusBadge } from "@/components/status-badge";
import {
  ArrowLeft,
  Users,
  Coins,
  Calendar,
  CheckCircle2,
  Clock,
  ExternalLink,
} from "lucide-react";
import {
  getSurveyById,
  submitResponse,
  finalizeSurvey,
  applyForScreening,
  canAccessSurvey,
} from "@/lib/survey-contract";
import { toast } from "sonner";
import { motion } from "framer-motion";
import Link from "next/link";

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
        <Navbar />
        <PageTransition>
          <main className="min-h-screen bg-gradient-to-b from-background to-muted/20 py-12">
            <div className="container mx-auto px-4 text-center">
              <p className="text-muted-foreground">Survey not found</p>
              <Button onClick={() => router.push("/surveys")} className="mt-4">
                Back to Surveys
              </Button>
            </div>
          </main>
        </PageTransition>
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
      <Navbar />
      <PageTransition>
        <main className="min-h-screen bg-gradient-to-b from-background to-muted/20 py-12">
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

              <Card className="mb-6">
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <CardTitle className="text-3xl mb-2">
                        {survey.title}
                      </CardTitle>
                      <CardDescription className="text-base">
                        {survey.description}
                      </CardDescription>
                    </div>
                    <StatusBadge survey={survey} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Coins className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Total Reward
                        </p>
                        <p className="font-semibold">{survey.reward} ETH</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Users className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          {survey.respondentType === "targeted"
                            ? "Target"
                            : "Responses"}
                        </p>
                        <p className="font-semibold">
                          {survey.responses.length}
                          {survey.respondentType === "targeted" &&
                            survey.numberOfRespondents &&
                            ` / ${survey.numberOfRespondents}`}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Calendar className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Created</p>
                        <p className="font-semibold">
                          {new Date(survey.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>

                  {!survey.finalized && survey.responses.length > 0 && (
                    <div className="mt-4 p-4 bg-muted rounded-lg">
                      <p className="text-sm">
                        Current reward per response:{" "}
                        <span className="font-semibold">
                          {rewardPerResponse} ETH
                        </span>
                      </p>
                    </div>
                  )}

                  {/* Creator Management Link */}
                  {isCreator && survey.respondentType === "targeted" && (
                    <div className="mt-4">
                      <Link href={`/dashboard/surveys/${survey.id}`}>
                        <Button variant="outline" className="w-full">
                          <Users className="h-4 w-4 mr-2" />
                          Manage Applicants ({survey.applicants.length})
                        </Button>
                      </Link>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Screening Application for Targeted Surveys */}
              {survey.respondentType === "targeted" &&
                !isCreator &&
                !hasApplied &&
                isScreeningOpen && (
                  <Card className="mb-6">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Clock className="h-5 w-5" />
                        Apply for Screening
                      </CardTitle>
                      <CardDescription>
                        This is a targeted survey. Submit your application to be
                        considered.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {survey.screeningInfo && (
                        <>
                          {survey.screeningInfo.description && (
                            <div>
                              <Label>Screening Process</Label>
                              <p className="text-sm text-muted-foreground mt-1">
                                {survey.screeningInfo.description}
                              </p>
                            </div>
                          )}

                          {survey.screeningInfo.requirements && (
                            <div>
                              <Label>Requirements</Label>
                              <p className="text-sm text-muted-foreground mt-1">
                                {survey.screeningInfo.requirements}
                              </p>
                            </div>
                          )}

                          {survey.screeningInfo.dateTime &&
                            !survey.screeningInfo.flexibleScheduling && (
                              <div>
                                <Label>Screening Date & Time</Label>
                                <p className="text-sm text-muted-foreground mt-1">
                                  {new Date(
                                    survey.screeningInfo.dateTime
                                  ).toLocaleString()}
                                </p>
                              </div>
                            )}

                          {survey.screeningInfo.meetingLink && (
                            <div>
                              <Label>Meeting Link</Label>
                              <a
                                href={survey.screeningInfo.meetingLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-primary hover:underline flex items-center gap-1 mt-1"
                              >
                                {survey.screeningInfo.meetingLink}
                                <ExternalLink className="h-3 w-3" />
                              </a>
                            </div>
                          )}

                          {survey.screeningInfo.location && (
                            <div>
                              <Label>Location</Label>
                              <p className="text-sm text-muted-foreground mt-1">
                                {survey.screeningInfo.location}
                              </p>
                            </div>
                          )}
                        </>
                      )}

                      <div>
                        <Label htmlFor="applicationMessage">
                          Application Message (optional)
                        </Label>
                        <Textarea
                          id="applicationMessage"
                          value={applicationMessage}
                          onChange={(e) =>
                            setApplicationMessage(e.target.value)
                          }
                          placeholder="Tell us why you'd be a great fit..."
                          rows={3}
                        />
                      </div>

                      {survey.screeningInfo?.flexibleScheduling && (
                        <div>
                          <Label htmlFor="selectedSlot">
                            Preferred Time Slot
                          </Label>
                          <Input
                            id="selectedSlot"
                            type="datetime-local"
                            value={selectedSlot}
                            onChange={(e) => setSelectedSlot(e.target.value)}
                          />
                        </div>
                      )}

                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>
                          Application deadline:{" "}
                          {new Date(deadline).toLocaleString()}
                        </span>
                      </div>

                      <Button
                        onClick={handleApplyForScreening}
                        disabled={isApplying || !address}
                        className="w-full"
                      >
                        {isApplying ? "Submitting..." : "Submit Application"}
                      </Button>
                    </CardContent>
                  </Card>
                )}

              {/* Application Status */}
              {survey.respondentType === "targeted" &&
                !isCreator &&
                hasApplied && (
                  <Card className="mb-6">
                    <CardContent className="pt-6">
                      <div className="text-center">
                        {applicationStatus === "pending" && (
                          <>
                            <Clock className="h-12 w-12 text-primary mx-auto mb-4" />
                            <h3 className="text-xl font-semibold mb-2">
                              Application Pending
                            </h3>
                            <p className="text-muted-foreground">
                              Your application is under review. You'll be
                              notified of the decision.
                            </p>
                          </>
                        )}
                        {applicationStatus === "accepted" && !hasAccess && (
                          <>
                            <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold mb-2">
                              Application Accepted!
                            </h3>
                            <p className="text-muted-foreground">
                              Congratulations! The survey will be available once
                              the creator opens it.
                            </p>
                          </>
                        )}
                        {applicationStatus === "rejected" && (
                          <>
                            <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                              <Users className="h-6 w-6 text-muted-foreground" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">
                              Application Not Selected
                            </h3>
                            <p className="text-muted-foreground">
                              Thank you for your interest. Unfortunately, you
                              were not selected for this survey.
                            </p>
                          </>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )}

              {/* No Access Message */}
              {survey.respondentType === "targeted" &&
                !isCreator &&
                !hasApplied &&
                !isScreeningOpen && (
                  <Card className="mb-6">
                    <CardContent className="pt-12 pb-12 text-center">
                      <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                      <h3 className="text-xl font-semibold mb-2">
                        Applications Closed
                      </h3>
                      <p className="text-muted-foreground">
                        The screening period for this survey has ended.
                      </p>
                    </CardContent>
                  </Card>
                )}

              {/* Survey Questions */}
              {!survey.finalized && !hasResponded && address && hasAccess && (
                <Card>
                  <CardHeader>
                    <CardTitle>Survey Questions</CardTitle>
                    <CardDescription>
                      Answer all questions to submit your response
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {survey.questions.map((question, index) => (
                      <motion.div
                        key={question.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="space-y-3"
                      >
                        <Label className="text-base font-semibold">
                          {index + 1}. {question.text}
                        </Label>

                        {question.type === "short-answer" && (
                          <Input
                            value={answers[question.id] || ""}
                            onChange={(e) =>
                              handleAnswerChange(question.id, e.target.value)
                            }
                            placeholder="Your answer"
                          />
                        )}

                        {question.type === "long-answer" && (
                          <Textarea
                            value={answers[question.id] || ""}
                            onChange={(e) =>
                              handleAnswerChange(question.id, e.target.value)
                            }
                            placeholder="Your answer"
                            rows={4}
                          />
                        )}

                        {question.type === "date" && (
                          <Input
                            type="date"
                            value={answers[question.id] || ""}
                            onChange={(e) =>
                              handleAnswerChange(question.id, e.target.value)
                            }
                          />
                        )}

                        {question.type === "time" && (
                          <Input
                            type="time"
                            value={answers[question.id] || ""}
                            onChange={(e) =>
                              handleAnswerChange(question.id, e.target.value)
                            }
                          />
                        )}

                        {question.type === "multiple-choice" &&
                          question.options && (
                            <RadioGroup
                              value={answers[question.id] || ""}
                              onValueChange={(value) =>
                                handleAnswerChange(question.id, value)
                              }
                            >
                              {question.options.map((option) => (
                                <div
                                  key={option}
                                  className="flex items-center space-x-2"
                                >
                                  <RadioGroupItem
                                    value={option}
                                    id={`${question.id}-${option}`}
                                  />
                                  <Label htmlFor={`${question.id}-${option}`}>
                                    {option}
                                  </Label>
                                </div>
                              ))}
                            </RadioGroup>
                          )}

                        {question.type === "checkbox" && question.options && (
                          <div className="space-y-2">
                            {question.options.map((option) => (
                              <div
                                key={option}
                                className="flex items-center space-x-2"
                              >
                                <input
                                  type="checkbox"
                                  id={`${question.id}-${option}`}
                                  checked={(
                                    answers[question.id] || []
                                  ).includes(option)}
                                  onChange={(e) =>
                                    handleCheckboxChange(
                                      question.id,
                                      option,
                                      e.target.checked
                                    )
                                  }
                                  className="h-4 w-4 rounded border-gray-300"
                                />
                                <Label htmlFor={`${question.id}-${option}`}>
                                  {option}
                                </Label>
                              </div>
                            ))}
                          </div>
                        )}

                        {question.type === "rating" && (
                          <div className="space-y-2">
                            <div className="flex items-center gap-4">
                              <Slider
                                value={[Number(answers[question.id] || 3)]}
                                onValueChange={(value) =>
                                  handleAnswerChange(question.id, value[0])
                                }
                                min={1}
                                max={5}
                                step={1}
                                className="flex-1"
                              />
                              <Badge
                                variant="secondary"
                                className="text-base min-w-[3rem] justify-center"
                              >
                                {answers[question.id] || 3}
                              </Badge>
                            </div>
                            <div className="flex justify-between text-xs text-muted-foreground">
                              <span>1 (Low)</span>
                              <span>5 (High)</span>
                            </div>
                          </div>
                        )}

                        {index < survey.questions.length - 1 && (
                          <Separator className="mt-6" />
                        )}
                      </motion.div>
                    ))}

                    <Button
                      onClick={handleSubmitResponse}
                      className="w-full"
                      disabled={
                        isSubmitting ||
                        Object.keys(answers).length !== survey.questions.length
                      }
                    >
                      {isSubmitting ? "Submitting..." : "Submit Response"}
                    </Button>
                  </CardContent>
                </Card>
              )}

              {/* Already Responded */}
              {hasResponded && (
                <Card>
                  <CardContent className="pt-12 pb-12 text-center">
                    <CheckCircle2 className="h-16 w-16 text-primary mx-auto mb-4" />
                    <h3 className="text-2xl font-semibold mb-2">
                      Response Submitted!
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Thank you for participating. You will receive your reward
                      when the survey is finalized.
                    </p>
                    <Badge variant="secondary" className="text-base py-2 px-4">
                      Expected reward: {rewardPerResponse} ETH
                    </Badge>
                  </CardContent>
                </Card>
              )}

              {/* Finalized */}
              {survey.finalized && (
                <Card>
                  <CardContent className="pt-12 pb-12 text-center">
                    <CheckCircle2 className="h-16 w-16 text-primary mx-auto mb-4" />
                    <h3 className="text-2xl font-semibold mb-2">
                      Survey Finalized
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      This survey has been closed and rewards have been
                      distributed.
                    </p>
                    <div className="flex gap-4 justify-center">
                      <Badge
                        variant="secondary"
                        className="text-base py-2 px-4"
                      >
                        Total Responses: {survey.responses.length}
                      </Badge>
                      <Badge
                        variant="secondary"
                        className="text-base py-2 px-4"
                      >
                        Reward per Response: {rewardPerResponse} ETH
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Creator Actions */}
              {isCreator &&
                !survey.finalized &&
                survey.responses.length > 0 && (
                  <Card className="mt-6">
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold mb-1">
                            Ready to finalize?
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            Distribute {rewardPerResponse} ETH to each of the{" "}
                            {survey.responses.length} respondents
                          </p>
                        </div>
                        <Button
                          onClick={handleFinalizeSurvey}
                          disabled={isFinalizing}
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
        </main>
      </PageTransition>
    </>
  );
}
