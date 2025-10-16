import { Card, CardContent } from "@/components/ui/card";
import { Clock } from "lucide-react";

export default function SurveyNoAccessMessage() {
 return (
  <Card className="mb-6">
   <CardContent className="pt-12 pb-12 text-center">
    <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
    <h3 className="text-xl font-semibold mb-2">Applications Closed</h3>
    <p className="text-muted-foreground">
     The screening period for this survey has ended.
    </p>
   </CardContent>
  </Card>
 );
}
