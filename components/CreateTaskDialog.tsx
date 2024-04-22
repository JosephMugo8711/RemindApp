"use client"
import { Collection } from "@prisma/client";
import React from "react"; 
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
} from "./ui/dialog"; // Import components for dialog
import { DialogTitle } from "@radix-ui/react-dialog"; // Import DialogTitle component
import { cn } from "@/lib/utils"; // Import cn utility function
import { CollectionColor, CollectionColors } from "@/lib/constants"; // Import CollectionColor enum and CollectionColors object
import { useForm } from "react-hook-form"; // Import useForm hook from react-hook-form
import { createTaskSchema, createTaskSchemaType } from "@/schema/createTask"; // Import schema and type for creating a task
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
import { Textarea } from "./ui/textarea"; // Import Textarea component
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"; // Import components for popover
import { Calendar } from "./ui/calendar"; // Import Calendar component
import { Button } from "./ui/button"; // Import Button component
import { CalendarIcon, ReloadIcon } from "@radix-ui/react-icons"; // Import CalendarIcon and ReloadIcon components
import { format } from "date-fns"; // Import format function from date-fns
import { createTask } from "@/actions/task"; // Import createTask action
import { toast } from "./ui/use-toast"; // Import toast function
import { useRouter } from "next/navigation"; // Import useRouter hook from Next.js

// Define Props interface for CreateTaskDialog component
interface Props {
  open: boolean; // Whether the dialog is open or not
  collection: Collection; // Collection object
  setOpen: (open: boolean) => void; // Function to set the open state of the dialog
}

// CreateTaskDialog component definition
function CreateTaskDialog({ open, collection, setOpen }: Props) {
  // Initialize form using useForm hook from react-hook-form
  const form = useForm<createTaskSchemaType>({
    resolver: zodResolver(createTaskSchema), // Use zodResolver for schema validation
    defaultValues: {
      collectionId: collection.id, // Set default values for the form
    },
  });

  const router = useRouter(); // useRouter hook to handle navigation

  // Function to handle changes in the open state of the dialog and reset form
  const openChangeWrapper = (value: boolean) => {
    setOpen(value); // Set the open state of the dialog
    form.reset(); // Reset the form fields
  };

  // Function to handle form submission
  const onSubmit = async (data: createTaskSchemaType) => {
    try {
      await createTask(data); // Call createTask action with form data
      toast({
        title: "Success",
        description: "Task created successfully!!",
      }); // Show success toast
      openChangeWrapper(false); // Close the dialog
      router.refresh(); // Refresh the page
    } catch (e) {
      toast({
        title: "Error",
        description: "Cannot create task",
        variant: "destructive",
      }); // Show error toast if task creation fails
    }
  };

  // Render the CreateTaskDialog component
  return (
    <Dialog open={open} onOpenChange={openChangeWrapper}>
      <DialogContent className="sm:max-w-[425px]">
        {/* DialogHeader with title and description */}
        <DialogHeader>
          <DialogTitle className="flex gap-2">
            Add task to collection:
            {/* Display collection name with corresponding color */}
            <span
              className={cn(
                "p-[1px] bg-clip-text text-transparent",
                CollectionColors[collection.color as CollectionColor]
              )}
            >
              {collection.name}
            </span>
          </DialogTitle>
          <DialogDescription>
            Add a task to your collection. You can add as many tasks as you want
            to a collection.
          </DialogDescription>
        </DialogHeader>
        <div className="gap-4 py-4">
          {/* Form for collecting task data */}
          <Form {...form}>
            <form
              className="space-y-4 flex flex-col"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              {/* FormField for task content */}
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Content</FormLabel>
                    <FormControl>
                      {/* Textarea for entering task content */}
                      <Textarea
                        rows={5}
                        placeholder="Task content here"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* FormField for task expiration date */}
              <FormField
                control={form.control}
                name="expiresAt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Expires at</FormLabel>
                    <FormDescription>
                      When should this task expire?
                    </FormDescription>
                    <FormControl>
                      <Popover>
                        {/* Popover for selecting task expiration date */}
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "justify-start text-left font-normal w-full",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {/* Calendar icon and selected date */}
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {field.value && format(field.value, "PPP")}
                            {!field.value && <span>No expiration</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent>
                          {/* Calendar component for selecting date */}
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>
        {/* DialogFooter with confirm button */}
        <DialogFooter>
          <Button
            disabled={form.formState.isSubmitting}
            className={cn(
              "w-full dark:text-white text-white",
              CollectionColors[collection.color as CollectionColor]
            )}
            onClick={form.handleSubmit(onSubmit)}
          >
            Confirm
            {/* Show loading icon while submitting form */}
            {form.formState.isSubmitting && (
              <ReloadIcon className="animate-spin h-4 w-4 ml-2" />
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default CreateTaskDialog;
