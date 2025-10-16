import { motion } from "framer-motion";

export default function DashboardTitle() {
 return (
  <motion.div
   initial={{ opacity: 0, y: 20 }}
   animate={{ opacity: 1, y: 0 }}
   transition={{ duration: 0.5 }}
   className="mb-8"
  >
   <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
   <p className="text-muted-foreground text-lg">
    Track your created surveys and earned rewards
   </p>
  </motion.div>
 );
}
