import { IServerlessError } from "../types";
import { isServerlessError } from "./isServerlessError";

/**
 * A type guard which tests not only for whether the error is a
 * `IServerlessError` but that the calling function is stated as
 * being API Gateway.
 */
export function isApiGatewayError(
  error: unknown
): error is IServerlessError & { isApiGatewayError: true } {
  return isServerlessError(error) && error.isApiGatewayRequest === true;
}
