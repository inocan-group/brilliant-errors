export type IDictionary<T = any> = {
  [key: string]: T;
};

export enum ErrorKind {
  AppError = "AppError",
  LibraryError = "LibraryError",
  ApiGatewayError = "ApiGatewayError",
}

export interface IExtendedError extends Error {
  kind?: string;
  code: string;
  errorCode?: number;
  errorMessage?: string;
}

export interface IBaseErrorOptions<TCodes extends string = string, TErrors extends number = number> {
  /** the default error code */
  errorCode?: TErrors;
  /**
   * allows passing in a callback function to modify the stack string into an array of strings
   */
  stackCallback?: (stack: string) => string[];
  /**
   * Proxy an already thrown error. This will ensure that the original
   * error's message is added to the end of the message as well as that the original
   * errors stack is included as the stack and the `wrappedStack` property is assigned
   * the full stack trace
   */
  proxy?: Error | IExtendedError;
}
