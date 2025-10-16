"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function SurveyCreatorActions({
 handleFinalizeSurvey,
 rewardPerResponse,
 survey,
 isFinalizing,
}) {
 return (
  <Card className="mt-6">
   <CardContent className="pt-6">
    <div className="flex items-center justify-between">
     <div>
      <h4 className="font-semibold mb-1">Ready to finalize?</h4>
      <p className="text-sm text-muted-foreground">
       Distribute {rewardPerResponse} ETH to each of the{" "}
       {survey.responses.length} respondents
      </p>
     </div>
     <Button onClick={handleFinalizeSurvey} disabled={isFinalizing}>
      {isFinalizing ? "Finalizing..." : "Finalize & Distribute Rewards"}
     </Button>
    </div>
   </CardContent>
  </Card>
 );
}
