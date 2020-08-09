import { IDictionary, ErrorKind } from "./types";

export interface IAppOptions<T extends Error = Error> {
  errorCode?: number;
  stackCallback?: (stack: string) => string[];
  /**
   * Proxy an already thrown error. This will ensure that the original
   * error's message is added to end of this message as well as
   *
   */
  proxy?: T;
}

export function createAppError<TCode extends string = string>(
  appName: string,
  defaultOptions: Omit<IAppOptions, "proxy"> = {}
) {
  /**
   * An Error thrown by a application which does _not_ require a numeric
   * HTTP error code on each throw. You may, however, include one where appropriate,
   * and you have the option when configuring the error to state a "default" HTTP code
   * (though no default will be provided unless you state it)
   */
  class AppError extends Error {
    public readonly kind = ErrorKind.AppError;
    /**
     * The name of the APP which threw the error
     */
    public app: string = appName;
    /**
     * The classification of the error a combination of the app's
     * name and the error code passed in.
     */
    public classification: string;
    /**
     * A string based code to classify the error
     */
    public code: TCode;
    /**
     * An HTTP Error code; this is not required for an `AppError`'s but may be provided
     * optionally.
     */
    public errorCode?: number;

    /**
     *
     * @param message a string-based, human friendly message to present to the user; because this is considered an `AppError` the name of the application -- in brackets -- will be prefixed
     * to the text included here in the message
     * @param code A string-based classification of the error; this aligns with the
     * latest versions of Node which has a string based "code". This code will _also_
     * be included as part of the `classification` property
     * @param options a dictionary of params you _can_ but are _not required_ to set
     */
    constructor(message: string, code: TCode = "error" as TCode, options: IAppOptions = {}) {
      super(`[ ${appName} ]: ${message}`);
      const opts: IAppOptions = { ...defaultOptions, ...options };
      this.code = code;
      this.classification = `${appName}/${code}`;
      if (opts.errorCode) {
        this.errorCode = opts.errorCode;
      }
    }
  }

  return AppError;
}
