export type CreatePostRequest = {
  content: string;
};

export type PostsType = {
  id: number;
  content: string;
  authorId: number;
  author: {
    id: number;
    name: string;
    username: string;
    image: string;
  };
};
