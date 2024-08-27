import { PostsType } from "@/utils/model/post-model";
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
import PostMenu from "@/components/post/post-menu";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export default async function Posts({ posts }: { posts: PostsType[] }) {
  const session = await getServerSession(authOptions);

  return posts.map((post: PostsType) => (
    <Post key={post.id}>
      <PostContainer>
        <PostAuthor>
          <PostAuthorAvatar>
            <PostAuthorAvatarImage src={post.author.image} />
            <PostAuthorAvatarFallback>BP</PostAuthorAvatarFallback>
          </PostAuthorAvatar>
          <div className="inline-flex w-full items-center justify-between">
            <PostAuthorContainer>
              <PostAuthorName>{post.author.name}</PostAuthorName>
              <PostAuthorUsername>{post.author.username}</PostAuthorUsername>
            </PostAuthorContainer>
            <PostMenu
              postId={post.id}
              postAuthor={post.author.username}
              session={session!}
            />
          </div>
        </PostAuthor>
        <PostContent>{post.content}</PostContent>
      </PostContainer>
    </Post>
  ));
}
