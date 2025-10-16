import {
 Card,
 CardDescription,
 CardHeader,
 CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function DashboardSurveyHeader({ survey = {} }) {
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
     <Badge
      variant={survey.finalized ? "secondary" : "default"}
      className="text-base py-2 px-4"
     >
      {survey.finalized ? "Finalized" : "Active"}
     </Badge>
    </div>
   </CardHeader>
  </Card>
 );
}
