"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

export default function Login() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4">
      <div className="w-full md:max-w-md">
        <div className="flex flex-col space-y-2 pb-4">
          <h1 className="text-2xl font-semibold leading-none">Login</h1>
          <p className="text-lg text-muted-foreground">
            Choose a provider to sign in with
          </p>
        </div>
        <Button className="w-full" onClick={() => signIn("google")}>
          Sign In with Google
        </Button>
        <div className="relative flex items-center justify-center py-2">
          <p className="absolute bg-secondary px-2">OR</p>
          <Separator
            orientation="horizontal"
            className="my-4 bg-accent-foreground/30"
          />
        </div>
        <Button className="w-full" onClick={() => signIn("github")}>
          Sign In with GitHub
        </Button>
      </div>
      <Button variant={"link"} asChild>
        <Link href="/">Return to home</Link>
      </Button>
    </div>
  );
}
