"use server";

import { CreatePostRequest } from "@/utils/model/post-model";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
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

    revalidatePath("/", "page");
    return res.json();
  } catch (error) {
    console.error(error);
  }
};

export const fetchPosts = async () => {
  try {
    const res = await fetch(`${API_URL}/post`, {
      method: "GET",
    });

    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error(error);
  }
};
