import EditPostForm from "@/components/post/edit-form";
import { getPost } from "@/app/actions/post/post-action";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import SessionProvider from "@/components/session-provider";
import React from "react";

export default async function Page({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/");
  }

  const post = await getPost(Number(params.id));
  if (!post.data) {
    redirect("/");
  }

  return (
    <main className="mx-auto min-h-screen w-full max-w-screen-lg items-center">
      <div className="flex min-h-screen w-full flex-col border-x border-black">
        <div className="w-full border-b border-b-black py-8">
          <SessionProvider session={session}>
            <EditPostForm post={post.data} />
          </SessionProvider>
        </div>
      </div>
    </main>
  );
}
