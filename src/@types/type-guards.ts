import { IDictionary } from "common-types";

export function isBrilliantError(error: unknown) {
  return error instanceof Error && (error as IDictionary).kind === "BrilliantError";
}
