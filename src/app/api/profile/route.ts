import { editUsernameFormSchema } from "@/lib/form/profile-form";
import { db } from "@/lib/prisma";
import { errorHandler } from "@/utils/error/error-handler";
import { UpdateProfileRequest } from "@/utils/model/profile-model";
import { ResponseError } from "@/utils/response/response";
import { Validation } from "@/utils/validation/validation";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  const request = await req.json();

  if (!request.session) {
    return NextResponse.json({
      status: "error",
      code: 401,
      message: "Unauthorized",
    });
  }

  try {
    const usernameRequest: UpdateProfileRequest = Validation.validate(
      editUsernameFormSchema,
      request.username,
    );

    const isUsernameExist = await db.user.findUnique({
      where: {
        username: usernameRequest.username,
      },
    });

    if (isUsernameExist) {
      throw new ResponseError("error", 400, "Username already exist");
    }

    await db.user.update({
      where: {
        id: request.session.user.id,
      },
      data: {
        username: usernameRequest.username,
      },
    });

    return NextResponse.json({
      status: "success",
      code: 200,
      message: "Username updated successfully",
    });
  } catch (error) {
    return errorHandler(error as Error);
  }
}
