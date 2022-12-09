import { IBrilliantError } from "src/@types";

export function isBrilliantError(
  error: unknown
): error is IBrilliantError<any, any, any, any, any, any> {
  return error instanceof Error && (error as any).kind === "BrilliantError";
}

export type BrilliantErrorTypeGuard = typeof isBrilliantError;
