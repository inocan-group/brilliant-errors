import { IDictionary } from "common-types";
import { IBrilliantError } from "~/@types";

export function isBrilliantError(
  error: unknown
): error is IBrilliantError<any, any, any, any, any, any> {
  return error instanceof Error && (error as IDictionary).kind === "BrilliantError";
}
