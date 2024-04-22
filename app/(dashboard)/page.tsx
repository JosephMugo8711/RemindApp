import CollectionCard from "@/components/CollectionCard";
import CreateCollectionBtn from "@/components/CreateCollectionBtn";
import SadFace from "@/components/icons/SadFace";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs";
import { Suspense } from "react";

export default async function Home() {
  return (
    <>
      <Suspense fallback={<WelcomeMsgFallback />}>
        <WelcomMsg />
      </Suspense>
      <Suspense fallback={<div>Loading collections...</div>}>
        <CollectionList />
      </Suspense>
    </>
  );
}

// Asynchronous function to display the welcome message
async function WelcomMsg() {
  // Get the current user using the currentUser function
  const user = await currentUser();

  // If no user is found, display an error message
  if (!user) {
    return <div>error</div>;
  }

  // Display the welcome message with the user's name
  return (
    <div className="flex w-full mb-12">
      <h1 className="text-4xl font-bold">
        Welcome, <br /> {user.firstName} {user.lastName}
      </h1>
    </div>
  );
}

// Function to display a skeleton loader for the welcome message
function WelcomeMsgFallback() {
  return (
    <div className="flex w-full mb-12">
      <h1 className="text-4xl font-bold">
        {/* Display two skeleton loaders for the first and last name */}
        <Skeleton className="w-[180px] h-[36px]" />
        <Skeleton className="w-[150px] h-[36px]" />
      </h1>
    </div>
  );
}

// Asynchronous function to display the list of collections
async function CollectionList() {
  // Get the current user using the currentUser function
  const user = await currentUser();
  // Retrieve collections associated with the current user from the database
  const collections = await prisma.collection.findMany({
    include: {
      tasks: true, // Include tasks associated with each collection
    },
    where: {
      userId: user?.id, // Filter collections based on the user ID
    },
  });

  // If there are no collections, display a message to create a collection
  if (collections.length === 0) {
    return (
      <div className="flex flex-col gap-5">
        <Alert>
          {/* Display a sad face icon */}
          <SadFace />
          {/* Display a title for the alert */}
          <AlertTitle>There are no collections yet!</AlertTitle>
          {/* Display a description for the alert */}
          <AlertDescription>
            Create a collection to get started
          </AlertDescription>
        </Alert>
        {/* Render the CreateCollectionBtn component */}
        <CreateCollectionBtn />
      </div>
    );
  }

  // If there are collections, display them along with a create collection button
  return (
    <>
      {/* Render the CreateCollectionBtn component */}
      <CreateCollectionBtn />
      <div className="flex flex-col gap-4 mt-6">
        {/* Map through the collections and render a CollectionCard for each */}
        {collections.map((collection) => (
          <CollectionCard key={collection.id} collection={collection} />
        ))}
      </div>
    </>
  );
}