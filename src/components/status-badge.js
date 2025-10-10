"use client";

import { Badge } from "@/components/ui/badge";
import { Clock, CheckCircle2, XCircle, Users, Sparkles } from "lucide-react";

export function StatusBadge({ survey }) {
  if (survey.finalized) {
    return (
      <Badge variant="secondary" className="gap-1">
        <CheckCircle2 className="h-3 w-3" />
        Closed
      </Badge>
    );
  }

  if (survey.respondentType === "targeted") {
    const deadline = survey.screeningInfo?.deadline
      ? new Date(survey.screeningInfo.deadline).getTime()
      : 0;
    const now = Date.now();
    const isScreeningOpen = deadline > now;

    if (isScreeningOpen) {
      return (
        <Badge
          variant="default"
          className="gap-1 bg-gradient-to-r from-emerald-500 to-lime-500 text-white border-0"
        >
          <Clock className="h-3 w-3" />
          Screening
        </Badge>
      );
    }

    if (
      survey.openedEarly ||
      survey.acceptedRespondents.length >= (survey.numberOfRespondents || 0)
    ) {
      return (
        <Badge
          variant="default"
          className="gap-1 bg-gradient-to-r from-emerald-600 to-lime-600 text-white border-0"
        >
          <Sparkles className="h-3 w-3" />
          Live
        </Badge>
      );
    }

    return (
      <Badge variant="outline" className="gap-1">
        <Users className="h-3 w-3" />
        Reviewing
      </Badge>
    );
  }

  return (
    <Badge variant="default" className="gap-1">
      <Sparkles className="h-3 w-3" />
      Active
    </Badge>
  );
}
