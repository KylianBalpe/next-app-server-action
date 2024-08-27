import EditPostForm from "@/components/post/edit-form";
import { getPost } from "@/lib/action/post-action";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

export default async function Page({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/");
  }
  const post = await getPost(Number(params.id));
  console.log(post);

  return <div>Edit Post</div>;
}
