"use server";


import { prisma } from "@/lib/prisma";
import { wait } from "@/lib/wait";
import { createCollectionSchemaType } from "@/schema/createCollection";
import { currentUser } from "@clerk/nextjs";

export async function createCollection(form: createCollectionSchemaType){
      // Get the current user using the currentUser function
    const user = await currentUser();

    // if they no user throw an error 
    if (!user) {
        throw new Error("user not found")
    }

    // Create a new collection using Prisma's create method
    return await prisma.collection.create({
        data: {
            userId: user.id, // Set the user ID for the collection
            color: form.color, // Set the color of the collection
            name: form.name // Set the name of the collection
        }
    })
}

// Function to delete a collection by ID
export async function deleteCollection(id: number) {
    // Get the current user using the currentUser function
    const user = await currentUser();

    // If no user is found, throw an error
    if (!user) {
        throw new Error("User not found");
    }

    // Delete the collection using Prisma's delete method
    return await prisma.collection.delete({
        where: {
            id: id, // Specify the ID of the collection to delete
            userId: user.id // Ensure that the collection belongs to the current user
        }
    });
}