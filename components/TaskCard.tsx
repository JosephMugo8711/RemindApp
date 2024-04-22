"use client"

import { Task } from "@prisma/client";
import React, { useTransition } from "react";
import { Checkbox } from "./ui/checkbox";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { setTaskToDone } from "@/actions/task"; // Import action to mark task as done
import { useRouter } from "next/navigation"; // Import useRouter hook for navigation

// Function to determine the color of expiration date based on days remaining
function getExpirationColor(expiresAt: Date) {
  const days = Math.floor((expiresAt.getTime() - Date.now()) / 1000 / 60 / 60);

  if (days < 0) return "text-gray-300 dark:text-gray-400";
  if (days <= 3 * 24) return "text-red-500 dark:text-red-400";
  if (days <= 7 * 24) return "text-orange-500 dark:text-orange-400";
  return "text-green-500 dark:text-green-400";
}

// TaskCard component to display individual task details
function TaskCard({ task }: { task: Task }) {
  // Initialize useTransition hook to handle UI transitions during task completion
  const [isLoading, startTransition] = useTransition();
  // Initialize useRouter hook to access router for navigation
  const router = useRouter();

  return (
    <div className="flex gap-2 items-start">
      {/* Checkbox to mark task as done */}
      <Checkbox
        id={task.id.toString()}
        className="w-5 h-5"
        checked={task.done}
        disabled={task.done || isLoading} // Disable checkbox if task is already done or loading
        onCheckedChange={() => {
          startTransition(async () => {
            // Function to mark task as done
            await setTaskToDone(task.id);
            // Refresh the page after task is marked as done
            router.refresh();
          });
        }}
      />
      {/* Label to display task content */}
      <label
        htmlFor={task.id.toString()}
        className={cn(
          "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 decoration-1 dark:decoration-white",
          task.done && "line-through" // Add line-through style if task is done
        )}
      >
        {task.content} {/* Display task content */}
        {/* Display expiration date if available */}
        {task.expiresAt && (
          <p
            className={cn(
              "text-xs text-neutral-500 dark:text-neutral-400",
              getExpirationColor(task.expiresAt) // Apply expiration date color based on function
            )}
          >
            {format(task.expiresAt, "dd/MM/yyyy")} {/* Format and display expiration date */}
          </p>
        )}
      </label>
    </div>
  );
}

// Export TaskCard component
export default TaskCard;
