import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

export default function SurveyStats({
 surveys = [],
 activeSurveys = 0,
 finalizedSurveys = 0,
}) {
 return (
  <motion.div
   initial={{ opacity: 0, y: 20 }}
   animate={{ opacity: 1, y: 0 }}
   transition={{ delay: 0.1, duration: 0.5 }}
   className="flex gap-4 mb-8"
  >
   <Badge variant="secondary" className="text-base py-2 px-4">
    Total: {surveys.length}
   </Badge>
   <Badge variant="default" className="text-base py-2 px-4">
    Active: {activeSurveys}
   </Badge>
   <Badge variant="outline" className="text-base py-2 px-4">
    Finalized: {finalizedSurveys}
   </Badge>
  </motion.div>
 );
}
