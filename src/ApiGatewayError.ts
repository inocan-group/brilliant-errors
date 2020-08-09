import { ErrorKind, IBaseErrorOptions, IExtendedError } from "./types";

export interface IApiGatewayOptions<TCodes extends string = string, TErrors extends number = number>
  extends IBaseErrorOptions<TCodes, TErrors> {
  fnParams?: any[];
}

export function createApiGatewayError<TCodes extends string = string, TErrors extends number = number>(
  fnName: string,
  defaultOptions: IApiGatewayOptions<TCodes, TErrors> = {}
) {
  /**
   * An Error thrown by a application which does _not_ require a numeric
   * HTTP error code on each throw. You may, however, include one where appropriate,
   * and you have the option when configuring the error to state a "default" HTTP code
   * (though no default will be provided unless you state it)
   */
  class ApiGatewayError extends Error implements IExtendedError {
    public readonly kind = ErrorKind.ApiGatewayError;
    /**
     * The name of the function which threw the error
     */
    public fn: string = fnName;
    /**
     * The classification of the error a combination of the app's
     * name and the error code passed in.
     */
    public classification: string;
    /**
     * A string based code to classify the error
     */
    public code: TCodes;
    /**
     * An HTTP Error code; this is not required for an `AppError`'s but may be provided
     * optionally.
     */
    public errorCode?: TErrors;

    /**
     *
     * @param message a string-based, human friendly message to present to the user; because this is considered an `AppError` the name of the application -- in brackets -- will be prefixed
     * to the text included here in the message
     * @param code A string-based classification of the error; this aligns with the
     * latest versions of Node which has a string based "code". This code will _also_
     * be included as part of the `classification` property
     * @param options a dictionary of params you _can_ but are _not required_ to set
     */
    constructor(message: string, code: TCodes = "error" as TCodes, options: IApiGatewayOptions<TCodes, TErrors> = {}) {
      super(`[ ${fnName}() ]: ${message}`);
      const opts: IApiGatewayOptions<TCodes, TErrors> = { ...defaultOptions, ...options };
      this.code = code;
      this.classification = `${fnName}/${code}`;
      if (opts.errorCode) {
        this.errorCode = opts.errorCode;
      }
    }
  }

  return ApiGatewayError;
}
