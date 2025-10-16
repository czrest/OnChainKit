"use client";

import { useEffect, useState } from "react";
import { getAllSurveys } from "@/lib/survey-contract";

import SurveyHeader from "@/components/surveys/survey-header";
import SurveyStats from "@/components/surveys/survey-stats";
import SurveySearchAndFilter from "@/components/surveys/survey-search-and-filter";
import SurveyGrid from "@/components/surveys/survey-grid";

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
   <div className="container mx-auto px-4">
    {/* survey header */}
    <SurveyHeader />

    {/* Stats */}
    <SurveyStats
     surveys={surveys}
     activeSurveys={activeSurveys}
     finalizedSurveys={finalizedSurveys}
    />

    {/* Search and Filter */}
    <SurveySearchAndFilter
     searchQuery={searchQuery}
     filterStatus={filterStatus}
     setSearchQuery={setSearchQuery}
     setFilterStatus={setFilterStatus}
    />

    {/* Survey Grid */}
    <SurveyGrid
     filteredSurveys={filteredSurveys}
     searchQuery={searchQuery}
     filterStatus={filterStatus}
    />
   </div>
  </>
 );
}
