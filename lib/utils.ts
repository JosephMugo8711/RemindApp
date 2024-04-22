// Importing the necessary dependencies
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
// utility function exported by shadcn ui
// Define a function named cn which takes multiple class values as inputs
export function cn(...inputs: ClassValue[]) {
  // Merge the class values using clsx and then merge with Tailwind CSS classes using twMerge
  return twMerge(clsx(inputs));
}
