// Import the z object from the zod library
import { z } from 'zod';

// Define the schema for creating a new task using zod
export const createTaskSchema = z.object({
    // Define the collectionId field as a non-negative number
    collectionId: z.number().nonnegative(),
    // Define the content field as a string with a minimum length of 8 characters
    content: z.string().min(8, {
        message: "Task content must be at least 8 characters"
    }),
    // Define the expiresAt field as an optional date
    expiresAt: z.date().optional()
})

// Define the type for the createTaskSchema using zod's infer function
export type createTaskSchemaType = z.infer<typeof createTaskSchema>
