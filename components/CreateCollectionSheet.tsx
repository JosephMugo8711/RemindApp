"use client"

import React from "react"; 
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "./ui/sheet"; // Import components from the sheet module
import { useForm } from "react-hook-form"; // Import useForm hook from react-hook-form
import {
  createCollectionSchema,
  createCollectionSchemaType,
} from "@/schema/createCollection"; // Import schema and type for creating a collection
import { zodResolver } from "@hookform/resolvers/zod"; // Import zodResolver from hook form resolvers
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form"; // Import components for form handling
import { Input } from "./ui/input"; // Import Input component
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select"; // Import components for select input
import { CollectionColor, CollectionColors } from "@/lib/constants"; // Import CollectionColor enum and CollectionColors object
import { cn } from "@/lib/utils"; // Import cn utility function
import { Separator } from "./ui/separator"; // Import Separator component
import { Button } from "./ui/button"; // Import Button component
import { createCollection } from "@/actions/collection"; // Import createCollection action
import { toast } from "./ui/use-toast"; // Import toast function
import { ReloadIcon } from "@radix-ui/react-icons"; // Import ReloadIcon component
import { useRouter } from "next/navigation"; // Import useRouter hook from Next.js

// Define Props interface for CreateCollectionSheet component
interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// CreateCollectionSheet component definition
function CreateCollectionSheet({ open, onOpenChange }: Props) {
  // Initialize form using useForm hook from react-hook-form
  const form = useForm<createCollectionSchemaType>({
    resolver: zodResolver(createCollectionSchema),
    defaultValues: {},
  });

  const router = useRouter(); // useRouter hook to handle navigation

  // Function to handle form submission
  const onSubmit = async (data: createCollectionSchemaType) => {
    try {
      await createCollection(data); // Call createCollection action with form data

      // Close the sheet
      openChangeWrapper(false);
      router.refresh(); // Refresh the page after creating the collection

      // Show success toast
      toast({
        title: "Success",
        description: "Collection created successfully!",
      });
    } catch (e: any) {
      // Show error toast if there's an error during collection creation
      toast({
        title: "Error",
        description: "Something went wrong. Please try again later",
        variant: "destructive",
      });
      console.log("Error while creating collection", e);
    }
  };

  // Wrapper function to handle open state change and reset form
  const openChangeWrapper = (open: boolean) => {
    form.reset(); // Reset form fields
    onOpenChange(open); // Call onOpenChange function with the new open state
  };

  // Render the CreateCollectionSheet component
  return (
    <Sheet open={open} onOpenChange={openChangeWrapper}>
      <SheetContent>
        {/* SheetHeader with title and description */}
        <SheetHeader>
          <SheetTitle>Add new collection</SheetTitle>
          <SheetDescription>
            Collections are a way to group your tasks
          </SheetDescription>
        </SheetHeader>
        {/* Form component for collecting collection data */}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 flex flex-col"
          >
            {/* FormField for collection name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Personal" {...field} />
                  </FormControl>
                  <FormDescription>Collection name</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* FormField for selecting collection color */}
            <FormField
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Color</FormLabel>
                  <FormControl>
                    <Select onValueChange={(color) => field.onChange(color)}>
                      {/* SelectTrigger for displaying selected color */}
                      <SelectTrigger
                        className={cn(
                          "w-full h-8 text-white",
                          CollectionColors[field.value as CollectionColor]
                        )}
                      >
                        <SelectValue
                          placeholder="Color"
                          className="w-full h-8"
                        />
                      </SelectTrigger>
                      {/* SelectContent for displaying color options */}
                      <SelectContent className="w-full">
                        {Object.keys(CollectionColors).map((color) => (
                          <SelectItem
                            key={color}
                            value={color}
                            className={cn(
                              `w-full h-8 rounded-md my-1 text-white focus:text-white focus:font-bold focus:ring-2 ring-neutral-600 focus:ring-inset dark:focus:ring-white focus:px-8`,
                              CollectionColors[color as CollectionColor]
                            )}
                          >
                            {color}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription>
                    Select a color for your collection
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        {/* Separator component */}
        <div className="flex flex-col gap-3 mt-4">
          <Separator />
          {/* Button to confirm collection creation */}
          <Button
            disabled={form.formState.isSubmitting}
            variant={"outline"}
            className={cn(
              form.watch("color") &&
                CollectionColors[form.getValues("color") as CollectionColor]
            )}
            onClick={form.handleSubmit(onSubmit)}
          >
            Confirm
            {/* Show loading icon while submitting form */}
            {form.formState.isSubmitting && (
              <ReloadIcon className="ml-2 h-4 w-4 animate-spin" />
            )}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}


export default CreateCollectionSheet;
