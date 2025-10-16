"use client";

import {
 Card,
 CardContent,
 CardDescription,
 CardHeader,
 CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Clock, ExternalLink } from "lucide-react";

export default function SurveyScreeningApplication({
 survey,
 selectedSlot,
 setSelectedSlot,
 deadline,
 handleApplyForScreening,
 isApplying,
 address,
}) {
 return (
  <Card className="mb-6">
   <CardHeader>
    <CardTitle className="flex items-center gap-2">
     <Clock className="h-5 w-5" />
     Apply for Screening
    </CardTitle>
    <CardDescription>
     This is a targeted survey. Submit your application to be considered.
    </CardDescription>
   </CardHeader>
   <CardContent className="space-y-4">
    {survey.screeningInfo && (
     <>
      {survey.screeningInfo.description && (
       <div>
        <Label>Screening Process</Label>
        <p className="text-sm text-muted-foreground mt-1">
         {survey.screeningInfo.description}
        </p>
       </div>
      )}

      {survey.screeningInfo.requirements && (
       <div>
        <Label>Requirements</Label>
        <p className="text-sm text-muted-foreground mt-1">
         {survey.screeningInfo.requirements}
        </p>
       </div>
      )}

      {survey.screeningInfo.dateTime &&
       !survey.screeningInfo.flexibleScheduling && (
        <div>
         <Label>Screening Date & Time</Label>
         <p className="text-sm text-muted-foreground mt-1">
          {new Date(survey.screeningInfo.dateTime).toLocaleString()}
         </p>
        </div>
       )}

      {survey.screeningInfo.meetingLink && (
       <div>
        <Label>Meeting Link</Label>
        <a
         href={survey.screeningInfo.meetingLink}
         target="_blank"
         rel="noopener noreferrer"
         className="text-sm text-primary hover:underline flex items-center gap-1 mt-1"
        >
         {survey.screeningInfo.meetingLink}
         <ExternalLink className="h-3 w-3" />
        </a>
       </div>
      )}

      {survey.screeningInfo.location && (
       <div>
        <Label>Location</Label>
        <p className="text-sm text-muted-foreground mt-1">
         {survey.screeningInfo.location}
        </p>
       </div>
      )}
     </>
    )}

    <div>
     <Label htmlFor="applicationMessage">Application Message (optional)</Label>
     <Textarea
      id="applicationMessage"
      value={applicationMessage}
      onChange={(e) => setApplicationMessage(e.target.value)}
      placeholder="Tell us why you'd be a great fit..."
      rows={3}
     />
    </div>

    {survey.screeningInfo?.flexibleScheduling && (
     <div>
      <Label htmlFor="selectedSlot">Preferred Time Slot</Label>
      <Input
       id="selectedSlot"
       type="datetime-local"
       value={selectedSlot}
       onChange={(e) => setSelectedSlot(e.target.value)}
      />
     </div>
    )}

    <div className="flex items-center gap-2 text-sm text-muted-foreground">
     <Clock className="h-4 w-4" />
     <span>Application deadline: {new Date(deadline).toLocaleString()}</span>
    </div>

    <Button
     onClick={handleApplyForScreening}
     disabled={isApplying || !address}
     className="w-full"
    >
     {isApplying ? "Submitting..." : "Submit Application"}
    </Button>
   </CardContent>
  </Card>
 );
}
