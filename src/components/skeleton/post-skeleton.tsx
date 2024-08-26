import React from "react";

export default function PostSkeleton() {
  return (
    <div className="w-full border-b border-b-black">
      <div className="mx-auto flex w-full max-w-screen-sm flex-col gap-2 py-8">
        <div className="inline-flex items-center gap-4">
          <div className="h-12 w-12 animate-pulse rounded-full bg-gray-300"></div>
          <div className="flex flex-col gap-1">
            <div className="h-4 w-24 animate-pulse rounded-md bg-gray-300"></div>

            <div className="h-3 w-16 animate-pulse rounded-md bg-gray-200"></div>
          </div>
        </div>
        <div className="ml-16 space-y-2">
          <div className="h-4 w-11/12 animate-pulse rounded-md bg-gray-300"></div>
          <div className="h-4 w-10/12 animate-pulse rounded-md bg-gray-300"></div>
          <div className="h-4 w-9/12 animate-pulse rounded-md bg-gray-300"></div>
          <div className="h-4 w-8/12 animate-pulse rounded-md bg-gray-300"></div>
        </div>
      </div>
    </div>
  );
}
