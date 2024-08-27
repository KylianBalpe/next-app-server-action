"use server";

import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { authOptions } from "@/lib/auth";
import { UpdateProfileRequest } from "@/utils/model/profile-model";

const API_URL = process.env.API_URL;

export const updateUsername = async (request: UpdateProfileRequest) => {
  const session = await getServerSession(authOptions);

  try {
    const res = await fetch(`${API_URL}/profile`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: request, session }),
    });

    revalidatePath("/profile", "page");
    return res.json();
  } catch (error) {
    console.error(error);
  }
};
