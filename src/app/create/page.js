"use client";

import { useState } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  PlusCircle,
  Trash2,
  Users,
  Calendar,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { createSurvey } from "@/lib/survey-contract";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Checkbox } from "@/components/ui/checkbox";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { ButtonGroup } from "@/components/ui/button-group";

export default function CreateSurveyPage() {
  const { address } = useAccount();
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [reward, setReward] = useState("");
  const [respondentType, setRespondentType] = useState("public");
  const [numberOfRespondents, setNumberOfRespondents] = useState("");
  const [questions, setQuestions] = useState([
    { id: "1", text: "", type: "short-answer" },
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Screening fields
  const [screeningDescription, setScreeningDescription] = useState("");
  const [screeningRequirements, setScreeningRequirements] = useState("");
  const [screeningDateTime, setScreeningDateTime] = useState("");
  const [meetingLink, setMeetingLink] = useState("");
  const [location, setLocation] = useState("");
  const [flexibleScheduling, setFlexibleScheduling] = useState(false);
  const [screeningDeadline, setScreeningDeadline] = useState("");

  const addQuestion = () => {
    const newQuestion = {
      id: Date.now().toString(),
      text: "",
      type: "short-answer",
    };
    setQuestions([...questions, newQuestion]);
  };

  const removeQuestion = (id) => {
    if (questions.length > 1) {
      setQuestions(questions.filter((q) => q.id !== id));
    }
  };

  const updateQuestion = (id, field, value) => {
    setQuestions(
      questions.map((q) => (q.id === id ? { ...q, [field]: value } : q))
    );
  };

  const addOption = (questionId) => {
    setQuestions(
      questions.map((q) =>
        q.id === questionId ? { ...q, options: [...(q.options || []), ""] } : q
      )
    );
  };

  const updateOption = (questionId, optionIndex, value) => {
    setQuestions(
      questions.map((q) => {
        if (q.id === questionId && q.options) {
          const newOptions = [...q.options];
          newOptions[optionIndex] = value;
          return { ...q, options: newOptions };
        }
        return q;
      })
    );
  };

  const removeOption = (questionId, optionIndex) => {
    setQuestions(
      questions.map((q) => {
        if (q.id === questionId && q.options) {
          const newOptions = q.options.filter((_, idx) => idx !== optionIndex);
          return { ...q, options: newOptions };
        }
        return q;
      })
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!address) {
      toast.error("Please connect your wallet first");
      return;
    }

    if (!title || !description || !reward || !numberOfRespondents) {
      toast.error("Please fill in all required fields");
      return;
    }

    const rewardNum = parseFloat(reward);
    if (isNaN(rewardNum) || rewardNum <= 0) {
      toast.error("Please enter a valid reward amount");
      return;
    }

    const validQuestions = questions.filter((q) => q.text.trim() !== "");
    if (validQuestions.length === 0) {
      toast.error("Please add at least one question");
      return;
    }

    setIsSubmitting(true);

    try {
      const screeningInfo =
        respondentType === "targeted"
          ? {
              description: screeningDescription,
              requirements: screeningRequirements,
              dateTime: screeningDateTime,
              meetingLink,
              location,
              flexibleScheduling,
              deadline: screeningDeadline,
            }
          : undefined;

      const survey = await createSurvey(
        title,
        description,
        validQuestions,
        reward,
        address,
        respondentType,
        respondentType === "targeted"
          ? parseInt(numberOfRespondents)
          : undefined,
        screeningInfo
      );
      toast.success("Survey created successfully!");
      router.push(`/surveys/${survey.id}`);
    } catch (error) {
      console.error("Error creating survey:", error);
      toast.error("Failed to create survey");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      <PageTransition>
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
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Survey Details */}
                    <div className="space-y-5">
                      <div className="flex flex-col gap-3">
                        <Label htmlFor="title">Survey Title *</Label>
                        <Input
                          id="title"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          placeholder="Enter survey title"
                          required
                        />
                      </div>

                      <div className="flex flex-col gap-3">
                        <Label htmlFor="description">Description *</Label>
                        <Textarea
                          id="description"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          placeholder="Describe your survey"
                          rows={3}
                          required
                        />
                      </div>

                      <div className="flex flex-col gap-3">
                        <Label htmlFor="numberOfRespondents">
                          Number of Respondents *
                        </Label>
                        <Input
                          id="numberOfRespondents"
                          type="number"
                          min="1"
                          value={numberOfRespondents}
                          onChange={(e) =>
                            setNumberOfRespondents(e.target.value)
                          }
                          placeholder="10"
                          required
                        />
                      </div>

                      <div className="flex flex-col gap-3">
                        <Label htmlFor="reward">Total Reward (ETH) *</Label>
                        <div>
                          <Input
                            id="reward"
                            type="number"
                            step="0.001"
                            min="0"
                            value={reward}
                            onChange={(e) => setReward(e.target.value)}
                            placeholder="0.1"
                            required
                          />
                          <p className="text-sm text-muted-foreground mt-1">
                            This amount will be split among all respondents
                          </p>
                        </div>
                      </div>

                      {/* Respondent Type */}
                      <div className="space-y-3">
                        <Label className="flex items-center gap-2">
                          <Users className="h-4 w-4" />
                          Respondent Type *
                        </Label>
                        <RadioGroup
                          value={respondentType}
                          onValueChange={(value) => setRespondentType(value)}
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="public" id="public" />
                            <Label
                              htmlFor="public"
                              className="font-normal cursor-pointer"
                            >
                              Public - Anyone can respond
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="targeted" id="targeted" />
                            <Label
                              htmlFor="targeted"
                              className="font-normal cursor-pointer"
                            >
                              Targeted - Screen and select respondents
                            </Label>
                          </div>
                        </RadioGroup>
                      </div>

                      {/* Targeted Survey Options */}
                      {respondentType === "targeted" && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="space-y-4 border-l-2 border-primary pl-4"
                        >
                          <Card className="bg-muted/50">
                            <CardHeader>
                              <CardTitle className="text-lg flex items-center gap-2">
                                <Calendar className="h-5 w-5" />
                                Screening Setup
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-5">
                              <div className="flex flex-col gap-3">
                                <Label htmlFor="screeningDescription">
                                  Screening Description
                                </Label>
                                <Textarea
                                  id="screeningDescription"
                                  value={screeningDescription}
                                  onChange={(e) =>
                                    setScreeningDescription(e.target.value)
                                  }
                                  placeholder="Describe the screening process"
                                  rows={2}
                                />
                              </div>

                              <div className="flex flex-col gap-3">
                                <Label htmlFor="screeningRequirements">
                                  Requirements
                                </Label>
                                <Textarea
                                  id="screeningRequirements"
                                  value={screeningRequirements}
                                  onChange={(e) =>
                                    setScreeningRequirements(e.target.value)
                                  }
                                  placeholder="List any requirements (e.g., age, location, experience)"
                                  rows={2}
                                />
                              </div>

                              <div className="flex items-center space-x-2">
                                <Checkbox
                                  id="flexibleScheduling"
                                  className="h-4 w-4 rounded"
                                  checked={flexibleScheduling}
                                  onClick={() =>
                                    setFlexibleScheduling((prev) => !prev)
                                  }
                                />
                                <Label
                                  htmlFor="flexibleScheduling"
                                  className="font-normal cursor-pointer"
                                >
                                  Allow flexible scheduling (respondent chooses
                                  slot)
                                </Label>
                              </div>

                              {!flexibleScheduling && (
                                <div className="flex flex-col gap-3">
                                  <Label htmlFor="screeningDateTime">
                                    Screening Date & Time
                                  </Label>
                                  <Input
                                    id="screeningDateTime"
                                    type="datetime-local"
                                    value={screeningDateTime}
                                    onChange={(e) =>
                                      setScreeningDateTime(e.target.value)
                                    }
                                  />
                                </div>
                              )}

                              <div className="flex flex-col gap-3">
                                <Label htmlFor="meetingLink">
                                  Meeting Link
                                </Label>
                                <Input
                                  id="meetingLink"
                                  type="url"
                                  value={meetingLink}
                                  onChange={(e) =>
                                    setMeetingLink(e.target.value)
                                  }
                                  placeholder="https://zoom.us/..."
                                />
                              </div>

                              <div className="flex flex-col gap-3">
                                <Label htmlFor="location">
                                  Physical Location (optional)
                                </Label>
                                <Input
                                  id="location"
                                  value={location}
                                  onChange={(e) => setLocation(e.target.value)}
                                  placeholder="123 Main St, City, Country"
                                />
                              </div>

                              <div className="flex flex-col gap-3">
                                <Label htmlFor="screeningDeadline">
                                  Application Deadline *
                                </Label>
                                <Input
                                  id="screeningDeadline"
                                  type="datetime-local"
                                  value={screeningDeadline}
                                  onChange={(e) =>
                                    setScreeningDeadline(e.target.value)
                                  }
                                  required
                                />
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      )}
                    </div>

                    {/* Questions */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label className="text-lg">Questions</Label>
                        <Button
                          type="button"
                          onClick={addQuestion}
                          variant="outline"
                          size="sm"
                        >
                          <PlusCircle className="h-4 w-4 mr-2" />
                          Add Question
                        </Button>
                      </div>

                      {questions.map((question, index) => (
                        <motion.div
                          key={question.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <Card>
                            <CardContent className="pt-6 space-y-4">
                              <div className="flex items-start justify-between gap-4">
                                <div className="flex-1 space-y-5">
                                  <div className="flex flex-col gap-3">
                                    <Label htmlFor={`question-${question.id}`}>
                                      Question {index + 1}
                                    </Label>
                                    <Input
                                      id={`question-${question.id}`}
                                      value={question.text}
                                      onChange={(e) =>
                                        updateQuestion(
                                          question.id,
                                          "text",
                                          e.target.value
                                        )
                                      }
                                      placeholder="Enter your question"
                                    />
                                  </div>

                                  <div className="flex flex-col gap-3">
                                    <Label htmlFor={`type-${question.id}`}>
                                      Question Type
                                    </Label>
                                    <Select
                                      value={question.type}
                                      onValueChange={(value) =>
                                        updateQuestion(
                                          question.id,
                                          "type",
                                          value
                                        )
                                      }
                                    >
                                      <SelectTrigger id={`type-${question.id}`}>
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="short-answer">
                                          Short Answer
                                        </SelectItem>
                                        <SelectItem value="long-answer">
                                          Long Answer
                                        </SelectItem>
                                        <SelectItem value="multiple-choice">
                                          Multiple Choice
                                        </SelectItem>
                                        <SelectItem value="checkbox">
                                          Checkbox
                                        </SelectItem>
                                        <SelectItem value="rating">
                                          Rating (1-5)
                                        </SelectItem>
                                        <SelectItem value="date">
                                          Date
                                        </SelectItem>
                                        <SelectItem value="time">
                                          Time
                                        </SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>

                                  {(question.type === "multiple-choice" ||
                                    question.type === "checkbox") && (
                                    <div className="space-y-3">
                                      <div className="flex items-center justify-between">
                                        <Label>Options</Label>
                                        <Button
                                          type="button"
                                          onClick={() => addOption(question.id)}
                                          variant="outline"
                                          size="sm"
                                        >
                                          <PlusCircle className="h-3 w-3 mr-1" />
                                          Add Option
                                        </Button>
                                      </div>
                                      <div className="space-y-2">
                                        {(question.options || []).map(
                                          (option, optionIndex) => (
                                            <motion.div
                                              key={`${question.id}-option-${optionIndex}`}
                                              initial={{ opacity: 0, x: -10 }}
                                              animate={{ opacity: 1, x: 0 }}
                                              transition={{ duration: 0.2 }}
                                              className="flex items-center gap-2"
                                            >
                                              <Input
                                                value={option}
                                                onChange={(e) =>
                                                  updateOption(
                                                    question.id,
                                                    optionIndex,
                                                    e.target.value
                                                  )
                                                }
                                                placeholder={`Option ${
                                                  optionIndex + 1
                                                }`}
                                                className="flex-1"
                                              />
                                              <Button
                                                type="button"
                                                variant="ghost"
                                                size="icon"
                                                onClick={() =>
                                                  removeOption(
                                                    question.id,
                                                    optionIndex
                                                  )
                                                }
                                              >
                                                <Trash2 className="h-4 w-4 text-destructive" />
                                              </Button>
                                            </motion.div>
                                          )
                                        )}
                                        {(!question.options ||
                                          question.options.length === 0) && (
                                          <p className="text-sm text-muted-foreground">
                                            Click "Add Option" to create choices
                                          </p>
                                        )}
                                      </div>
                                    </div>
                                  )}
                                </div>

                                {questions.length > 1 && (
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => removeQuestion(question.id)}
                                  >
                                    <Trash2 className="h-4 w-4 text-destructive" />
                                  </Button>
                                )}
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                    </div>

                    {/* Submit Button */}
                    <div className="flex gap-4">
                      <Button
                        type="submit"
                        className="flex-1"
                        disabled={isSubmitting || !address}
                      >
                        {isSubmitting
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
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </main>
      </PageTransition>
    </>
  );
}
