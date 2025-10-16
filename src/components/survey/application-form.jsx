"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { applyForScreening } from "@/lib/survey-contract";
import { Send } from "lucide-react";

export default function ApplicationForm({ survey, userAddress, onSuccess }) {
  const [message, setMessage] = useState("");
  const [preferredSlot, setPreferredSlot] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await applyForScreening(survey.id, userAddress, message, preferredSlot);
      onSuccess();
    } catch (error) {
      console.error("Application error:", error);
      alert("Failed to submit application. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 p-6 bg-gradient-to-br from-white/5 to-white/10 rounded-lg border border-white/10"
    >
      <h2 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-lime-400 bg-clip-text text-transparent">
        Apply for Screening
      </h2>

      <div>
        <Label htmlFor="message">Application Message (Optional)</Label>
        <Textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Tell the survey creator why you'd be a great respondent..."
          className="bg-white/5 border-white/10 mt-2 min-h-[100px]"
        />
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-gradient-to-r from-emerald-500 to-lime-500 hover:from-emerald-600 hover:to-lime-600 text-white"
      >
        <Send className="w-4 h-4 mr-2" />
        {isSubmitting ? "Submitting..." : "Submit Application"}
      </Button>
    </form>
  );
}
