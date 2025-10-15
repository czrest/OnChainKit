"use client";

import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAccount } from "wagmi";
import { motion } from "framer-motion";
import {
 Card,
 CardContent,
 CardDescription,
 CardHeader,
 CardTitle,
} from "@/components/ui/card";
import { surveySchema } from "@/lib/schema/survey-schema";
import SurveyForm from "@/components/create/SurveyForm";

export default function CreateSurveyPage() {
 const { address } = useAccount();

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
   console.log(values);
   toast.success("Survey created successfully!");
  } catch (error) {
   console.error("Error creating survey:", error);
   toast.error("Failed to create survey");
  }
 };

 return (
  <>
   <main className="min-h-screen bg-gradient-to-b from-background to-muted/20 py-12">
    <div className="container mx-auto px-4 max-w-3xl">
     <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
     >
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
     </motion.div>
    </div>
   </main>
  </>
 );
}
