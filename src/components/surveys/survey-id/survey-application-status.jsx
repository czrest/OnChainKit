import { Card, CardContent } from "@/components/ui/card";
import { Users, CheckCircle2, Clock } from "lucide-react";

export default function SurveyApplicationStatus({
 applicationStatus = "",
 hasAccess,
}) {
 return (
  <Card className="mb-6">
   <CardContent className="pt-6">
    <div className="text-center">
     {applicationStatus === "pending" && (
      <>
       <Clock className="h-12 w-12 text-primary mx-auto mb-4" />
       <h3 className="text-xl font-semibold mb-2">Application Pending</h3>
       <p className="text-muted-foreground">
        Your application is under review. You'll be notified of the decision.
       </p>
      </>
     )}
     {applicationStatus === "accepted" && !hasAccess && (
      <>
       <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto mb-4" />
       <h3 className="text-xl font-semibold mb-2">Application Accepted!</h3>
       <p className="text-muted-foreground">
        Congratulations! The survey will be available once the creator opens it.
       </p>
      </>
     )}
     {applicationStatus === "rejected" && (
      <>
       <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
        <Users className="h-6 w-6 text-muted-foreground" />
       </div>
       <h3 className="text-xl font-semibold mb-2">Application Not Selected</h3>
       <p className="text-muted-foreground">
        Thank you for your interest. Unfortunately, you were not selected for
        this survey.
       </p>
      </>
     )}
    </div>
   </CardContent>
  </Card>
 );
}
