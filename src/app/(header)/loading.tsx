import { Loader2Icon } from "lucide-react";
import React from "react";

export default function Loading() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-screen-lg items-center">
      <div className="flex min-h-screen w-full flex-col items-center justify-center border-x border-x-black">
        <Loader2Icon className="h-8 w-8 animate-spin" />
      </div>
    </main>
  );
}
