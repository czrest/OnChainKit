"use client";

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, Clock } from "lucide-react";

export default function SurveyInfoForm({ form }) {
  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Survey Title *</FormLabel>
            <FormControl>
              <Input
                placeholder="Enter survey title"
                {...field}
                className="bg-white/5 border-white/10"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description *</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Describe your survey"
                {...field}
                className="bg-white/5 border-white/10 min-h-[100px]"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="reward"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ETH Reward *</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="0.001"
                  placeholder="0.01"
                  {...field}
                  onChange={(e) => field.onChange(parseFloat(e.target.value))}
                  className="bg-white/5 border-white/10"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="numberOfRespondents"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Target Respondents *</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="10"
                  {...field}
                  onChange={(e) => field.onChange(parseInt(e.target.value))}
                  className="bg-white/5 border-white/10"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* Timeline Section */}
      <div className="space-y-4 p-4 rounded-lg bg-gradient-to-br from-emerald-500/5 to-lime-500/5 border border-white/10">
        <h4 className="text-sm font-semibold text-emerald-400 flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          Survey Timeline
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="applicationDeadline"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs">
                  Application Deadline *
                </FormLabel>
                <FormControl>
                  <Input
                    type="datetime-local"
                    {...field}
                    value={field.value || ""}
                    className="bg-white/5 border-white/10 text-sm"
                  />
                </FormControl>
                <FormDescription className="text-xs">
                  Last date for respondents to apply
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="screeningDateTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  Screening Date & Time *
                </FormLabel>
                <FormControl>
                  <Input
                    type="datetime-local"
                    {...field}
                    value={field.value || ""}
                    className="bg-white/5 border-white/10 text-sm"
                  />
                </FormControl>
                <FormDescription className="text-xs">
                  When screening process occurs
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="surveyStartDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs">Survey Start Date *</FormLabel>
                <FormControl>
                  <Input
                    type="datetime-local"
                    {...field}
                    value={field.value || ""}
                    className="bg-white/5 border-white/10 text-sm"
                  />
                </FormControl>
                <FormDescription className="text-xs">
                  When accepted respondents can begin answering
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="surveyFinalizeDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs">
                  Survey Finalize Date *
                </FormLabel>
                <FormControl>
                  <Input
                    type="datetime-local"
                    {...field}
                    value={field.value || ""}
                    className="bg-white/5 border-white/10 text-sm"
                  />
                </FormControl>
                <FormDescription className="text-xs">
                  When survey closes and rewards are distributed
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  );
}
