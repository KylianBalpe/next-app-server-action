import React from "react";
import { Button } from "./button";
import Link from "next/link";
import { useSession } from "next-auth/react";
import ProfileMenu from "./profile-menu";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function Header() {
  const session = await getServerSession(authOptions);

  return (
    <div className="sticky top-0 z-50 inline-flex h-14 w-full items-center justify-center border-b border-black bg-background">
      <div className="mx-auto w-full max-w-screen-lg">
        <div className="inline-flex w-full items-center justify-between px-4">
          <Link href="/" className="text-2xl font-bold">
            Posts
          </Link>
          {session ? (
            <ProfileMenu session={session} />
          ) : (
            <Button asChild>
              <Link href="/login">Sign In</Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
