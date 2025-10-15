import { PlusCircle, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { motion } from "framer-motion";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { FormLabel } from "../ui/form";
import { Switch } from "../ui/switch";

export default function Questions({
  currentQuestions,
  addQuestion,
  removeQuestionHandler,
  updateQuestionField,
  addOption,
  updateOption,
  removeOption,
  form
}) {
  return (
    <>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Survey Questions</h3>
          <Button
            type="button"
            onClick={addQuestion}
            variant="outline"
            size="sm"
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Question
          </Button>
        </div>

        {currentQuestions.map((question, index) => {
          const questionError = form.formState.errors.questions?.[index];

          return (
            <motion.div
              key={question.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className={questionError ? "border-destructive" : ""}>
                <CardContent className="pt-6 space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 space-y-4">
                      <div className="space-y-4">
                        <div>
                          <FormLabel htmlFor={`question-${question.id}`}>
                            Question {index + 1} {question.required && "*"}
                          </FormLabel>
                          <Input
                            id={`question-${question.id}`}
                            value={question.text}
                            onChange={(e) =>
                              updateQuestionField(index, "text", e.target.value)
                            }
                            placeholder="Enter your question"
                            className={
                              questionError?.text ? "border-destructive" : ""
                            }
                          />
                          {questionError?.text && (
                            <p className="text-sm font-medium text-destructive mt-1">
                              {questionError.text.message}
                            </p>
                          )}
                        </div>

                        <div className="flex items-center space-x-3">
                          <Switch
                            id={`required-${question.id}`}
                            checked={question.required}
                            onCheckedChange={(checked) =>
                              updateQuestionField(index, "required", checked)
                            }
                          />
                          <Label
                            htmlFor={`required-${question.id}`}
                            className="cursor-pointer"
                          >
                            {question.required ? "Required" : "Optional"}
                          </Label>
                        </div>
                      </div>

                      <div>
                        <FormLabel htmlFor={`type-${question.id}`}>
                          Question Type
                        </FormLabel>
                        <Select
                          value={question.type}
                          onValueChange={(value) =>
                            updateQuestionField(index, "type", value)
                          }
                        >
                          <SelectTrigger id={`type-${question.id}`}>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="short-answer">
                              Short Answer
                            </SelectItem>
                            <SelectItem value="long-answer">
                              Long Answer
                            </SelectItem>
                            <SelectItem value="multiple-choice">
                              Multiple Choice
                            </SelectItem>
                            <SelectItem value="checkbox">Checkbox</SelectItem>
                            <SelectItem value="rating">Rating (1-5)</SelectItem>
                            <SelectItem value="date">Date</SelectItem>
                            <SelectItem value="time">Time</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {(question.type === "multiple-choice" ||
                        question.type === "checkbox") && (
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <FormLabel>
                              Options (minimum 2 required) *
                            </FormLabel>
                            <Button
                              type="button"
                              onClick={() => addOption(index)}
                              variant="outline"
                              size="sm"
                            >
                              <PlusCircle className="h-3 w-3 mr-1" />
                              Add Option
                            </Button>
                          </div>
                          <div className="space-y-2">
                            {(question.options || []).map(
                              (option, optionIndex) => (
                                <motion.div
                                  key={`${question.id}-option-${optionIndex}`}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ duration: 0.2 }}
                                  className="flex items-center gap-2"
                                >
                                  <Input
                                    value={option}
                                    onChange={(e) =>
                                      updateOption(
                                        index,
                                        optionIndex,
                                        e.target.value
                                      )
                                    }
                                    placeholder={`Option ${optionIndex + 1}`}
                                    className="flex-1"
                                  />
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    onClick={() =>
                                      removeOption(index, optionIndex)
                                    }
                                  >
                                    <Trash2 className="h-4 w-4 text-destructive" />
                                  </Button>
                                </motion.div>
                              )
                            )}
                            {(!question.options ||
                              question.options.length === 0) && (
                              <p className="text-sm text-muted-foreground">
                                Click "Add Option" to create choices
                              </p>
                            )}
                          </div>
                          {questionError?.options && (
                            <p className="text-sm font-medium text-destructive">
                              {questionError.options.message}
                            </p>
                          )}
                        </div>
                      )}
                    </div>

                    {currentQuestions.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeQuestionHandler(index)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}

        {form.formState.errors.questions &&
          !Array.isArray(form.formState.errors.questions) && (
            <p className="text-sm font-medium text-destructive">
              {form.formState.errors.questions.message}
            </p>
          )}
      </div>
    </>
  );
}
