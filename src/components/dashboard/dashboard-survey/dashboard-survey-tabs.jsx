"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle2, XCircle } from "lucide-react";
import { motion } from "framer-motion";
import DashboardTabsEmptyCard from "../dashboard-tabs-empty-card";

export default function DashboardSurveyTabs({
 pendingApplicants = [],
 acceptedApplicants = [],
 rejectedApplicants = [],
 handleAccept,
 handleReject,
 loading,
}) {
 return (
  <Tabs defaultValue="pending" className="w-full">
   <TabsList className="w-full md:w-auto">
    <TabsTrigger value="pending" className="flex-1 md:flex-none">
     Pending ({pendingApplicants.length})
    </TabsTrigger>
    <TabsTrigger value="accepted" className="flex-1 md:flex-none">
     Accepted ({acceptedApplicants.length})
    </TabsTrigger>
    <TabsTrigger value="rejected" className="flex-1 md:flex-none">
     Rejected ({rejectedApplicants.length})
    </TabsTrigger>
   </TabsList>

   <TabsContent value="pending" className="mt-6">
    {pendingApplicants.length > 0 ? (
     <div className="space-y-4">
      {pendingApplicants.map((applicant, index) => (
       <motion.div
        key={applicant.address}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05 }}
       >
        <Card>
         <CardContent className="pt-6">
          <div className="flex items-center justify-between gap-4">
           <div className="flex-1">
            <p className="font-mono text-sm mb-2">
             {applicant.address.slice(0, 6)}...
             {applicant.address.slice(-4)}
            </p>
            {applicant.message && (
             <p className="text-sm text-muted-foreground mb-2">
              {applicant.message}
             </p>
            )}
            {applicant.selectedSlot && (
             <p className="text-sm text-muted-foreground">
              Preferred slot: {applicant.selectedSlot}
             </p>
            )}
            <p className="text-xs text-muted-foreground mt-2">
             Applied: {new Date(applicant.appliedAt).toLocaleString()}
            </p>
           </div>
           <div className="flex gap-2">
            <Button
             onClick={() => handleAccept(applicant.address)}
             disabled={loading}
             size="sm"
             variant="default"
            >
             <CheckCircle2 className="h-4 w-4 mr-1" />
             Accept
            </Button>
            <Button
             onClick={() => handleReject(applicant.address)}
             disabled={loading}
             size="sm"
             variant="outline"
            >
             <XCircle className="h-4 w-4 mr-1" />
             Reject
            </Button>
           </div>
          </div>
         </CardContent>
        </Card>
       </motion.div>
      ))}
     </div>
    ) : (
     <DashboardTabsEmptyCard message="No pending applications" />
    )}
   </TabsContent>

   <TabsContent value="accepted" className="mt-6">
    {acceptedApplicants.length > 0 ? (
     <div className="space-y-4">
      {acceptedApplicants.map((applicant, index) => (
       <motion.div
        key={applicant.address}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05 }}
       >
        <Card>
         <CardContent className="pt-6">
          <div className="flex items-center justify-between gap-4">
           <div className="flex-1">
            <p className="font-mono text-sm mb-2">
             {applicant.address.slice(0, 6)}...
             {applicant.address.slice(-4)}
            </p>
            {applicant.message && (
             <p className="text-sm text-muted-foreground mb-2">
              {applicant.message}
             </p>
            )}
            <p className="text-xs text-muted-foreground mt-2">
             Accepted: {new Date(applicant.appliedAt).toLocaleString()}
            </p>
           </div>
           <Badge variant="default" className="bg-green-500">
            <CheckCircle2 className="h-3 w-3 mr-1" />
            Accepted
           </Badge>
          </div>
         </CardContent>
        </Card>
       </motion.div>
      ))}
     </div>
    ) : (
     <DashboardTabsEmptyCard message="No accepted applicants yet" />
    )}
   </TabsContent>

   <TabsContent value="rejected" className="mt-6">
    {rejectedApplicants.length > 0 ? (
     <div className="space-y-4">
      {rejectedApplicants.map((applicant, index) => (
       <motion.div
        key={applicant.address}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05 }}
       >
        <Card>
         <CardContent className="pt-6">
          <div className="flex items-center justify-between gap-4">
           <div className="flex-1">
            <p className="font-mono text-sm mb-2">
             {applicant.address.slice(0, 6)}...
             {applicant.address.slice(-4)}
            </p>
            <p className="text-xs text-muted-foreground mt-2">
             Applied: {new Date(applicant.appliedAt).toLocaleString()}
            </p>
           </div>
           <Badge variant="destructive">
            <XCircle className="h-3 w-3 mr-1" />
            Rejected
           </Badge>
          </div>
         </CardContent>
        </Card>
       </motion.div>
      ))}
     </div>
    ) : (
     <DashboardTabsEmptyCard message="No rejected applicants" />
    )}
   </TabsContent>
  </Tabs>
 );
}
