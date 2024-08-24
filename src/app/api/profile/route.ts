import { authOptions } from "@/lib/auth";
import { editProfileFormSchema } from "@/lib/form/profile-form";
import { db } from "@/lib/prisma";
import { errorHandler } from "@/utils/error/error-handler";
import { ResponseError } from "@/utils/response/response";
import { Validation } from "@/utils/validation/validation";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({
      status: "error",
      code: 401,
      message: "Unauthorized",
    });
  }

  const user = session.user;
  const request = await req.json();

  try {
    const updateRequest = Validation.validate(editProfileFormSchema, request);

    const isUsernameExist = await db.user.findFirst({
      where: {
        username: updateRequest.username,
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
        ...updateRequest,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    errorHandler(error as Error);
  }
}
