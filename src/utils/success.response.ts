import { Response } from "express";

export const successResponse = (
  res: Response,
  {
    message,
    data,
    count,
    access_token,
    refresh_token,
    token,
  }: {
    message: string;
    data?: any;
    count?: number;
    access_token?: string;
    refresh_token?: string;
    token?: string;
  },
  statusCode: number = 200
): void => {
  res.status(statusCode).json({
    success: true,
    message,
    access_token,
    refresh_token,
    token,
    data,
    count,
  });
};

export interface ISuccessResponse {
  status?: boolean;
  message?: string;
  data?: any;
  count?: number;
  access_token?: string;
  token?: string;
  refresh_token?: string;
}
