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

export default function ScreeningSetupForm({ form }) {
  return (
    <div className="space-y-6 p-6 bg-gradient-to-br from-emerald-500/10 to-lime-500/10 rounded-lg border border-emerald-500/20">
      <h3 className="text-lg font-semibold bg-gradient-to-r from-emerald-400 to-lime-400 bg-clip-text text-transparent">
        Screening Setup
      </h3>

      <FormField
        control={form.control}
        name="screeningDescription"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Screening Process Description *</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Describe the screening process..."
                {...field}
                className="bg-white/5 border-white/10 min-h-[80px]"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="screeningRequirements"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Requirements *</FormLabel>
            <FormControl>
              <Textarea
                placeholder="List the requirements for respondents..."
                {...field}
                className="bg-white/5 border-white/10 min-h-[80px]"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="meetingLink"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Meeting Link</FormLabel>
            <FormControl>
              <Input
                type="url"
                placeholder="https://zoom.us/j/..."
                {...field}
                className="bg-white/5 border-white/10"
              />
            </FormControl>
            <FormDescription>
              Optional: Video call link (Zoom, Google Meet, etc.)
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="physicalLocation"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Physical Location</FormLabel>
            <FormControl>
              <Input
                placeholder="123 Main St, City, State"
                {...field}
                className="bg-white/5 border-white/10"
              />
            </FormControl>
            <FormDescription>
              Optional: In-person meeting location
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
