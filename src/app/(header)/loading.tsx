import { Loader2Icon, LoaderIcon } from "lucide-react";
import React from "react";

export default function Loading() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center">
      <LoaderIcon className="h-8 w-8 animate-spin" />
    </main>
  );
}
