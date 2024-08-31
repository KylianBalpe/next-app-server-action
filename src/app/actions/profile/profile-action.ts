"use server";

import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { authOptions } from "@/lib/auth";
import { UpdateProfileRequest } from "@/utils/model/profile-model";
import { Validation } from "@/utils/validation/validation";
import { EditUsernameFormSchema } from "@/lib/form/profile-form";
import { db } from "@/lib/prisma";

export const updateUsername = async (request: UpdateProfileRequest) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return {
      ok: false,
      status: 401,
      message: "Unauthorized",
    };
  }

  try {
    const usernameRequest = Validation.validate(
      EditUsernameFormSchema,
      request,
    );

    const isUsernameExist = await db.user.findUnique({
      where: {
        username: usernameRequest.username,
      },
    });

    if (isUsernameExist) {
      return {
        ok: false,
        status: 400,
        message: "Username already exist",
      };
    }

    await db.user.update({
      where: {
        id: Number(session.user.id),
      },
      data: {
        username: usernameRequest.username,
      },
    });

    revalidatePath("/profile");

    return {
      ok: true,
      status: 200,
      message: "Username updated successfully",
    };
  } catch (error) {
    console.error(error);
  }
};

export const getUsername = async (username: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        username,
      },
    });

    if (!user) {
      return {
        ok: false,
        status: 404,
        message: "User not found",
      };
    }

    return {
      ok: true,
      status: 200,
      message: "User found",
      data: user,
    };
  } catch (error) {
    console.error(error);
  }
};
