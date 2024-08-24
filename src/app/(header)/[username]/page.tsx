import { Button } from "@/components/ui/button";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

export default async function Page({
  params,
}: {
  params: { username: string };
}) {
  const session = await getServerSession(authOptions);
  if (session?.user.username === params.username) redirect("/profile");

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-screen-lg flex-col items-center">
      <div className="min-h-screen w-full border-x border-black p-4">
        <Button asChild>
          <Link href="/">Kembali</Link>
        </Button>
        <p className="text-4xl font-bold">Hello {params.username}</p>
      </div>
    </main>
  );
}
