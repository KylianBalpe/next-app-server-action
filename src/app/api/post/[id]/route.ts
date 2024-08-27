import { authOptions } from "@/lib/auth";
import { db } from "@/lib/prisma";
import { errorHandler } from "@/utils/error/error-handler";
import { ResponseError } from "@/utils/response/response";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

const isPostExist = async (id: number) => {
  return await db.post.findUnique({
    where: {
      id,
      deletedAt: null,
    },
  });
};

export async function GET({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({
      status: "error",
      code: 401,
      message: "Unauthorized",
    });
  }

  try {
    const post = await isPostExist(Number(params.id));

    if (!post) {
      throw new ResponseError("error", 404, "Post not found");
    }

    return NextResponse.json({
      status: "success",
      code: 200,
      message: "Post retrieved successfully",
      data: post,
    });
  } catch (error) {
    return errorHandler(error as Error);
  }
}

// export async function PUT() {}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } },
) {
  const request = await req.json();

  if (!request.user) {
    return NextResponse.json({
      status: "error",
      code: 401,
      message: "Unauthorized",
    });
  }

  try {
    const post = await isPostExist(Number(params.id));

    if (!post) {
      throw new ResponseError("error", 404, "Post not found");
    }

    await db.post.update({
      where: {
        id: post.id,
      },
      data: {
        deletedAt: new Date(),
      },
    });

    return NextResponse.json({
      status: "success",
      code: 200,
      message: "Post deleted successfully",
    });
  } catch (error) {
    return errorHandler(error as Error);
  }
}
