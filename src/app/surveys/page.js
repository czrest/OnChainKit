"use client";

import { useEffect, useState } from "react";
import { PageTransition } from "@/components/page-transition";
import { Navbar } from "@/components/navbar";
import { SurveyCard } from "@/components/survey-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Filter } from "lucide-react";
import { getAllSurveys } from "@/lib/survey-contract";
import { motion } from "framer-motion";

export default function SurveysPage() {
  const [surveys, setSurveys] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    const loadSurveys = () => {
      const allSurveys = getAllSurveys();
      setSurveys(allSurveys);
    };

    loadSurveys();
    const interval = setInterval(loadSurveys, 2000);
    return () => clearInterval(interval);
  }, []);

  const filteredSurveys = surveys.filter((survey) => {
    const matchesSearch =
      survey.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      survey.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter =
      filterStatus === "all" ||
      (filterStatus === "active" && !survey.finalized) ||
      (filterStatus === "finalized" && survey.finalized);

    return matchesSearch && matchesFilter;
  });

  const activeSurveys = surveys.filter((s) => !s.finalized).length;
  const finalizedSurveys = surveys.filter((s) => s.finalized).length;

  return (
    <>
      <Navbar />
      <PageTransition>
        <main className="min-h-screen bg-gradient-to-b from-background to-muted/20 py-12">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <h1 className="text-4xl font-bold mb-2">Browse Surveys</h1>
              <p className="text-muted-foreground text-lg">
                Participate in surveys and earn ETH rewards
              </p>
            </motion.div>

            {/* Stats */}
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

            {/* Search and Filter */}
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

            {/* Survey Grid */}
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
          </div>
        </main>
      </PageTransition>
    </>
  );
}
