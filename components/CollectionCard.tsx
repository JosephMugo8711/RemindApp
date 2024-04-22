"use client";
import { Collection, Task } from "@prisma/client";
import React, { useMemo, useState, useTransition } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { CollectionColor, CollectionColors } from "@/lib/constants";
import { CaretDownIcon, CaretUpIcon, TrashIcon } from "@radix-ui/react-icons";
import { Progress } from "./ui/progress";
import { Separator } from "./ui/separator";
import PlusIcon from "./icons/PlusIcon";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { deleteCollection } from "@/actions/collection";
import { toast } from "./ui/use-toast";
import { useRouter } from "next/navigation";
import CreateTaskDialog from "./CreateTaskDialog";
import TaskCard from "./TaskCard";

// Define props interface for CollectionCard component
interface Props {
  collection: Collection & {
    tasks: Task[];
  };
}

// CollectionCard component definition
function CollectionCard({ collection }: Props) {
  // State and hooks initialization
  const [isOpen, setIsOpen] = useState(true); // State for collapsible open/close
  const router = useRouter(); // useRouter hook to handle navigation
  const [showCreateModal, setShowCreateModal] = useState(false); // State to control visibility of CreateTaskDialog
  const tasks = collection.tasks; // Retrieve tasks from collection
  const [isLoading, startTransition] = useTransition(); // State and hook for transitions

  // Function to remove a collection
  const removeCollection = async () => {
    try {
      await deleteCollection(collection.id); // Call deleteCollection action
      toast({
        title: "Success",
        description: "Collection deleted successfully",
      });
      router.refresh(); // Refresh the page after deleting the collection
    } catch (e) {
      toast({
        title: "Error",
        description: "Cannot delete collection",
        variant: "destructive",
      });
    }
  };

  // Calculate number of tasks done
  const tasksDone = useMemo(() => {
    return collection.tasks.filter((task) => task.done).length;
  }, [collection.tasks]);

  // Calculate total number of tasks
  const totalTasks = collection.tasks.length;

  // Calculate progress percentage
  const progress = totalTasks === 0 ? 0 : (tasksDone / totalTasks) * 100;

  // Render CollectionCard component
  return (
    <>
      {/* CreateTaskDialog component */}
      <CreateTaskDialog
        open={showCreateModal}
        setOpen={setShowCreateModal}
        collection={collection}
      />

      {/* Collapsible component */}
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        {/* CollapsibleTrigger component */}
        <CollapsibleTrigger asChild>
          {/* Button component */}
          <Button
            variant={"ghost"}
            className={cn(
              "flex w-full justify-between p-6",
              isOpen && "rounded-b-none",
              CollectionColors[collection.color as CollectionColor]
            )}
          >
            <span className="text-white font-bold">{collection.name}</span>
            {!isOpen && <CaretDownIcon className="h-6 w-6" />}
            {isOpen && <CaretUpIcon className="h-6 w-6" />}
          </Button>
        </CollapsibleTrigger>
        {/* CollapsibleContent component */}
        <CollapsibleContent className="flex rounded-b-md flex-col dark:bg-neutral-900 shadow-lg">
          {/* Render content based on tasks */}
          {tasks.length === 0 && (
            <Button
              variant={"ghost"}
              className="flex items-center justify-center gap-1 p-8 py-12 rounded-none"
              onClick={() => setShowCreateModal(true)}
            >
              <p>There are no tasks yet:</p>
              {/* Display Create Task button */}
              <span
                className={cn(
                  "text-sm bg-clip-text text-transparent",
                  CollectionColors[collection.color as CollectionColor]
                )}
              >
                Create one
              </span>
            </Button>
          )}
          {tasks.length > 0 && (
            <>
              {/* Render progress bar */}
              <Progress className="rounded-none" value={progress} />
              {/* Render task cards */}
              <div className="p-4 gap-3 flex flex-col">
                {tasks.map((task) => (
                  <TaskCard key={task.id} task={task} />
                ))}
              </div>
            </>
          )}
          {/* Separator component */}
          <Separator />
          {/* Footer */}
          <footer className="h-[40px] px-4 p-[2px] text-xs text-neutral-500 flex justify-between items-center ">
            {/* Display creation date of the collection */}
            <p>Created at {collection.createdAt.toLocaleDateString("en-US")}</p>
            {/* Show loading indicator while deleting */}
            {isLoading && <div>Deleting...</div>}
            {!isLoading && (
              <div>
                {/* Button to open CreateTaskDialog */}
                <Button
                  size={"icon"}
                  variant={"ghost"}
                  onClick={() => setShowCreateModal(true)}
                >
                  <PlusIcon />
                </Button>
                {/* AlertDialog component for confirmation */}
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button size={"icon"} variant={"ghost"}>
                      <TrashIcon />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      your collection and all tasks inside it.
                    </AlertDialogDescription>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => {
                          startTransition(removeCollection);
                        }}
                      >
                        Proceed
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            )}
          </footer>
        </CollapsibleContent>
      </Collapsible>
    </>
  );
}

export default CollectionCard;