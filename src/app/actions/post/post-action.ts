"use server";

import { CreatePostRequest, UpdatePostRequest } from "@/utils/model/post-model";
import { revalidateTag } from "next/cache";
import { db } from "@/lib/prisma";
import { Validation } from "@/utils/validation/validation";
import { CreatePostFormSchema, EditPostFormSchema } from "@/lib/form/post-form";
import { cache } from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const isPostExist = async (id: number) => {
  return await db.post.findUnique({
    where: {
      id,
      deletedAt: null,
    },
  });
};

export const createPost = async (
  request: CreatePostRequest,
  userId: string,
) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return {
      ok: false,
      status: 401,
      message: "Unauthorized",
    };
  }

  try {
    const createRequest = Validation.validate(CreatePostFormSchema, request);

    const post = await db.post.create({
      data: {
        content: createRequest.content,
        authorId: Number(userId),
      },
    });

    revalidateTag("posts");

    return {
      ok: true,
      status: 201,
      message: "Post created successfully",
      data: post,
    };
  } catch (error) {
    console.error(error);
  }
};

export const fetchPosts = cache(async () => {
  try {
    const posts = await db.post.findMany({
      where: {
        deletedAt: null,
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            username: true,
            image: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return {
      ok: true,
      status: 200,
      message: "Posts fetched successfully",
      data: posts,
    };
  } catch (error) {
    console.error(error);
  }
});

export const getPost = async (id: number) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return {
      ok: false,
      status: 401,
      message: "Unauthorized",
    };
  }

  try {
    const postExist = await isPostExist(id);

    if (!postExist) {
      return {
        ok: false,
        status: 404,
        message: "Post not found",
      };
    }

    if (postExist.authorId !== Number(session.user.id)) {
      return {
        ok: false,
        status: 403,
        message: "Forbidden",
      };
    }

    const post = await db.post.findUnique({
      where: {
        id,
        deletedAt: null,
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            username: true,
            image: true,
          },
        },
      },
    });

    return {
      ok: true,
      status: 200,
      message: "Post fetched successfully",
      data: post,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updatePost = async (request: UpdatePostRequest, id: number) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return {
      ok: false,
      status: 401,
      message: "Unauthorized",
    };
  }

  try {
    const postExist = await isPostExist(id);

    if (!postExist) {
      return {
        ok: false,
        status: 404,
        message: "Post not found",
      };
    }

    if (postExist.authorId !== Number(session.user.id)) {
      return {
        ok: false,
        status: 403,
        message: "Forbidden",
      };
    }

    const updateRequest = Validation.validate(EditPostFormSchema, request);

    const post = await db.post.update({
      where: {
        id,
      },
      data: {
        content: updateRequest.content,
      },
    });

    revalidateTag("posts");

    return {
      ok: true,
      status: 200,
      message: "Post updated successfully",
      data: post,
    };
  } catch (error) {
    console.error(error);
  }
};

export const deletePost = async (id: number) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return {
      ok: false,
      status: 401,
      message: "Unauthorized",
    };
  }

  try {
    const postExist = await isPostExist(id);

    if (!postExist) {
      return {
        ok: false,
        status: 404,
        message: "Post not found",
      };
    }

    if (postExist.authorId !== Number(session.user.id)) {
      return {
        ok: false,
        status: 403,
        message: "Forbidden",
      };
    }

    const post = await db.post.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
      },
    });

    revalidateTag("posts");

    return {
      ok: true,
      status: 200,
      message: "Post deleted successfully",
      data: post,
    };
  } catch (error) {
    console.error(error);
  }
};

export const getPostsByAuthor = async (username: string) => {
  try {
    const author = await db.user.findUnique({
      where: {
        username,
      },
    });

    if (!author) {
      return {
        ok: false,
        status: 404,
        message: "Author not found",
      };
    }

    const posts = await db.post.findMany({
      where: {
        authorId: author.id,
        deletedAt: null,
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            username: true,
            image: true,
          },
        },
      },
    });

    return {
      ok: true,
      status: 200,
      message: "Posts fetched successfully",
      data: posts,
    };
  } catch (error) {
    console.error(error);
  }
};
