"use client";

import { useState } from "react";
import { useAccount } from "wagmi";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Sparkles, FileText, CheckCircle } from "lucide-react";
import { createSurvey } from "@/lib/survey-contract";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form } from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import QuestionForm from "@/components/survey/question-form";
import ScreeningSetupForm from "@/components/survey/screening-setup-form";
import SurveyInfoForm from "@/components/survey/survey-info-form";

// Zod schema for question validation
const questionSchema = z
  .object({
    id: z.string(),
    text: z.string().min(1, "Question text is required"),
    type: z.enum([
      "short-answer",
      "long-answer",
      "multiple-choice",
      "checkbox",
      "rating",
      "date",
      "time",
    ]),
    options: z.array(z.string()).optional(),
    required: z.boolean(),
  })
  .superRefine((question, ctx) => {
    if (question.type === "multiple-choice" || question.type === "checkbox") {
      if (!question.options || question.options.length < 2) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message:
            "Multiple choice and checkbox questions must have at least 2 options",
          path: ["options"],
        });
      }
      if (question.options) {
        const emptyOptions = question.options.filter(
          (opt) => opt.trim() === ""
        );
        if (emptyOptions.length > 0) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "All options must have text",
            path: ["options"],
          });
        }
      }
    }
  });

// Main form schema
const surveySchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title must be less than 100 characters"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description must be less than 500 characters"),
  reward: z.number().positive("Reward must be a positive number"),
  numberOfRespondents: z
    .number()
    .int()
    .min(1)
    .max(1000, "Number of respondents must be between 1 and 1000"),
  screeningDescription: z
    .string()
    .min(10, "Screening description must be at least 10 characters"),
  screeningRequirements: z
    .string()
    .min(5, "Requirements must be at least 5 characters"),
  meetingLink: z
    .string()
    .url("Must be a valid URL")
    .optional()
    .or(z.literal("")),
  physicalLocation: z.string().optional(),
  applicationDeadline: z
    .string()
    .min(1, "Application deadline is required")
    .refine((date) => new Date(date) > new Date(), {
      message: "Application deadline must be in the future",
    }),
  screeningDateTime: z
    .string()
    .min(1, "Screening date and time is required")
    .refine((date) => new Date(date) > new Date(), {
      message: "Screening date and time must be in the future",
    }),
  surveyStartDate: z
    .string()
    .min(1, "Survey start date is required")
    .refine((date) => new Date(date) > new Date(), {
      message: "Survey start date must be in the future",
    }),
  surveyFinalizeDate: z
    .string()
    .min(1, "Survey finalize date is required")
    .refine((date) => new Date(date) > new Date(), {
      message: "Survey finalize date must be in the future",
    }),
  questions: z
    .array(questionSchema)
    .min(1, "At least one question is required"),
});

