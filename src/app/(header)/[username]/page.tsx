import React from "react";

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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { redirect } from "next/navigation";
import { getPostsByAuthor } from "@/app/actions/post/post-action";
import { getUsername } from "@/app/actions/profile/profile-action";

export default async function Page({
  params,
}: {
  params: { username: string };
}) {
  const session = await getServerSession(authOptions);
  if (session?.user.username === params.username) redirect("/profile");

  const user = await getUsername(params.username);
  if (!user?.data) {
    return (
      <main className="mx-auto flex min-h-screen w-full max-w-screen-lg flex-col items-center">
        <div className="flex min-h-screen w-full flex-col border-x border-black">
          <div className="w-full space-y-4 p-8 text-center">
            <h3 className="text-2xl font-bold">User not found</h3>
          </div>
        </div>
      </main>
    );
  }

  const posts = await getPostsByAuthor(user.data.username!);

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-screen-lg flex-col items-center">
      <div className="flex min-h-screen w-full flex-col border-x border-black">
        <div className="w-full space-y-4 p-8">
          <Avatar className="mx-auto h-40 w-40 rounded-full border border-black">
            <AvatarImage
              src={user.data.image || "https://github.com/shadcn.png"}
              className="overflow-hidden rounded-full"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-0">
            <h3 className="text-center text-2xl font-bold">{user.data.name}</h3>
            <h5 className="text-center text-lg text-gray-500">
              {user.data.username}
            </h5>
          </div>
        </div>
        <div className="border-t border-t-black" />
        {posts?.data?.map((post) => (
          <Post key={post.id}>
            <PostContainer>
              <PostAuthor>
                <PostAuthorAvatar>
                  <PostAuthorAvatarImage
                    src={post.author.image || "https://github.com/shadcn.png"}
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
