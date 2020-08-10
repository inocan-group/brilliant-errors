import { IBaseErrorOptions, ErrorKind } from "./index";

export interface IAppOptions<TCode extends string = string, TError extends number = number>
  extends IBaseErrorOptions<TCode, TError> {}

//#region class-interfaces
export interface IAppErrorConstructor<TCode extends string = string, TError extends number = number> {
  new (message: string, code?: TCode, options?: IAppOptions<TCode, TError>): IAppError<TCode, TError>;
}

export interface IAppError<TCode extends string = string, TError extends number = number> extends Error {
  kind: Readonly<ErrorKind.AppError>;
  /**
   * The name of the APP which threw the error
   */
  app: Readonly<string>;
  /**
   * The classification of the error a combination of the app's
   * name and the error code passed in.
   */
  classification: Readonly<string>;
  /**
   * A string based code to classify the error
   */
  code: Readonly<TCode>;
  /**
   * An HTTP Error code; this is not required for an `AppError`'s but may be provided
   * optionally.
   */
  errorCode?: Readonly<TError>;
}
//#endregion class-interfaces

/**
 * An Error thrown by a application. A string based "code" for the error can be added to errors
 * when throwing but isn't strictly required.
 */
export function createAppError<TCode extends string = string, TError extends number = number>(
  appName: string,
  defaultOptions: IAppOptions<TCode, TError> = {}
): IAppErrorConstructor<TCode, TError> {
  // CLASS DEFINITION
  class AppError extends Error implements IAppError<TCode, TError> {
    public readonly kind = ErrorKind.AppError;
    public readonly app: string = appName;
    public readonly classification: string;
    public readonly code: TCode;
    public readonly errorCode?: TError;

    /**
     *
     * @param message a string-based, human friendly message to present to the user; because this is considered an `AppError` the name of the application -- in brackets -- will be prefixed
     * to the text included here in the message
     * @param code A string-based classification of the error; this aligns with the
     * latest versions of Node which has a string based "code". This code will _also_
     * be included as part of the `classification` property
     * @param options a dictionary of params you _can_ but are _not required_ to set
     */
    constructor(message: string, code: TCode = "error" as TCode, options: IAppOptions<TCode, TError> = {}) {
      super(`[ ${appName} ]: ${message}`);
      const opts: IAppOptions<TCode, TError> = { ...defaultOptions, ...options };
      this.code = code;
      this.classification = `${appName}/${code}`;
      if (opts.errorCode) {
        this.errorCode = opts.errorCode;
      }
    }
  }

  return AppError;
}
