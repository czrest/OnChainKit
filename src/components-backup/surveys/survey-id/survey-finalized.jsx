import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

export default function SurveyFinalized({ survey, rewardPerResponse }) {
 return (
  <Card>
   <CardContent className="pt-12 pb-12 text-center">
    <CheckCircle2 className="h-16 w-16 text-primary mx-auto mb-4" />
    <h3 className="text-2xl font-semibold mb-2">Survey Finalized</h3>
    <p className="text-muted-foreground mb-4">
     This survey has been closed and rewards have been distributed.
    </p>
    <div className="flex gap-4 justify-center">
     <Badge variant="secondary" className="text-base py-2 px-4">
      Total Responses: {survey.responses.length}
     </Badge>
     <Badge variant="secondary" className="text-base py-2 px-4">
      Reward per Response: {rewardPerResponse} ETH
     </Badge>
    </div>
   </CardContent>
  </Card>
 );
}
