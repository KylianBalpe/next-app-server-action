"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { signIn, signOut } from "next-auth/react";

export const SignOut = () => {
  return <Button onClick={() => signOut()}>Sign Out</Button>;
};

export const SignIn = () => {
  return <Button onClick={() => signIn()}>Sign In</Button>;
};
