import type { Response } from "express";

export function successResponse<T>(
  response: Response,
  data: T,
  statusCode = 200,
): void {
  response.status(statusCode).json({
    success: true,
    data,
  });
}

export function errorResponse(
  response: Response,
  message: string,
  statusCode = 400,
): void {
  response.status(statusCode).json({
    success: false,
    error: {
      message,
    },
  });
}
