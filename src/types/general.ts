export type IDictionary<T = any> = {
  [key: string]: T;
};

export enum ErrorKind {
  AppError = "AppError",
  LibraryError = "LibraryError",
  ServerlessError = "ServerlessError",
}

// #region ERROR BASELINE
/**
 * All Brilliant Errors provide at least this baseline of
 * information
 */
export interface IErrorBaseline<
  /**
   * by default allows all strings but can be defined to be
   * a constrained set of strings
   */
  TCode extends string = string,
  /**
   * By default it allows any numeric HTTP Code but this can
   * be constrained at configuration time to limit the scope
   * of possible HTTP Codes
   */
  THttp extends number = number,
  TUnderlying extends Error = Error
> extends Error {
  /**
   * An error's `name` -- as a matter of preference -- will
   * use the underlying error's class name if it's available.
   * If no error is being wrapped, then the `type` property will
   * be used in lieu of a name being provided explicitly at
   * run-time.
   *
   * For example, given the following configuration:
   *
   * ```ts
   * export default MyError = createAppError('MyError', {...});
   * try {
   *   // the name will be "MyError"
   *   if(someCondition) {
   *     throw MyError('bad stuff happpened', 'bad-juju');
   *   }
   * } catch(e) {
   *   // the name is the underlying error's name
   *   // whereas the "type" still maintains the "MyError" value
   *   throw MyError.from(e, { ... })
   * }
   * ```
   */
  name: ErrorType;

  type: string;

  /**
   * indicates the "family" of error type from `brilliant-errors`
   * which this error originates.
   */
  kind: Readonly<ErrorKind>;
  /**
   * A string based code to classify the error
   */
  code: Readonly<TCode>;
  /**
   * The numeric HTTP error code associated with this error
   */
  httpCode?: Readonly<THttp>;
  /**
   * The underlying error which this error is wrapping; if any.
   */
  underlying?: TUnderlying;
  /**
   * The classification of the error a combination of the App/Library/Function's
   * name and the error code passed in.
   */
  classification: Readonly<string>;
}
// #endregion

/**
 * Options available to all brilliant errors
 */
export interface IBaseErrorOptions<
  TCode extends string = string,
  THttp extends number = number,
  TUnderlying extends Error = Error
> {
  /** the default error code */
  httpCode?: THttp;
  /**
   * allows passing in a callback function to modify the stack
   * string into an array of strings
   */
  stackCallback?: (stack: string) => string[];
  /**
   * An underlying error which has been wrapped by a brilliant error
   */
  underlying?: TUnderlying;
}

export interface IApiGatewayError {
  isBase64Encoded: boolean;
  statusCode: number;
  headers: Record<string, any> & { "X-Amzn-ErrorType": string };
  body: string;
}

/**
 * a full list of valid JS error types but includes
 * a generic so that a brilliant error without an underlying
 * error can add itself.
 */
export type ErrorType<T extends string = string> =
  | "EvalError"
  | "InternalError"
  | "RangeError"
  /** misspelled language keywords */
  | "SyntaxError"
  | "TypeError"
  | "URIError"
  | "AggregateError"
  /**
   * A browser-only error which is thrown when problems with
   * Web API's or DOM manipulation occur
   */
  | "DOMException"
  | T;
