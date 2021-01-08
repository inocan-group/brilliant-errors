import { ErrorKind, IErrorBaseline, ILibraryError } from "../types";

/**
 * Type guard to detect whether the given error which implements
 * the `ILibraryError` interface.
 */
export function isLibraryError(error: unknown): error is ILibraryError {
  return error &&
    typeof error === "object" &&
    (error as IErrorBaseline)?.kind === ErrorKind.LibraryError
    ? true
    : false;
}
