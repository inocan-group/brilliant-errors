import { ErrorKind, IErrorBaseline, IServerlessError } from "../types";

/**
 * Type guard to detect whether the given error implements
 * the `IServerlessError` interface.
 */
export function isServerlessError(error: unknown): error is IServerlessError {
  return error &&
    typeof error === "object" &&
    (error as IErrorBaseline)?.kind === ErrorKind.ServerlessError
    ? true
    : false;
}
