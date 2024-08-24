import { Button } from "@/components/ui/button";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import EditProfile from "@/components/profile/edit-profile";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }
  return (
    <main className="mx-auto min-h-screen w-full max-w-screen-lg items-center">
      <div className="flex min-h-screen w-full flex-col border-x border-black">
        <div className="w-full p-8">
          <Avatar className="mx-auto h-40 w-40 rounded-full border border-black">
            <AvatarImage
              src={session.user.image || "https://github.com/shadcn.png"}
              className="overflow-hidden rounded-full"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
        <EditProfile session={session} />
      </div>
    </main>
  );
}
