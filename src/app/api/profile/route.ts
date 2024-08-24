import { authOptions } from "@/lib/auth";
import { editUsernameFormSchema } from "@/lib/form/profile-form";
import { db } from "@/lib/prisma";
import { errorHandler } from "@/utils/error/error-handler";
import { UpdateProfileRequest } from "@/utils/model/profile-model";
import { ResponseError } from "@/utils/response/response";
import { Validation } from "@/utils/validation/validation";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({
      status: "error",
      code: 401,
      message: "Unauthorized",
    });
  }

  const user = session.user;
  const request: UpdateProfileRequest = await req.json();

  try {
    const usernameRequest = Validation.validate(
      editUsernameFormSchema,
      request,
    );

    const isUsernameExist = await db.user.findUnique({
      where: {
        username: usernameRequest.username,
      },
    });

    if (isUsernameExist) {
      throw new ResponseError("error", 400, "Username already exist");
    }

    const updatedUser = await db.user.update({
      where: {
        id: Number(user.id),
      },
      data: {
        username: usernameRequest.username,
      },
    });

    return NextResponse.json({
      status: "success",
      code: 200,
      message: "Username updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    return errorHandler(error as Error);
  }
}
