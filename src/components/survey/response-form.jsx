"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { submitResponse } from "@/lib/survey-contract";
import { Send } from "lucide-react";
import RespondentTermsDialog from "./respondent-terms-dialog";

export default function ResponseForm({ survey, userAddress, onSuccess }) {
  const [responses, setResponses] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showTermsDialog, setShowTermsDialog] = useState(false);

  const isCreator = userAddress === survey.creator;

  const handleResponseChange = (index, value) => {
    setResponses((prev) => ({ ...prev, [index]: value }));
  };

  const handleCheckboxChange = (index, option, checked) => {
    setResponses((prev) => {
      const currentValues = prev[index] || [];
      const newValues = checked
        ? [...currentValues, option]
        : currentValues.filter((v) => v !== option);
      return { ...prev, [index]: newValues };
    });
  };

  const validateResponses = () => {
    for (let i = 0; i < survey.questions.length; i++) {
      const question = survey.questions[i];
      if (question.required && !responses[i]) {
        alert(`Please answer question ${i + 1}`);
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateResponses()) {
      return;
    }

    // Show terms dialog before submission
    setShowTermsDialog(true);
  };

  const handleTermsAccepted = async () => {
    setShowTermsDialog(false);
    setIsSubmitting(true);

    try {
      const formattedResponses = survey.questions.map((question, index) => ({
        questionId: question.id,
        value: responses[index] || "",
      }));

      await submitResponse(survey.id, userAddress, formattedResponses);
      onSuccess();
    } catch (error) {
      console.error("Submission error:", error);
      alert("Failed to submit response. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTermsCancelled = () => {
    setShowTermsDialog(false);
  };

  const renderQuestion = (question, index) => {
    return (
      <div
        key={index}
        className="p-6 bg-gradient-to-br from-white/5 to-white/10 rounded-lg border border-white/10"
      >
        <Label className="text-lg font-semibold mb-4 block">
          {index + 1}. {question.text}
          {question.required && <span className="text-red-500 ml-1">*</span>}
          {!question.required && (
            <span className="text-gray-400 text-sm ml-2">(optional)</span>
          )}
        </Label>

        {question.type === "short-answer" && (
          <Input
            value={responses[index] || ""}
            onChange={(e) => handleResponseChange(index, e.target.value)}
            placeholder="Your answer"
            className="bg-white/5 border-white/10"
          />
        )}

        {question.type === "long-answer" && (
          <Textarea
            value={responses[index] || ""}
            onChange={(e) => handleResponseChange(index, e.target.value)}
            placeholder="Your detailed answer"
            className="bg-white/5 border-white/10 min-h-[120px]"
          />
        )}

        {question.type === "multiple-choice" && question.options && (
          <RadioGroup
            value={responses[index] || ""}
            onValueChange={(value) => handleResponseChange(index, value)}
          >
            {question.options.map((option, optionIndex) => (
              <div
                key={optionIndex}
                className="flex items-center space-x-2 p-3 hover:bg-white/5 rounded"
              >
                <RadioGroupItem
                  value={option}
                  id={`q${index}-opt${optionIndex}`}
                />
                <Label
                  htmlFor={`q${index}-opt${optionIndex}`}
                  className="cursor-pointer"
                >
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
        )}

        {question.type === "checkbox" && question.options && (
          <div className="space-y-3">
            {question.options.map((option, optionIndex) => (
              <div
                key={optionIndex}
                className="flex items-center space-x-2 p-3 hover:bg-white/5 rounded"
              >
                <Checkbox
                  id={`q${index}-opt${optionIndex}`}
                  checked={(responses[index] || []).includes(option)}
                  onCheckedChange={(checked) =>
                    handleCheckboxChange(index, option, checked)
                  }
                />
                <Label
                  htmlFor={`q${index}-opt${optionIndex}`}
                  className="cursor-pointer"
                >
                  {option}
                </Label>
              </div>
            ))}
          </div>
        )}

        {question.type === "rating" && (
          <Input
            type="range"
            min="1"
            max="5"
            value={responses[index] || "3"}
            onChange={(e) => handleResponseChange(index, e.target.value)}
            className="bg-white/5 border-white/10"
          />
        )}

        {question.type === "date" && (
          <Input
            type="date"
            value={responses[index] || ""}
            onChange={(e) => handleResponseChange(index, e.target.value)}
            className="bg-white/5 border-white/10"
          />
        )}

        {question.type === "time" && (
          <Input
            type="time"
            value={responses[index] || ""}
            onChange={(e) => handleResponseChange(index, e.target.value)}
            className="bg-white/5 border-white/10"
          />
        )}
      </div>
    );
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-lime-400 bg-clip-text text-transparent">
          Survey Questions
        </h2>

        {survey.questions.map((question, index) =>
          renderQuestion(question, index)
        )}

        {!isCreator && (
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-emerald-500 to-lime-500 hover:from-emerald-600 hover:to-lime-600 text-white"
          >
            <Send className="w-4 h-4 mr-2" />
            {isSubmitting ? "Submitting..." : "Submit Survey Response"}
          </Button>
        )}
      </form>

      <RespondentTermsDialog
        open={showTermsDialog}
        onAccept={handleTermsAccepted}
        onCancel={handleTermsCancelled}
      />
    </>
  );
}
