"use server";

import { CreatePostRequest } from "@/utils/model/post-model";
import { getServerSession } from "next-auth";
import { revalidatePath, revalidateTag } from "next/cache";
import { authOptions } from "@/lib/auth";

const API_URL = process.env.API_URL;

export const createPost = async (request: CreatePostRequest) => {
  const session = await getServerSession(authOptions);

  try {
    const res = await fetch(`${API_URL}/post`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content: request, session }),
    });

    // revalidatePath("/", "page");
    revalidateTag("posts");
    return res.json();
  } catch (error) {
    console.error(error);
  }
};

export const fetchPosts = async () => {
  try {
    const res = await fetch(`${API_URL}/post`, {
      method: "GET",
      next: { tags: ["posts"] },
    });

    const data = await res.json();

    return data.data;
  } catch (error) {
    console.error(error);
  }
};

export const getPost = async (id: number) => {
  try {
    const res = await fetch(`${API_URL}/post/${id}`, {
      method: "GET",
      credentials: "include",
    });

    return res.json();
  } catch (error) {
    console.error(error);
  }
};

export const deletePost = async (id: number) => {
  const session = await getServerSession(authOptions);

  try {
    const res = await fetch(`${API_URL}/post/${id}`, {
      method: "PATCH",
      body: JSON.stringify(session),
    });

    const response = await res.json();

    // revalidatePath("/", "page");
    revalidateTag("posts");
    return response;
  } catch (error) {
    console.error(error);
  }
};
