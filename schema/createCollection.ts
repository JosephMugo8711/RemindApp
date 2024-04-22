import { CollectionColors } from "@/lib/constants";
// Import the z object from the zod library
import { z } from 'zod';

// Define the schema for creating a new collection using zod
export const createCollectionSchema = z.object({
    // Define the name field with a minimum length of 4 characters
    name: z.string().min(4, {
        message: "Collection name must be at least 4 characters"
    }),
    // Define the color field as a string and ensure it is a valid color from the CollectionColors constant
    color: z.string().refine(color => Object.keys(CollectionColors).includes(color))
})

// Define the type for the createCollectionSchema using zod's infer function
export type createCollectionSchemaType = z.infer<typeof createCollectionSchema>;
