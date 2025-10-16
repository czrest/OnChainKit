import {
 FormControl,
 FormDescription,
 FormField,
 FormItem,
 FormLabel,
 FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

export default function InputField({
 form,
 formLabel,
 formFieldName = "",
 formDescription = "",
 placeholder,
 type = "text",
}) {
 return (
  <FormField
   control={form.control}
   name={formFieldName}
   render={({ field }) => (
    <FormItem>
     <FormLabel>{formLabel}</FormLabel>
     <FormControl>
      <Input placeholder={placeholder} type={type} {...field} />
     </FormControl>
     {formDescription && <FormDescription>{formDescription}</FormDescription>}
     <FormMessage />
    </FormItem>
   )}
  />
 );
 F;
}
