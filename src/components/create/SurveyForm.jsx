"use client";

import { Button } from "@/components/ui/button";
import {
 Form,
 FormControl,
 FormDescription,
 FormField,
 FormItem,
 FormLabel,
 FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
 Card,
 CardContent,
 CardDescription,
 CardHeader,
 CardTitle,
} from "@/components/ui/card";
import Questions from "./Questions";
import { Calendar } from "lucide-react";
import { SmartDatetimeInput } from "@/components/ui/smart-datetime-input";
import { useAccount } from "wagmi";
import ScreeningForm from "./ScreeningForm";

export default function SurveyForm({ form, onSubmit }) {
 const { address } = useAccount();

 return (
  <Form {...form}>
   <form
    onSubmit={form.handleSubmit(onSubmit)}
    className="space-y-5 max-w-3xl mx-auto"
   >
    <FormField
     control={form.control}
     name="title"
     render={({ field }) => (
      <FormItem>
       <FormLabel>Survey Title *</FormLabel>
       <FormControl>
        <Input placeholder="Enter survey title" type="text" {...field} />
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
         className="resize-none"
         {...field}
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
       <FormLabel>Number of Respondents *</FormLabel>
       <FormControl>
        <Input placeholder="10" type="number" {...field} />
       </FormControl>
       <FormDescription>
        How many people do you want to complete this survey?
       </FormDescription>
       <FormMessage />
      </FormItem>
     )}
    />

    <FormField
     control={form.control}
     name="reward"
     render={({ field }) => (
      <FormItem>
       <FormLabel>Total Reward (ETH) *</FormLabel>
       <FormControl>
        <Input placeholder="0.0001" type="number" {...field} />
       </FormControl>
       <FormDescription>
        This amount will be split among all accepted respondents
       </FormDescription>
       <FormMessage />
      </FormItem>
     )}
    />

    {/* screening form */}
    <ScreeningForm form={form} />

    {/* question form */}
    <Questions form={form} />

    <div className="flex gap-4">
     <Button
      type="submit"
      className="flex-1 bg-gradient-to-r from-emerald-500 to-lime-500 hover:from-emerald-600 hover:to-lime-600"
      disabled={form.formState.isSubmitting || !address}
     >
      {form.formState.isSubmitting
       ? "Creating..."
       : "Create Survey & Deposit ETH"}
     </Button>
     <Button type="button" variant="outline" onClick={() => {}}>
      Cancel
     </Button>
    </div>

    {!address && (
     <p className="text-sm text-destructive text-center">
      Please connect your wallet to create a survey
     </p>
    )}
   </form>
  </Form>
 );
}
