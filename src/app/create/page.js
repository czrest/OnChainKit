"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAccount } from "wagmi";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Questions from "@/components/create/Questions";
import { Calendar } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { SmartDatetimeInput } from "@/components/ui/smart-datetime-input";

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
  numberOfRespondents: z.string().refine((val) => {
    const num = parseInt(val);
    return !isNaN(num) && num >= 1;
  }, "Number of respondents must be at lease 1"),
  reward: z.string().refine((val) => {
    const num = parseFloat(val);
    return !isNaN(num) && num > 0;
  }, "Reward must be a positive number"),
  screeningDescription: z
    .string()
    .min(10, "Screening description must be at least 10 characters"),
  screeningRequirements: z
    .string()
    .min(5, "Requirements must be at least 5 characters"),
  screeningDateTime: z.unknown(),
  meetingLink: z
    .string()
    .url("Must be a valid URL")
    .optional()
    .or(z.literal("")),
  location: z.string().optional(),
  screeningDeadline: z.unknown(),
  surveyFinalizeDate: z.unknown(),
  questions: z
    .array(questionSchema)
    .min(1, "At least one question is required"),
});

export default function CreateSurveyPage() {
  const { address } = useAccount();

  const form = useForm({
    resolver: zodResolver(surveySchema),
    defaultValues: {
      title: "",
      description: "",
      reward: "",
      numberOfRespondents: "",
      screeningDescription: "",
      screeningRequirements: "",
      screeningDateTime: new Date(),
      meetingLink: "",
      location: "",
      screeningDeadline: new Date(),
      surveyFinalizeDate: new Date(),
      questions: [{ id: "1", text: "", type: "short-answer", required: true }],
    },
  });

  const currentQuestions = form.watch("questions");

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

  const removeQuestionHandler = (index) => {
    const currentValues = form.getValues("questions");
    if (currentValues.length > 1) {
      form.setValue(
        "questions",
        currentValues.filter((_, idx) => idx !== index)
      );
    }
  };

  const updateQuestionField = (index, field, value) => {
    const currentValues = form.getValues("questions");
    const updatedQuestions = [...currentValues];
    updatedQuestions[index] = { ...updatedQuestions[index], [field]: value };
    form.setValue("questions", updatedQuestions);
    form.trigger("questions");
  };

  const addOption = (questionIndex) => {
    const currentValues = form.getValues("questions");
    const updatedQuestions = [...currentValues];
    updatedQuestions[questionIndex] = {
      ...updatedQuestions[questionIndex],
      options: [...(updatedQuestions[questionIndex].options || []), ""],
    };
    form.setValue("questions", updatedQuestions);
    form.trigger("questions");
  };

  const updateOption = (questionIndex, optionIndex, value) => {
    const currentValues = form.getValues("questions");
    const updatedQuestions = [...currentValues];
    const newOptions = [...(updatedQuestions[questionIndex].options || [])];
    newOptions[optionIndex] = value;
    updatedQuestions[questionIndex] = {
      ...updatedQuestions[questionIndex],
      options: newOptions,
    };
    form.setValue("questions", updatedQuestions);
    form.trigger("questions");
  };

  const removeOption = (questionIndex, optionIndex) => {
    const currentValues = form.getValues("questions");
    const updatedQuestions = [...currentValues];
    const newOptions = (updatedQuestions[questionIndex].options || []).filter(
      (_, idx) => idx !== optionIndex
    );
    updatedQuestions[questionIndex] = {
      ...updatedQuestions[questionIndex],
      options: newOptions,
    };
    form.setValue("questions", updatedQuestions);
    form.trigger("questions");
  };

  const onSubmit = async (values) => {
    if (!address) {
      toast.error("Please connect your wallet first");
      return;
    }

    try {
      const screeningInfo = {
        description: values.screeningDescription,
        requirements: values.screeningRequirements,
        dateTime: values.screeningDateTime,
        meetingLink: values.meetingLink || undefined,
        location: values.location || undefined,
        flexibleScheduling: values.flexibleScheduling,
        deadline: values.screeningDeadline,
      };

      toast.success("Survey created successfully!");
    } catch (error) {
      console.error("Error creating survey:", error);
      toast.error("Failed to create survey");
    }
  };

  return (
    <>
      <main className="min-h-screen bg-gradient-to-b from-background to-muted/20 py-12">
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-3xl">Create New Survey</CardTitle>
                <CardDescription>
                  Create a survey and deposit ETH to reward respondents
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-5 max-w-3xl mx-auto"
                  >
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Survey Title *</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter survey title"
                              type="text"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description *</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Describe your survey"
                              className="resize-none"
                              {...field}
                            />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="numberOfRespondents"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Number of Respondents *</FormLabel>
                          <FormControl>
                            <Input placeholder="10" type="number" {...field} />
                          </FormControl>
                          <FormDescription>
                            How many people do you want to complete this survey?
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="reward"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Total Reward (ETH) *</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="0.0001"
                              type="number"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            This amount will be split among all accepted
                            respondents
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Card className="bg-muted/50">
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <Calendar className="h-5 w-5" />
                          Screening Setup
                        </CardTitle>
                        <CardDescription>
                          Configure how you'll screen and select respondents
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-5">
                        <FormField
                          control={form.control}
                          name="screeningDescription"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Screening Description *</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Describe the screening process"
                                  className="resize-none"
                                  {...field}
                                />
                              </FormControl>

                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="screeningRequirements"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Requirements *</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="List any requirements (e.g., age, location, experience)"
                                  className="resize-none"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div className="grid grid-cols-12 gap-4">
                          <div className="col-span-4">
                            <FormField
                              control={form.control}
                              name="screeningDateTime"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Screening Date & Time</FormLabel>
                                  <FormControl>
                                    <SmartDatetimeInput
                                      value={field.value}
                                      onValueChange={field.onChange}
                                      placeholder="e.g. Tomorrow morning 9am"
                                      hour12
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>

                        <FormField
                          control={form.control}
                          name="meetingLink"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Meeting Link</FormLabel>
                              <FormControl>
                                <Input
                                  type="url"
                                  placeholder="https://zoom.us/..."
                                  {...field}
                                />
                              </FormControl>

                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="location"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Physical Location</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="123 Main St, City, Country"
                                  type="text"
                                  {...field}
                                />
                              </FormControl>

                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </CardContent>
                    </Card>

                    <div className="grid grid-cols-12 gap-4">
                      <div className="col-span-6">
                        <FormField
                          control={form.control}
                          name="screeningDeadline"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Application Deadline</FormLabel>
                              <FormControl>
                                <SmartDatetimeInput
                                  value={field.value}
                                  onValueChange={field.onChange}
                                  placeholder="e.g. Tomorrow morning 9am"
                                  hour12
                                />
                              </FormControl>
                              <FormDescription>
                                The last date and time respondents can apply for
                                the survey screening or interview.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="col-span-6">
                        <FormField
                          control={form.control}
                          name="surveyFinalizeDate"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Survey Finalize Date</FormLabel>
                              <FormControl>
                                <SmartDatetimeInput
                                  value={field.value}
                                  onValueChange={field.onChange}
                                  placeholder="e.g. Tomorrow morning 9am"
                                  hour12
                                />
                              </FormControl>
                              <FormDescription>
                                The date and time when the survey automatically
                                finalizes and distributes ETH rewards to all
                                respondents.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    <Questions
                      currentQuestions={currentQuestions}
                      addQuestion={addQuestion}
                      removeQuestionHandler={removeQuestionHandler}
                      updateQuestionField={updateQuestionField}
                      addOption={addOption}
                      updateOption={updateOption}
                      removeOption={removeOption}
                      form={form}
                    />

                    <div className="flex gap-4">
                      <Button
                        type="submit"
                        className="flex-1 bg-gradient-to-r from-emerald-500 to-lime-500 hover:from-emerald-600 hover:to-lime-600"
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
                      >
                        Cancel
                      </Button>
                    </div>

                    {!address && (
                      <p className="text-sm text-destructive text-center">
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
    </>
  );
}
