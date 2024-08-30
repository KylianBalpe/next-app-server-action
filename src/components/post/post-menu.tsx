"use client";

import React from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import {
  ArrowRightCircleIcon,
  MoreVertical,
  Pencil,
  Trash,
} from "lucide-react";
import Link from "next/link";
import { Session } from "next-auth";
import { deletePost } from "@/app/actions/post/post-action";
import { useToast } from "@/components/ui/use-toast";

export default function PostMenu({
  postId,
  postAuthor,
  session,
}: {
  postId: number;
  postAuthor: string;
  session: Session;
}) {
  const [open, setOpen] = React.useState(false);
  const { toast } = useToast();

  async function onDeletePost(postId: number) {
    try {
      const res = await deletePost(postId);

      if (!res?.ok) {
        toast({
          variant: "destructive",
          title: "Error",
          description: res?.message,
          duration: 3000,
        });

        return;
      }

      toast({
        variant: "success",
        title: "Success",
        description: res?.message,
        duration: 3000,
      });
      setOpen(false);
    } catch (error) {
      if (error instanceof Error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: error.message,
          duration: 3000,
        });
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Internal server error",
          duration: 3000,
        });
      }
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button aria-haspopup="true" size="icon" variant="ghost">
            <MoreVertical className="h-4 w-4" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem asChild>
            <Link href={`/${postAuthor}`}>
              Go to {postAuthor}
              <ArrowRightCircleIcon className="ml-auto h-4 w-4" />
            </Link>
          </DropdownMenuItem>
          {postAuthor === session?.user.username && (
            <>
              <DropdownMenuItem asChild>
                <Link href={`/post/${postId}/edit`}>
                  Edit <Pencil className="ml-auto h-4 w-4" />
                </Link>
              </DropdownMenuItem>
              <DialogTrigger asChild>
                <DropdownMenuItem className="cursor-pointer text-destructive focus:bg-destructive focus:text-destructive-foreground">
                  Delete <Trash className="ml-auto h-4 w-4" />
                </DropdownMenuItem>
              </DialogTrigger>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. Are you sure you want to delete this
            post?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="destructive" onClick={() => onDeletePost(postId)}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
