"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { User, Calendar, CheckCircle2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function SurveyResponsesViewer({ survey }) {
  if (!survey.finalized) {
    return (
      <Card className="border-white/10 bg-gradient-to-br from-white/5 to-white/10">
        <CardContent className="pt-12 pb-12 text-center">
          <p className="text-gray-400">
            Survey responses will be visible once the survey is finalized.
          </p>
        </CardContent>
      </Card>
    );
  }

  if (survey.responses.length === 0) {
    return (
      <Card className="border-white/10 bg-gradient-to-br from-white/5 to-white/10">
        <CardContent className="pt-12 pb-12 text-center">
          <p className="text-gray-400">
            No responses received for this survey.
          </p>
        </CardContent>
      </Card>
    );
  }

  const getQuestionText = (questionId) => {
    const question = survey.questions.find((q) => q.id === questionId);
    return question ? question.text : "Unknown Question";
  };

  const getQuestionType = (questionId) => {
    const question = survey.questions.find((q) => q.id === questionId);
    return question ? question.type : "unknown";
  };

  const formatAnswerValue = (value) => {
    if (Array.isArray(value)) {
      return value.join(", ");
    }
    return String(value);
  };

  return (
    <Card className="border-white/10 bg-gradient-to-br from-white/5 to-white/10">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CheckCircle2 className="h-5 w-5 text-emerald-400" />
          Survey Responses ({survey.responses.length})
        </CardTitle>
        <CardDescription>
          View all responses collected from participants
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="by-respondent" className="w-full">
          <TabsList className="w-full md:w-auto">
            <TabsTrigger value="by-respondent" className="flex-1 md:flex-none">
              By Respondent
            </TabsTrigger>
            <TabsTrigger value="by-question" className="flex-1 md:flex-none">
              By Question
            </TabsTrigger>
          </TabsList>

          {/* Responses grouped by respondent */}
          <TabsContent value="by-respondent" className="mt-6">
            <ScrollArea className="h-[600px] pr-4">
              <div className="space-y-6">
                {survey.responses.map((response, responseIndex) => (
                  <div
                    key={response.id}
                    className="p-6 bg-gradient-to-br from-white/5 to-white/10 rounded-lg border border-white/10"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <User className="h-4 w-4 text-emerald-400" />
                          <p className="font-mono text-sm">
                            {response.responder.slice(0, 6)}...
                            {response.responder.slice(-4)}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-400">
                          <Calendar className="h-3 w-3" />
                          {new Date(response.timestamp).toLocaleString()}
                        </div>
                      </div>
                      <Badge variant="secondary">
                        Response #{responseIndex + 1}
                      </Badge>
                    </div>

                    <Separator className="my-4 bg-white/10" />

                    <div className="space-y-4">
                      {response.answers.map((answer, answerIndex) => (
                        <div key={answerIndex} className="space-y-2">
                          <p className="text-sm font-medium text-gray-300">
                            {answerIndex + 1}.{" "}
                            {getQuestionText(answer.questionId)}
                          </p>
                          <div className="pl-4 p-3 bg-white/5 rounded border border-white/5">
                            <p className="text-sm text-gray-400">
                              {formatAnswerValue(answer.value)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          {/* Responses grouped by question */}
          <TabsContent value="by-question" className="mt-6">
            <ScrollArea className="h-[600px] pr-4">
              <div className="space-y-6">
                {survey.questions.map((question, questionIndex) => {
                  const answersForQuestion = survey.responses.map(
                    (response) => {
                      const answer = response.answers.find(
                        (a) => a.questionId === question.id
                      );
                      return {
                        responder: response.responder,
                        timestamp: response.timestamp,
                        value: answer ? answer.value : "No answer provided",
                      };
                    }
                  );

                  return (
                    <div
                      key={question.id}
                      className="p-6 bg-gradient-to-br from-white/5 to-white/10 rounded-lg border border-white/10"
                    >
                      <div className="mb-4">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-semibold text-lg">
                            {questionIndex + 1}. {question.text}
                          </h3>
                          <Badge variant="outline" className="text-xs">
                            {question.type}
                          </Badge>
                        </div>
                        <p className="text-xs text-gray-400">
                          {answersForQuestion.length} response(s)
                        </p>
                      </div>

                      <Separator className="my-4 bg-white/10" />

                      <div className="space-y-3">
                        {answersForQuestion.map((answer, answerIndex) => (
                          <div
                            key={answerIndex}
                            className="p-4 bg-white/5 rounded border border-white/5"
                          >
                            <div className="flex items-center gap-2 mb-2">
                              <User className="h-3 w-3 text-emerald-400" />
                              <p className="font-mono text-xs text-gray-400">
                                {answer.responder.slice(0, 6)}...
                                {answer.responder.slice(-4)}
                              </p>
                              <span className="text-xs text-gray-500">•</span>
                              <p className="text-xs text-gray-500">
                                {new Date(answer.timestamp).toLocaleString()}
                              </p>
                            </div>
                            <p className="text-sm text-gray-300">
                              {formatAnswerValue(answer.value)}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
