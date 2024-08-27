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
import PostMenu from "@/components/post/post-menu";

export default async function Page() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }
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
        <Post>
          <PostContainer>
            <PostAuthor>
              <PostAuthorAvatar>
                <PostAuthorAvatarImage src="https://github.com/shadcn.png" />
                <PostAuthorAvatarFallback>BP</PostAuthorAvatarFallback>
              </PostAuthorAvatar>
              <div className="inline-flex w-full items-center justify-between">
                <PostAuthorContainer>
                  <PostAuthorName>Bejir</PostAuthorName>
                  <PostAuthorUsername>geming</PostAuthorUsername>
                </PostAuthorContainer>
                <PostMenu />
              </div>
            </PostAuthor>
            <PostContent>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint
              perspiciatis quis eligendi adipisci alias ducimus cumque
              laudantium non dignissimos omnis commodi soluta veritatis voluptas
              quibusdam sit minus, perferendis modi? Officia quos ducimus,
              sapiente unde cupiditate autem consequuntur ab nemo voluptatum qui
              id exercitationem quaerat? Voluptatem earum modi eveniet nam
              adipisci.
            </PostContent>
          </PostContainer>
        </Post>
      </div>
    </main>
  );
}
