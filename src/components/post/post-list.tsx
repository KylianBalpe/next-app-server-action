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

export default function Posts({ posts }: { posts: PostsType[] }) {
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
            <PostMenu />
          </div>
        </PostAuthor>
        <PostContent>{post.content}</PostContent>
      </PostContainer>
    </Post>
  ));
}
