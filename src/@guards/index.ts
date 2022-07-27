import { IDictionary } from "common-types";
import { IBrilliantError } from "src/@types";

export function isBrilliantError(
  error: unknown
): error is IBrilliantError<any, any, any, any, any, any> {
  return error instanceof Error && (error as IDictionary).kind === "BrilliantError";
}

export type BrillianErrorTypeGuard = typeof isBrilliantError;
