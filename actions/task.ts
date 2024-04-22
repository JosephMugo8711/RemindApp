"use server";

import { prisma } from "@/lib/prisma";
import { createTaskSchemaType } from "@/schema/createTask";
import { currentUser } from "@clerk/nextjs";

// function to create a new collection
export async function createTask(data: createTaskSchemaType){
    // get the current user using the currentUser function
    const user = await currentUser();

    // if no user is found throw an error
    if (!user) {
        throw new Error("user not found")
    }
    
      // Destructure the data object
    const {content, expiresAt, collectionId} = data;
      // Create a new task using Prisma's create method
      return await prisma.task.create({
        data: {
            userId: user.id, // Set the user ID for the task
            content, // Set the content of the task
            expiresAt, // Set the expiration date of the task
            Collection: { // Connect the task to the collection it belongs to
                connect: {
                    id: collectionId // Specify the ID of the collection
                }
            }
        }
    });
}

// Function to mark a task as done
export async function setTaskToDone(id: number) {
    // Get the current user using the currentUser function
    const user = await currentUser();

    // If no user is found, throw an error
    if (!user) {
        throw new Error("User not found");
    }

    // Update the task to mark it as done using Prisma's update method
    return await prisma.task.update({
        where: {
            id: id, // Specify the ID of the task to update
            userId: user.id // Ensure that the task belongs to the current user
        },
        data: {
            done: true // Set the done field of the task to true
        }
    });
}