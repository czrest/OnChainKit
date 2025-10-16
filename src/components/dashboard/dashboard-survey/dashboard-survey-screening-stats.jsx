"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function DashboardSurveyScreeningStats({
 survey = {},
 isScreeningOpen,
 deadline,
 handleOpenEarly,
 loading,
}) {
 return (
  <Card className="mb-6">
   <CardContent className="pt-6">
    <div className="flex items-center justify-between">
     <div>
      <h4 className="font-semibold mb-1">Screening Status</h4>
      <p className="text-sm text-muted-foreground">
       {isScreeningOpen
        ? "Accepting applications until "
        : "Application deadline: "}
       {new Date(deadline).toLocaleString()}
      </p>
     </div>
     {!survey.openedEarly &&
      acceptedApplicants.length > 0 &&
      !survey.finalized && (
       <Button onClick={handleOpenEarly} disabled={loading}>
        Open Survey Early
       </Button>
      )}
    </div>
   </CardContent>
  </Card>
 );
}
