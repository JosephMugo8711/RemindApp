"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import CreateCollectionSheet from "./CreateCollectionSheet";

// Define CreateCollectionBtn component
function CreateCollectionBtn() {
  // State hook to manage the open/close state of the CreateCollectionSheet
  const [open, setOpen] = useState(false);

  // Callback function to handle open state change
  const handleOpenChange = (open: boolean) => setOpen(open);

  // Render the CreateCollectionBtn component
  return (
    <div
      className="
    w-full rounded-md bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-[1px]"
    >
      {/* Button component to trigger opening CreateCollectionSheet */}
      <Button
        variant={"outline"}
        className="dark:text-white w-full dark:bg-neutral-950 bg-white"
        onClick={() => setOpen(true)}
      >
        {/* Text with gradient for "Create collection" */}
        <span className="bg-gradient-to-r from-red-500 to-orange-500 hover:to-orange-800 bg-clip-text text-transparent">
          Create collection
        </span>
      </Button>
      {/* CreateCollectionSheet component */}
      <CreateCollectionSheet open={open} onOpenChange={handleOpenChange} />
    </div>
  );
}

export default CreateCollectionBtn;