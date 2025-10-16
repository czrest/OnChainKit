import {
 Card,
 CardContent,
 CardDescription,
 CardHeader,
 CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { motion } from "framer-motion";

export default function SurveyQuestions({
 survey,
 answers,
 handleAnswerChange,
 handleCheckboxChange,
 handleSubmitResponse,
 isSubmitting,
}) {
 return (
  <Card>
   <CardHeader>
    <CardTitle>Survey Questions</CardTitle>
    <CardDescription>
     Answer all questions to submit your response
    </CardDescription>
   </CardHeader>
   <CardContent className="space-y-6">
    {survey.questions.map((question, index) => (
     <motion.div
      key={question.id}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className="space-y-3"
     >
      <Label className="text-base font-semibold">
       {index + 1}. {question.text}
      </Label>

      {question.type === "short-answer" && (
       <Input
        value={answers[question.id] || ""}
        onChange={(e) => handleAnswerChange(question.id, e.target.value)}
        placeholder="Your answer"
       />
      )}

      {question.type === "long-answer" && (
       <Textarea
        value={answers[question.id] || ""}
        onChange={(e) => handleAnswerChange(question.id, e.target.value)}
        placeholder="Your answer"
        rows={4}
       />
      )}

      {question.type === "date" && (
       <Input
        type="date"
        value={answers[question.id] || ""}
        onChange={(e) => handleAnswerChange(question.id, e.target.value)}
       />
      )}

      {question.type === "time" && (
       <Input
        type="time"
        value={answers[question.id] || ""}
        onChange={(e) => handleAnswerChange(question.id, e.target.value)}
       />
      )}

      {question.type === "multiple-choice" && question.options && (
       <RadioGroup
        value={answers[question.id] || ""}
        onValueChange={(value) => handleAnswerChange(question.id, value)}
       >
        {question.options.map((option) => (
         <div key={option} className="flex items-center space-x-2">
          <RadioGroupItem value={option} id={`${question.id}-${option}`} />
          <Label htmlFor={`${question.id}-${option}`}>{option}</Label>
         </div>
        ))}
       </RadioGroup>
      )}

      {question.type === "checkbox" && question.options && (
       <div className="space-y-2">
        {question.options.map((option) => (
         <div key={option} className="flex items-center space-x-2">
          <input
           type="checkbox"
           id={`${question.id}-${option}`}
           checked={(answers[question.id] || []).includes(option)}
           onChange={(e) =>
            handleCheckboxChange(question.id, option, e.target.checked)
           }
           className="h-4 w-4 rounded border-gray-300"
          />
          <Label htmlFor={`${question.id}-${option}`}>{option}</Label>
         </div>
        ))}
       </div>
      )}

      {question.type === "rating" && (
       <div className="space-y-2">
        <div className="flex items-center gap-4">
         <Slider
          value={[Number(answers[question.id] || 3)]}
          onValueChange={(value) => handleAnswerChange(question.id, value[0])}
          min={1}
          max={5}
          step={1}
          className="flex-1"
         />
         <Badge
          variant="secondary"
          className="text-base min-w-[3rem] justify-center"
         >
          {answers[question.id] || 3}
         </Badge>
        </div>
        <div className="flex justify-between text-xs text-muted-foreground">
         <span>1 (Low)</span>
         <span>5 (High)</span>
        </div>
       </div>
      )}

      {index < survey.questions.length - 1 && <Separator className="mt-6" />}
     </motion.div>
    ))}

    <Button
     onClick={handleSubmitResponse}
     className="w-full"
     disabled={
      isSubmitting || Object.keys(answers).length !== survey.questions.length
     }
    >
     {isSubmitting ? "Submitting..." : "Submit Response"}
    </Button>
   </CardContent>
  </Card>
 );
}
