"use client";

import { Button } from "@/components/ui/button";
import {
 Form,
 FormControl,
 FormField,
 FormItem,
 FormLabel,
 FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import Questions from "./Questions";
import ScreeningForm from "./ScreeningForm";
import InputField from "./InputField";

export default function SurveyForm({ form, onSubmit }) {
 return (
  <Form {...form}>
   <form
    onSubmit={form.handleSubmit(onSubmit)}
    className="space-y-5 max-w-3xl mx-auto"
   >
    {/* survey title */}
    <InputField
     form={form}
     formFieldName="title"
     formLabel="Survey Title *"
     placeholder="Enter survey title"
    />

    {/* survey description */}
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

    {/* number of respondents */}
    <InputField
     form={form}
     formFieldName="numberOfRespondents"
     formLabel="Number of Respondents *"
     placeholder="ex. 10"
     type="number"
     formDescription="How many people do you want to complete this survey?"
    />

    {/* total reward */}
    <InputField
     form={form}
     formFieldName="reward"
     formLabel="Total Reward (ETH) *"
     placeholder="ex. 0.0001"
     type="number"
     formDescription="This amount will be split among all accepted respondents"
    />

    {/* screening form */}
    <ScreeningForm form={form} />

    {/* question form */}
    <Questions form={form} />

    <div className="flex gap-4">
     <Button
      type="submit"
      className="flex-1 bg-gradient-to-r from-emerald-500 to-lime-500 hover:from-emerald-600 hover:to-lime-600"
      disabled={form.formState.isSubmitting}
     >
      {form.formState.isSubmitting
       ? "Creating..."
       : "Create Survey & Deposit ETH"}
     </Button>
     <Button type="button" variant="outline" onClick={() => {}}>
      Cancel
     </Button>
    </div>
   </form>
  </Form>
 );
}
