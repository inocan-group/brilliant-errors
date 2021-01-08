import { isAppError } from ".";
import { IAppError, ILibraryError, IServerlessError } from "../types";
import { isLibraryError } from "./isLibraryError";
import { isServerlessError } from "./isServerlessError";

export function isBrilliantError(
  error: unknown
): error is ILibraryError | IAppError | IServerlessError {
  return isLibraryError(error) || isServerlessError(error) || isAppError(error);
}
