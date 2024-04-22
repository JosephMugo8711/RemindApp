import { Skeleton } from "@/components/ui/skeleton";
import { wait } from "@/lib/wait";
import { currentUser } from "@clerk/nextjs";
import { Suspense } from "react";

// Define the Home component as an async function
export default async function Home() {
  return (
    <>
      {/* Suspense component to handle loading state */}
      <Suspense fallback={<WelcomeMsgFallback />}>
         {/* Render the WelcomeMsg component */}
         <WelcomeMsg />
      </Suspense>
    </>
  )
}

// Define the WelcomeMsg component as an async function
async function WelcomeMsg() {
  // Fetch current user data
  const user = await currentUser();
  //await wait(3000); // Optional delay

  // Check if user data is available
  if (!user) {
    // Render error message if user data is not available
    return <div>error</div>;
  }

  // Render welcome message with user's first and last name
  return (
    <div className="flex w-full">
      <h1 className="text-4xl font-bold">
        Welcome, <br /> {user.firstName} {user.lastName}
      </h1>
    </div>
  );
}

// Define the WelcomeMsgFallback component
function WelcomeMsgFallback() {
  // Render loading skeleton while waiting for data
  return (
    <div className="flex w-full">
      <h1 className="text-4xl font-bold">
        <Skeleton className="w-[150px] h-[36px]" />
        <Skeleton className="w-[150px] h-[36px]" />
      </h1>
    </div>
  );
}
