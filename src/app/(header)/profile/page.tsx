import {
  Post,
  PostAuthor,
  PostAuthorAvatar,
  PostAuthorAvatarFallback,
  PostAuthorAvatarImage,
  PostAuthorContainer,
  PostAuthorName,
  PostAuthorUsername,
  PostContainer,
  PostContent,
} from "@/components/post/post";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import EditProfile from "@/components/profile/edit-profile";
import { redirect } from "next/navigation";
import { getPostsByAuthor } from "@/app/actions/post/post-action";
import PostMenu from "@/components/post/post-menu";
import AddPostForm from "@/components/post/add-form";
import SessionProvider from "@/components/session-provider";

export default async function Page() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }

  const posts = await getPostsByAuthor(session.user.username);

  return (
    <main className="mx-auto min-h-screen w-full max-w-screen-lg items-center">
      <div className="flex min-h-screen w-full flex-col border-x border-black">
        <div className="w-full space-y-4 p-8">
          <Avatar className="mx-auto h-40 w-40 rounded-full border border-black">
            <AvatarImage
              src={session.user.image || "https://github.com/shadcn.png"}
              className="overflow-hidden rounded-full"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-0">
            <h3 className="text-center text-2xl font-bold">
              {session.user.name}
            </h3>
            <h5 className="text-center text-lg text-gray-500">
              {session.user.username}
            </h5>
          </div>
        </div>
        <EditProfile session={session} />
        <div className="border-t border-t-black" />
        <div className="w-full border-b border-b-black py-8">
          <SessionProvider session={session}>
            <AddPostForm />
          </SessionProvider>
        </div>
        {posts?.data?.map((post) => (
          <Post key={post.id}>
            <PostContainer>
              <PostAuthor>
                <PostAuthorAvatar>
                  <PostAuthorAvatarImage
                    src={session.user.image || "https://github.com/shadcn.png"}
                  />
                  <PostAuthorAvatarFallback>BP</PostAuthorAvatarFallback>
                </PostAuthorAvatar>
                <div className="inline-flex w-full items-center justify-between">
                  <PostAuthorContainer>
                    <PostAuthorName>{post.author.name}</PostAuthorName>
                    <PostAuthorUsername>
                      {post.author.username}
                    </PostAuthorUsername>
                  </PostAuthorContainer>
                  <PostMenu
                    postAuthor={post.author.username!}
                    postId={post.id}
                    session={session}
                  />
                </div>
              </PostAuthor>
              <PostContent>{post.content}</PostContent>
            </PostContainer>
          </Post>
        ))}
      </div>
    </main>
  );
}
