import { SurveyCard } from "@/components/survey-card";
import { motion } from "framer-motion";

export default function SurveyGrid({
 filteredSurveys = [],
 searchQuery = "",
 filterStatus = "",
}) {
 return (
  <>
   {filteredSurveys.length > 0 ? (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
     {filteredSurveys.map((survey, index) => (
      <motion.div
       key={survey.id}
       initial={{ opacity: 0, scale: 0.9 }}
       animate={{ opacity: 1, scale: 1 }}
       transition={{ delay: index * 0.05, duration: 0.3 }}
      >
       <SurveyCard survey={survey} />
      </motion.div>
     ))}
    </div>
   ) : (
    <motion.div
     initial={{ opacity: 0 }}
     animate={{ opacity: 1 }}
     transition={{ delay: 0.3 }}
     className="text-center py-20"
    >
     <p className="text-muted-foreground text-lg mb-4">
      {searchQuery || filterStatus !== "all"
       ? "No surveys found matching your criteria"
       : "No surveys available yet"}
     </p>
     <p className="text-sm text-muted-foreground">
      Be the first to create a survey!
     </p>
    </motion.div>
   )}
  </>
 );
}
