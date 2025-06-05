import { Response, NextFunction } from "express";

export const handleServiceError = (
  error: any,
  res: Response,
  next: NextFunction,
): void => {
  console.error("Service error:", error);
  res.status(500).json({ error: "An internal server error occurred." });
};
