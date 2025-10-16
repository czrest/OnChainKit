"use client";

import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAccount } from "wagmi";
import {
 Card,
 CardContent,
 CardDescription,
 CardHeader,
 CardTitle,
} from "@/components/ui/card";
import { surveySchema } from "@/lib/schema/survey-schema";
import SurveyForm from "@/components/create/SurveyForm";
import { useRouter } from "next/navigation";
import { createSurvey } from "@/lib/survey-contract";

export default function CreateSurveyPage() {
 const { address } = useAccount();
 const router = useRouter();

 const form = useForm({
  resolver: zodResolver(surveySchema),
  defaultValues: {
   title: "",
   description: "",
   reward: "",
   numberOfRespondents: "",
   screeningDescription: "",
   screeningRequirements: "",
   screeningDateTime: new Date(),
   meetingLink: "",
   location: "",
   screeningDeadline: new Date(),
   surveyFinalizeDate: new Date(),
   questions: [{ id: "1", text: "", type: "short-answer", required: true }],
  },
 });

 const onSubmit = async (values) => {
  if (!address) {
   toast.error("Please connect your wallet first");
   return;
  }

  try {
   const screeningInfo = {
    description: values.screeningDescription,
    requirements: values.screeningRequirements,
    dateTime: values.screeningDateTime,
    meetingLink: values.meetingLink || undefined,
    location: values.location || undefined,
    flexibleScheduling: values.flexibleScheduling,
    deadline: values.screeningDeadline,
   };

   const survey = await createSurvey(
    values.title,
    values.description,
    values.questions,
    values.reward,
    address,
    "targeted",
    parseInt(values.numberOfRespondents),
    screeningInfo
   );

   toast.success("Survey created successfully!");
   router.push(`/surveys/${survey.id}`);
  } catch (error) {
   console.error("Error creating survey:", error);
   toast.error("Failed to create survey");
  }
 };

 return (
  <Card>
   <CardHeader>
    <CardTitle className="text-3xl">Create New Survey</CardTitle>
    <CardDescription>
     Create a survey and deposit ETH to reward respondents
    </CardDescription>
   </CardHeader>
   <CardContent>
    {/* survey form */}
    <SurveyForm form={form} onSubmit={onSubmit} />
   </CardContent>
  </Card>
 );
}