export default function CreateSurveyPage() {
  const { address } = useAccount();
  const router = useRouter();
  const [showTermsDialog, setShowTermsDialog] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [pendingFormData, setPendingFormData] = useState(null);

  const form = useForm({
    resolver: zodResolver(surveySchema),
    defaultValues: {
      title: "",
      description: "",
      reward: 0.01,
      numberOfRespondents: 10,
      screeningDescription: "",
      screeningRequirements: "",
      meetingLink: "",
      physicalLocation: "",
      applicationDeadline: "",
      screeningDateTime: "",
      surveyStartDate: "",
      surveyFinalizeDate: "",
      questions: [{ id: "1", text: "", type: "short-answer", required: true }],
    },
  });

  const addQuestion = () => {
    const currentValues = form.getValues("questions");
    form.setValue("questions", [
      ...currentValues,
      {
        id: Date.now().toString(),
        text: "",
        type: "short-answer",
        required: true,
      },
    ]);
  };

  const removeQuestion = (index) => {
    const currentValues = form.getValues("questions");
    if (currentValues.length > 1) {
      form.setValue(
        "questions",
        currentValues.filter((_, idx) => idx !== index)
      );
    }
  };

  const handleFormSubmit = async (values) => {
    setPendingFormData(values);
    setShowTermsDialog(true);
  };

  const handleTermsAccept = async () => {
    if (!acceptedTerms || !pendingFormData) {
      toast.error("Please accept the terms and conditions");
      return;
    }

    if (!address) {
      toast.error("Please connect your wallet first");
      return;
    }

    setShowTermsDialog(false);

    try {
      const screeningInfo = {
        description: pendingFormData.screeningDescription,
        requirements: pendingFormData.screeningRequirements,
        meetingLink: pendingFormData.meetingLink || undefined,
        location: pendingFormData.physicalLocation || undefined,
        applicationDeadline: pendingFormData.applicationDeadline,
        screeningDateTime: pendingFormData.screeningDateTime,
        surveyStartDate: pendingFormData.surveyStartDate,
        surveyFinalizeDate: pendingFormData.surveyFinalizeDate,
      };

      const survey = await createSurvey(
        pendingFormData.title,
        pendingFormData.description,
        pendingFormData.questions,
        pendingFormData.reward.toString(),
        address,
        "targeted",
        pendingFormData.numberOfRespondents,
        screeningInfo
      );

      toast.success("Survey created successfully!");
      router.push(`/surveys/${survey.id}`);
    } catch (error) {
      console.error("Error creating survey:", error);
      toast.error("Failed to create survey");
    }
  };

  return (
    <>
      <main className="min-h-screen pt-20 pb-12 px-4">
        <div className="container mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="border-white/10 bg-gradient-to-br from-white/5 to-white/10">
              <CardHeader>
                <CardTitle className="text-3xl flex items-center gap-2 bg-gradient-to-r from-emerald-400 to-lime-400 bg-clip-text text-transparent">
                  <Sparkles className="h-8 w-8 text-emerald-400" />
                  Create Targeted Survey
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Create a survey with screening to select specific respondents
                  and deposit ETH rewards
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(handleFormSubmit)}
                    className="space-y-8"
                  >
                    <SurveyInfoForm form={form} />

                    <ScreeningSetupForm form={form} />

                    {/* Questions Section */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl font-semibold bg-gradient-to-r from-emerald-400 to-lime-400 bg-clip-text text-transparent">
                          Survey Questions
                        </h3>
                        <Button
                          type="button"
                          onClick={addQuestion}
                          size="sm"
                          className="bg-gradient-to-r from-emerald-500 to-lime-500 hover:from-emerald-600 hover:to-lime-600"
                        >
                          <PlusCircle className="h-4 w-4 mr-2" />
                          Add Question
                        </Button>
                      </div>

                      {form.watch("questions").map((question, index) => (
                        <motion.div
                          key={question.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <QuestionForm
                            form={form}
                            index={index}
                            onRemove={removeQuestion}
                          />
                        </motion.div>
                      ))}

                      {form.formState.errors.questions &&
                        !Array.isArray(form.formState.errors.questions) && (
                          <p className="text-red-500 text-sm">
                            {form.formState.errors.questions.message}
                          </p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <div className="flex gap-4">
                      <Button
                        type="submit"
                        className="flex-1 bg-gradient-to-r from-emerald-500 to-lime-500 hover:from-emerald-600 hover:to-lime-600 text-white"
                        disabled={form.formState.isSubmitting || !address}
                      >
                        {form.formState.isSubmitting
                          ? "Creating..."
                          : "Create Survey & Deposit ETH"}
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => router.push("/surveys")}
                        className="border-white/10 hover:border-emerald-500/50"
                      >
                        Cancel
                      </Button>
                    </div>

                    {!address && (
                      <p className="text-red-500 text-sm text-center">
                        Please connect your wallet to create a survey
                      </p>
                    )}
                  </form>
                </Form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>

      {/* Terms & Conditions Dialog */}
      <Dialog open={showTermsDialog} onOpenChange={setShowTermsDialog}>
        <DialogContent className="max-w-3xl max-h-[80vh] bg-gradient-to-br from-gray-900 to-gray-800 border-emerald-500/20">
          <DialogHeader>
            <DialogTitle className="text-2xl flex items-center gap-2 bg-gradient-to-r from-emerald-400 to-lime-400 bg-clip-text text-transparent">
              <FileText className="h-6 w-6 text-emerald-400" />
              Terms & Conditions
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              Please read and accept our terms before creating your survey
            </DialogDescription>
          </DialogHeader>

          <ScrollArea className="h-[400px] pr-4">
            <div className="space-y-4 text-sm text-gray-300">
              <section>
                <h3 className="font-semibold text-emerald-400 mb-2">
                  1. Survey Creation & ETH Deposit
                </h3>
                <p>
                  By creating a survey, you agree to deposit the required ETH
                  amount (reward × number of respondents) into the smart
                  contract. This deposit is non-refundable once the survey
                  screening process begins.
                </p>
              </section>

              <section>
                <h3 className="font-semibold text-emerald-400 mb-2">
                  2. Respondent Selection
                </h3>
                <p>
                  You are responsible for screening and selecting qualified
                  respondents. Once you accept a respondent, they will be
                  eligible to complete the survey and receive the reward upon
                  submission.
                </p>
              </section>

              <section>
                <h3 className="font-semibold text-emerald-400 mb-2">
                  3. Payment Distribution
                </h3>
                <p>
                  ETH rewards will be automatically distributed to respondents
                  upon survey completion and verification. The smart contract
                  handles all payment distributions transparently on the
                  blockchain.
                </p>
              </section>

              <section>
                <h3 className="font-semibold text-emerald-400 mb-2">
                  4. Data & Privacy
                </h3>
                <p>
                  All survey responses are stored on-chain and are publicly
                  accessible. Do not collect sensitive personal information. You
                  are responsible for complying with all applicable data
                  protection laws.
                </p>
              </section>

              <section>
                <h3 className="font-semibold text-emerald-400 mb-2">
                  5. Smart Contract Risks
                </h3>
                <p>
                  This platform uses smart contracts on the blockchain. While we
                  strive for security, you acknowledge the inherent risks of
                  blockchain technology, including but not limited to smart
                  contract bugs, network congestion, and gas fee fluctuations.
                </p>
              </section>

              <section>
                <h3 className="font-semibold text-emerald-400 mb-2">
                  6. Survey Timeline
                </h3>
                <p>
                  You must set an application deadline, screening date/time, and
                  finalize date. You are responsible for managing the survey
                  timeline and screening process within the specified dates.
                </p>
              </section>

              <section>
                <h3 className="font-semibold text-emerald-400 mb-2">
                  7. Prohibited Content
                </h3>
                <p>
                  You agree not to create surveys containing illegal content,
                  harassment, discrimination, misleading information, or any
                  content that violates applicable laws or regulations.
                </p>
              </section>

              <section>
                <h3 className="font-semibold text-emerald-400 mb-2">
                  8. Liability Disclaimer
                </h3>
                <p>
                  SurveyChain is provided &quot;as is&quot; without warranties
                  of any kind. We are not liable for any losses, damages, or
                  issues arising from your use of the platform, including but
                  not limited to loss of ETH, data, or survey responses.
                </p>
              </section>

              <section>
                <h3 className="font-semibold text-emerald-400 mb-2">
                  9. Agreement
                </h3>
                <p>
                  By checking the box below and creating a survey, you confirm
                  that you have read, understood, and agree to be bound by these
                  Terms & Conditions, as well as our Privacy Policy and Cookie
                  Policy.
                </p>
              </section>

              <div className="mt-6 p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                <p className="text-emerald-400 font-semibold mb-2 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Additional Resources
                </p>
                <div className="space-y-1 text-xs">
                  <p>
                    •{" "}
                    <Link
                      href="/terms"
                      className="text-emerald-400 hover:underline"
                    >
                      Full Terms of Service
                    </Link>
                  </p>
                  <p>
                    •{" "}
                    <Link
                      href="/privacy"
                      className="text-emerald-400 hover:underline"
                    >
                      Privacy Policy
                    </Link>
                  </p>
                  <p>
                    •{" "}
                    <Link
                      href="/cookies"
                      className="text-emerald-400 hover:underline"
                    >
                      Cookie Policy
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </ScrollArea>

          <DialogFooter className="flex-col sm:flex-row gap-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="terms"
                checked={acceptedTerms}
                onCheckedChange={(checked) =>
                  setAcceptedTerms(Boolean(checked))
                }
                className="border-emerald-500/50 data-[state=checked]:bg-emerald-500"
              />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-300"
              >
                I have read and accept the Terms & Conditions
              </label>
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setShowTermsDialog(false);
                  setAcceptedTerms(false);
                }}
                className="flex-1 sm:flex-none border-white/10"
              >
                Cancel
              </Button>
              <Button
                type="button"
                onClick={handleTermsAccept}
                disabled={!acceptedTerms}
                className="flex-1 sm:flex-none bg-gradient-to-r from-emerald-500 to-lime-500 hover:from-emerald-600 hover:to-lime-600"
              >
                Accept & Create Survey
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
