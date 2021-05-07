/* eslint-disable @typescript-eslint/no-shadow */
import { IAppOptions, ErrorKind, IErrorBaseline, IAppErrorConstructor } from "../types";

/**
 * An Error thrown by a application. A string based "code" for the error can be added to errors
 * when throwing but isn't strictly required.
 */
export function createAppError<TCode extends string = string, THttp extends number = number>(
  appName: string,
  defaultOptions: IAppOptions<TCode, THttp> = {}
): IAppErrorConstructor<TCode, THttp> {
  // CLASS DEFINITION
  class AppError<TCode extends string = string, THttp extends number = number>
    extends Error
    implements IErrorBaseline<TCode, THttp> {
    public readonly kind = ErrorKind.AppError;
    public readonly type: string = appName;
    public readonly classification: string;
    public readonly code: TCode;
    public readonly httpCode?: THttp;
    public readonly underlying?: Error | undefined;

    /**
     *
     * @param message a string-based, human friendly message to present to the user; because this is considered an `AppError` the name of the application -- in brackets -- will be prefixed
     * to the text included here in the message
     * @param code A string-based classification of the error; this aligns with the
     * latest versions of Node which has a string based "code". This code will _also_
     * be included as part of the `classification` property
     * @param options a dictionary of params you _can_ but are _not required_ to set
     */
    constructor(
      message: string,
      code: TCode = "app-error" as TCode,
      options: IAppOptions<TCode, THttp> = {}
    ) {
      super(`[ ${appName} ]: ${message}`);
      const opts = { ...defaultOptions, ...options };
      this.type = appName;
      this.code = code;
      this.classification = `${appName}/${code}`;
      if (opts.httpCode) {
        this.httpCode = opts.httpCode as THttp;
      }
    }
  }

  return AppError;
}
