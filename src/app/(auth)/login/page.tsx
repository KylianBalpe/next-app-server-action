import React from "react";
import Image from "next/image";
import Login from "@/components/authentication/login";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/");
  }

  return (
    <div className="grid min-h-screen w-full grid-cols-1 lg:grid-cols-2">
      <Login />
      <Image
        src="/placeholder.svg"
        alt="placeholder"
        width={1080}
        height={1080}
        className="hidden h-screen overflow-hidden object-cover lg:block"
      />
    </div>
  );
}
