import React, { HTMLAttributes } from "react";

import * as AvatarPrimitive from "@radix-ui/react-avatar";

import { cn } from "@/lib/utils";

interface PostProps extends React.HTMLAttributes<HTMLDivElement> {}

const Post = ({ className, ...props }: PostProps) => (
  <div className={cn("w-full border-b border-b-black", className)} {...props} />
);
Post.displayName = "Post";

interface PostContainerProps extends React.HTMLAttributes<HTMLDivElement> {}

const PostContainer = ({ className, ...props }: PostContainerProps) => (
  <div
    className={cn(
      "mx-auto flex w-full max-w-screen-sm flex-col gap-2 py-8",
      className,
    )}
    {...props}
  />
);
PostContainer.displayName = "PostContainer";

interface PostAuthorProps extends React.HTMLAttributes<HTMLDivElement> {}

const PostAuthor = ({ className, ...props }: PostAuthorProps) => (
  <div className={cn("inline-flex items-center gap-4", className)} {...props} />
);
PostAuthor.displayName = "PostAuthor";

interface PostAuthorAvatarProps
  extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root> {}

const PostAuthorAvatar = ({ className, ...props }: PostAuthorAvatarProps) => (
  <AvatarPrimitive.Root
    className={cn(
      "relative flex h-12 w-12 shrink-0 overflow-hidden rounded-full",
      className,
    )}
    {...props}
  />
);
PostAuthorAvatar.displayName = AvatarPrimitive.Root.displayName;

interface PostAuthorAvatarImageProps
  extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image> {}

const PostAuthorAvatarImage = ({
  className,
  ...props
}: PostAuthorAvatarImageProps) => (
  <AvatarPrimitive.Image
    className={cn("aspect-square h-full w-full", className)}
    {...props}
  />
);
PostAuthorAvatarImage.displayName = AvatarPrimitive.Image.displayName;

interface PostAuthorAvatarFallbackProps
  extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback> {}

const PostAuthorAvatarFallback = ({
  className,
  ...props
}: PostAuthorAvatarFallbackProps) => (
  <AvatarPrimitive.Fallback
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted",
      className,
    )}
    {...props}
  />
);
PostAuthorAvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

interface PostAuthorContainerProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const PostAuthorContainer = ({
  className,
  ...props
}: PostAuthorContainerProps) => (
  <div className={cn("flex flex-col gap-1", className)} {...props} />
);
PostAuthorContainer.displayName = "PostAuthorContainer";

interface PostAuthorNameProps
  extends React.HTMLAttributes<HTMLHeadingElement> {}

const PostAuthorName = ({ className, ...props }: PostAuthorNameProps) => (
  <h1
    className={cn("text-lg font-medium leading-none", className)}
    {...props}
  />
);
PostAuthorName.displayName = "PostAuthorName";

interface PostAuthorUsernameProps
  extends React.HTMLAttributes<HTMLHeadingElement> {}

const PostAuthorUsername = ({
  className,
  ...props
}: PostAuthorUsernameProps) => (
  <h5
    className={cn("text-sm leading-none text-muted-foreground", className)}
    {...props}
  />
);
PostAuthorUsername.displayName = "PostAuthorUsername";

interface PostContentProps extends React.HTMLAttributes<HTMLParagraphElement> {}

const PostContent = ({ className, ...props }: PostContentProps) => (
  <p className={cn("ml-16", className)} {...props} />
);
PostContent.displayName = "PostContent";

export {
  Post,
  PostContainer,
  PostAuthor,
  PostAuthorAvatar,
  PostAuthorAvatarImage,
  PostAuthorAvatarFallback,
  PostAuthorContainer,
  PostAuthorName,
  PostAuthorUsername,
  PostContent,
};
