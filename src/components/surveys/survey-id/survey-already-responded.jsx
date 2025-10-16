import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

export default function SurveyAlreadyResponded({ rewardPerResponse }) {
 return (
  <Card>
   <CardContent className="pt-12 pb-12 text-center">
    <CheckCircle2 className="h-16 w-16 text-primary mx-auto mb-4" />
    <h3 className="text-2xl font-semibold mb-2">Response Submitted!</h3>
    <p className="text-muted-foreground mb-4">
     Thank you for participating. You will receive your reward when the survey
     is finalized.
    </p>
    <Badge variant="secondary" className="text-base py-2 px-4">
     Expected reward: {rewardPerResponse} ETH
    </Badge>
   </CardContent>
  </Card>
 );
}
