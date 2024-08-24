"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./button";
import Link from "next/link";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { Session } from "next-auth";

export default function ProfileMenu({ session }: { session: Session }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="overflow-hidden rounded-full"
          size="icon"
        >
          <Avatar>
            <AvatarImage
              src={session.user.image || "https://github.com/shadcn.png"}
              className="overflow-hidden rounded-full"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-56">
        <div className="inline-flex w-full items-center gap-2 p-2">
          <Avatar className="rounded-full border">
            <AvatarImage
              src={session.user.image || "https://github.com/shadcn.png"}
              className="overflow-hidden rounded-full"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex w-full flex-col">
            <DropdownMenuLabel className="p-0">
              {session.user.name}
            </DropdownMenuLabel>
            <p className="p-0 text-sm text-muted-foreground">
              {session.user.username}
            </p>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/profile">Profile</Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => signOut()}
          className="cursor-pointer text-destructive focus:bg-destructive focus:text-destructive-foreground"
        >
          Log out <LogOut className="ml-auto h-4 w-4" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
