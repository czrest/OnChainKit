import {
 Card,
 CardContent,
 CardDescription,
 CardHeader,
 CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/status-badge";
import { Users, Coins, Calendar } from "lucide-react";
import Link from "next/link";

export default function SurveyCard({ survey, rewardPerResponse, isCreator }) {
 return (
  <Card className="mb-6">
   <CardHeader>
    <div className="flex items-start justify-between gap-4">
     <div>
      <CardTitle className="text-3xl mb-2">{survey.title}</CardTitle>
      <CardDescription className="text-base">
       {survey.description}
      </CardDescription>
     </div>
     <StatusBadge survey={survey} />
    </div>
   </CardHeader>
   <CardContent>
    <div className="grid md:grid-cols-3 gap-4">
     <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
       <Coins className="h-5 w-5 text-primary" />
      </div>
      <div>
       <p className="text-sm text-muted-foreground">Total Reward</p>
       <p className="font-semibold">{survey.reward} ETH</p>
      </div>
     </div>
     <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
       <Users className="h-5 w-5 text-primary" />
      </div>
      <div>
       <p className="text-sm text-muted-foreground">
        {survey.respondentType === "targeted" ? "Target" : "Responses"}
       </p>
       <p className="font-semibold">
        {survey.responses.length}
        {survey.respondentType === "targeted" &&
         survey.numberOfRespondents &&
         ` / ${survey.numberOfRespondents}`}
       </p>
      </div>
     </div>
     <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
       <Calendar className="h-5 w-5 text-primary" />
      </div>
      <div>
       <p className="text-sm text-muted-foreground">Created</p>
       <p className="font-semibold">
        {new Date(survey.createdAt).toLocaleDateString()}
       </p>
      </div>
     </div>
    </div>

    {!survey.finalized && survey.responses.length > 0 && (
     <div className="mt-4 p-4 bg-muted rounded-lg">
      <p className="text-sm">
       Current reward per response:{" "}
       <span className="font-semibold">{rewardPerResponse} ETH</span>
      </p>
     </div>
    )}

    {/* Creator Management Link */}
    {isCreator && survey.respondentType === "targeted" && (
     <div className="mt-4">
      <Link href={`/dashboard/surveys/${survey.id}`}>
       <Button variant="outline" className="w-full">
        <Users className="h-4 w-4 mr-2" />
        Manage Applicants ({survey.applicants.length})
       </Button>
      </Link>
     </div>
    )}
   </CardContent>
  </Card>
 );
}
