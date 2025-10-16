"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";
import { motion } from "framer-motion";

export default function SurveySearchAndFilter({
 searchQuery = "",
 setSearchQuery,
 filterStatus = "",
 setFilterStatus,
}) {
 return (
  <motion.div
   initial={{ opacity: 0, y: 20 }}
   animate={{ opacity: 1, y: 0 }}
   transition={{ delay: 0.2, duration: 0.5 }}
   className="flex flex-col md:flex-row gap-4 mb-8"
  >
   <div className="relative flex-1">
    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
    <Input
     placeholder="Search surveys..."
     value={searchQuery}
     onChange={(e) => setSearchQuery(e.target.value)}
     className="pl-10"
    />
   </div>

   <div className="flex gap-2">
    <Button
     variant={filterStatus === "all" ? "default" : "outline"}
     onClick={() => setFilterStatus("all")}
    >
     <Filter className="h-4 w-4 mr-2" />
     All
    </Button>
    <Button
     variant={filterStatus === "active" ? "default" : "outline"}
     onClick={() => setFilterStatus("active")}
    >
     Active
    </Button>
    <Button
     variant={filterStatus === "finalized" ? "default" : "outline"}
     onClick={() => setFilterStatus("finalized")}
    >
     Finalized
    </Button>
   </div>
  </motion.div>
 );
}
