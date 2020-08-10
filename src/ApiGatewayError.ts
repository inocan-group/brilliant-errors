import { ErrorKind, IBaseErrorOptions, IExtendedError } from "./types";

export interface IApiGatewayOptions<TCode extends string = string, TError extends number = number>
  extends IBaseErrorOptions<TCode, TError> {
  fnParams?: any[];
  code?: TCode;
}

//#region class-interfaces
export interface IApiGatewayErrorConstructor<TCode extends string = string, TError extends number = number> {
  new (errorCode: TError, errorMessage: string, options?: IApiGatewayOptions<TCode, TError>): IApiGatewayError<
    TCode,
    TError
  >;
}

export interface IApiGatewayError<TCode extends string = string, TError extends number = number> extends Error {
  kind: Readonly<ErrorKind.ApiGatewayError>;
  /**
   * The name of the serverless project / repo
   */
  projectName: Readonly<string>;
  /**
   * The name of the function that was executing
   */
  fnName: Readonly<string>;
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
  errorCode: Readonly<TError>;
  /** human friendly error message */
  errorMessage: Readonly<string>;
}
//#endregion class-interfaces

/**
 * An Error thrown by a application which does _not_ require a numeric
 * HTTP error code on each throw. You may, however, include one where appropriate,
 * and you have the option when configuring the error to state a "default" HTTP code
 * (though no default will be provided unless you state it)
 */
export function createApiGatewayError<TCode extends string = string, TError extends number = number>(
  projectName: string,
  fnName: string,
  defaultOptions: IApiGatewayOptions<TCode, TError> = {}
): IApiGatewayErrorConstructor<TCode, TError> {
  // CLASS DEFINITION
  class ApiGatewayError extends Error implements IApiGatewayError<TCode, TError> {
    public readonly kind = ErrorKind.ApiGatewayError;
    public readonly projectName: string = projectName;
    public readonly fnName: string = fnName;
    public readonly classification: string;
    public readonly code: Readonly<TCode>;
    public readonly errorCode: Readonly<TError>;
    public readonly errorMessage: Readonly<string>;

    /**
     * **ApiGatewayError**
     *
     * @param errorCode the numeric HTTP code for this error
     * @param message a string-based, human friendly message
     * @param options a dictionary of params you _can_ but are _not required_ to set
     */
    constructor(errorCode: TError, errorMessage: string, options: IApiGatewayOptions<TCode, TError> = {}) {
      super(`[ ${projectName}.${fnName}() / ${String(errorCode)} ]: ${errorMessage}`);
      const opts: IApiGatewayOptions<TCode, TError> = { ...defaultOptions, ...options };
      this.code = opts.code || ("error" as TCode);
      this.classification = `${projectName}/${fnName}`;
      this.errorCode = errorCode;
      this.errorMessage = `[ ${projectName}.${fnName}() / ${String(errorCode)} ]: ${errorMessage}`;
    }
  }

  return ApiGatewayError;
}
