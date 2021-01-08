import { ErrorKind, IAppError, IErrorBaseline } from "../types";

/**
 * Type guard to detect whether the given error which implements
 * the `AppyError` interface.
 */
export function isAppError(error: unknown): error is IAppError {
  return error &&
    typeof error === "object" &&
    (error as IErrorBaseline)?.kind === ErrorKind.AppError
    ? true
    : false;
}
