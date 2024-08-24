import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { ResponseError } from "../response/response";

export const errorHandler = (error: Error) => {
  if (error instanceof ZodError) {
    return NextResponse.json({
      status: "error",
      code: 400,
      message: "Validation Error",
      errors: error.errors.map((error) => {
        return error.message;
      }),
    });
  } else if (error instanceof ResponseError) {
    return NextResponse.json({
      status: "error",
      code: error.code,
      message: error.message,
    });
  } else {
    return NextResponse.json({
      status: "error",
      code: 500,
      message: "Internal Server Error",
    });
  }
};
