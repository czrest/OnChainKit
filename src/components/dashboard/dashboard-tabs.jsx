import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SurveyCard } from "@/components/survey-card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Users, Clock } from "lucide-react";
import Link from "next/link";
import DashboardTabsEmptyCard from "./dashboard-tabs-empty-card";

export default function DashboardTabs({
 totalCreated = 0,
 answeredSurveys = [],
 appliedSurveys = [],
 createdSurveys = [],
}) {
 return (
  <motion.div
   initial={{ opacity: 0, y: 20 }}
   animate={{ opacity: 1, y: 0 }}
   transition={{ delay: 0.2, duration: 0.5 }}
  >
   <Tabs defaultValue="created" className="w-full">
    <TabsList className="w-full md:w-auto">
     <TabsTrigger value="created" className="flex-1 md:flex-none">
      Created ({totalCreated})
     </TabsTrigger>
     <TabsTrigger value="answered" className="flex-1 md:flex-none">
      Answered ({answeredSurveys.length})
     </TabsTrigger>
     <TabsTrigger value="applications" className="flex-1 md:flex-none">
      Applications ({appliedSurveys.length})
     </TabsTrigger>
    </TabsList>

    {/* created survey */}
    <TabsContent value="created" className="mt-6">
     {createdSurveys.length > 0 ? (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
       {createdSurveys.map((survey, index) => (
        <motion.div
         key={survey.id}
         initial={{ opacity: 0, scale: 0.9 }}
         animate={{ opacity: 1, scale: 1 }}
         transition={{ delay: index * 0.05, duration: 0.3 }}
        >
         <div className="relative">
          <SurveyCard survey={survey} />
          {survey.respondentType === "targeted" && (
           <Link href={`/dashboard/surveys/${survey.id}`}>
            <Button
             variant="outline"
             size="sm"
             className="absolute top-16 right-4 z-20"
            >
             <Users className="h-3 w-3 mr-1" />
             Manage ({survey.applicants.length})
            </Button>
           </Link>
          )}
         </div>
        </motion.div>
       ))}
      </div>
     ) : (
      <DashboardTabsEmptyCard message="You haven't created any surveys yet" />
     )}
    </TabsContent>

    {/* answered survey */}
    <TabsContent value="answered" className="mt-6">
     {answeredSurveys.length > 0 ? (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
       {answeredSurveys.map((survey, index) => (
        <motion.div
         key={survey.id}
         initial={{ opacity: 0, scale: 0.9 }}
         animate={{ opacity: 1, scale: 1 }}
         transition={{ delay: index * 0.05, duration: 0.3 }}
        >
         <div className="relative">
          <SurveyCard survey={survey} />
          {survey.finalized && (
           <Badge variant="default" className="absolute top-4 right-4">
            Reward Received
           </Badge>
          )}
         </div>
        </motion.div>
       ))}
      </div>
     ) : (
      <DashboardTabsEmptyCard message="You haven't answered any surveys yet" />
     )}
    </TabsContent>

    {/* applied surveys */}
    <TabsContent value="applications" className="mt-6">
     {appliedSurveys.length > 0 ? (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
       {appliedSurveys.map((survey, index) => {
        const applicant = survey.applicants.find(
         (a) => a.address.toLowerCase() === address?.toLowerCase()
        );
        return (
         <motion.div
          key={survey.id}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.05, duration: 0.3 }}
         >
          <div className="relative">
           <SurveyCard survey={survey} />
           <Badge
            variant={
             applicant?.status === "accepted"
              ? "default"
              : applicant?.status === "rejected"
              ? "destructive"
              : "secondary"
            }
            className="absolute top-4 right-4 z-20"
           >
            {applicant?.status === "accepted" && "Accepted"}
            {applicant?.status === "rejected" && "Rejected"}
            {applicant?.status === "pending" && (
             <>
              <Clock className="h-3 w-3 mr-1" />
              Pending
             </>
            )}
           </Badge>
          </div>
         </motion.div>
        );
       })}
      </div>
     ) : (
      <DashboardTabsEmptyCard message="You haven't applied to any targeted surveys yet" />
     )}
    </TabsContent>
   </Tabs>
  </motion.div>
 );
}
