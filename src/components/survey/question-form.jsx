"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Trash2, Plus } from "lucide-react";

export default function QuestionForm({ form, index, onRemove }) {
  const questions = form.watch("questions");
  const question = questions[index];

  const handleTypeChange = (type) => {
    const updated = [...questions];
    updated[index] = {
      ...updated[index],
      type,
      options:
        type === "multiple-choice" || type === "checkbox" ? [""] : undefined,
    };
    form.setValue("questions", updated);
  };

  const handleAddOption = () => {
    const updated = [...questions];
    updated[index] = {
      ...updated[index],
      options: [...(updated[index].options || []), ""],
    };
    form.setValue("questions", updated);
  };

  const handleRemoveOption = (optionIndex) => {
    const updated = [...questions];
    updated[index] = {
      ...updated[index],
      options: updated[index].options?.filter((_, i) => i !== optionIndex),
    };
    form.setValue("questions", updated);
  };

  const handleOptionChange = (optionIndex, value) => {
    const updated = [...questions];
    if (updated[index].options) {
      updated[index].options[optionIndex] = value;
      form.setValue("questions", updated);
    }
  };

  const handleRequiredChange = (required) => {
    const updated = [...questions];
    updated[index] = {
      ...updated[index],
      required,
    };
    form.setValue("questions", updated);
  };

  const error = form.formState.errors.questions?.[index];
  const hasError = !!error;

  return (
    <div
      className={`p-6 bg-gradient-to-br from-white/5 to-white/10 rounded-lg border ${
        hasError ? "border-red-500" : "border-white/10"
      }`}
    >
      <div className="flex items-start justify-between mb-4">
        <h4 className="text-lg font-semibold">
          Question {index + 1}{" "}
          {question.required && <span className="text-red-500">*</span>}
        </h4>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => onRemove(index)}
          className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>

      <div className="space-y-4">
        <div>
          <Label>Question Text *</Label>
          <Input
            value={question.text}
            onChange={(e) => {
              const updated = [...questions];
              updated[index] = { ...updated[index], text: e.target.value };
              form.setValue("questions", updated);
            }}
            placeholder="Enter your question"
            className="bg-white/5 border-white/10 mt-2"
          />
          {error?.text && (
            <p className="text-red-500 text-sm mt-1">{error.text.message}</p>
          )}
        </div>

        <div>
          <Label>Question Type *</Label>
          <Select value={question.type} onValueChange={handleTypeChange}>
            <SelectTrigger className="bg-white/5 border-white/10 mt-2">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="short-answer">Short Answer</SelectItem>
              <SelectItem value="long-answer">Long Answer</SelectItem>
              <SelectItem value="multiple-choice">Multiple Choice</SelectItem>
              <SelectItem value="checkbox">Checkbox</SelectItem>
              <SelectItem value="rating">Rating (1-5)</SelectItem>
              <SelectItem value="date">Date</SelectItem>
              <SelectItem value="time">Time</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {(question.type === "multiple-choice" ||
          question.type === "checkbox") && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <Label>Options * (minimum 2 required)</Label>
              <Button
                type="button"
                size="sm"
                onClick={handleAddOption}
                className="bg-gradient-to-r from-emerald-500 to-lime-500 hover:from-emerald-600 hover:to-lime-600"
              >
                <Plus className="w-4 h-4 mr-1" />
                Add Option
              </Button>
            </div>
            <div className="space-y-2">
              {question.options?.map((option, optionIndex) => (
                <div key={optionIndex} className="flex gap-2">
                  <Input
                    value={option}
                    onChange={(e) =>
                      handleOptionChange(optionIndex, e.target.value)
                    }
                    placeholder={`Option ${optionIndex + 1}`}
                    className="bg-white/5 border-white/10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveOption(optionIndex)}
                    className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              {!question.options?.length && (
                <p className="text-sm text-gray-400">
                  Click "Add Option" to create choices
                </p>
              )}
            </div>
            {error?.options && (
              <p className="text-red-500 text-sm mt-1">
                {typeof error.options === "object" && "message" in error.options
                  ? error.options.message
                  : "Options are required"}
              </p>
            )}
          </div>
        )}

        <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
          <div>
            <Label>Required Question</Label>
            <p className="text-sm text-gray-400">
              {question.required
                ? "Respondents must answer this"
                : "Optional question"}
            </p>
          </div>
          <Switch
            checked={question.required}
            onCheckedChange={handleRequiredChange}
          />
        </div>
      </div>
    </div>
  );
}
