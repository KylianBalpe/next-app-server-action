import { authOptions } from "@/lib/auth";
import { CreatePostFormSchema } from "@/lib/form/post-form";
import { db } from "@/lib/prisma";
import { errorHandler } from "@/utils/error/error-handler";
import { CreatePostRequest } from "@/utils/model/post-model";
import { Validation } from "@/utils/validation/validation";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const request = await req.json();

  if (!request.session) {
    return NextResponse.json({
      status: "error",
      code: 401,
      message: "Unauthorized",
    });
  }

  try {
    const createRequest: CreatePostRequest = Validation.validate(
      CreatePostFormSchema,
      request.content,
    );

    await db.post.create({
      data: {
        content: createRequest.content,
        authorId: request.session.user.id,
      },
    });

    return NextResponse.json({
      status: "success",
      code: 201,
      message: "Post created successfully",
    });
  } catch (error) {
    return errorHandler(error as Error);
  }
}

export async function GET() {
  try {
    const posts = await db.post.findMany({
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

    return NextResponse.json({
      status: "success",
      code: 200,
      data: posts,
    });
  } catch (error) {
    return errorHandler(error as Error);
  }
}
