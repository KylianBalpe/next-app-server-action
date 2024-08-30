export type CreatePostRequest = {
  content: string;
};

export type UpdatePostRequest = {
  content: string;
};

export type PostsType = {
  author: {
    id: number;
    name: string | null;
    username: string | null;
    image: string | null;
  };
} & {
  id: number;
  content: string;
  authorId: number;
  deletedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
};
