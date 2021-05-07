import {
  ErrorKind,
  IServerlessConfig,
  IServerlessError,
  IServerlessErrorConstructor,
  IServerlessOptions,
} from "../types";

export function createServerlessError<
  /** a string based error code */
  TCode extends string = string,
  /**
   * a numeric error code that will be mapped to the HTTP
   * error code aligned to this error
   */
  THttp extends number = number,
  TRequest = unknown
>(
  /**
   * The error's type; the type will also be used as the name if
   * the error is _not_ wrapping
   */
  type: string,
  /**
   * Default options for the error class
   */
  defaultOptions: IServerlessConfig<TCode, THttp> = {}
): IServerlessErrorConstructor<TCode, THttp> {
  /**
   * An error associated with Serverless functions.
   */
  class ServerlessError extends Error implements IServerlessError<TCode, THttp, TRequest> {
    public readonly name = type;
    public readonly type = type;
    public readonly kind = ErrorKind.ServerlessError;
    public handlerFn: string;
    public classification: string;
    public code: Readonly<TCode>;
    public httpCode?: Readonly<THttp>;
    public isApiGatewayRequest: boolean = false;
    public request?: TRequest;

    /**
     * The `from()` static initializer allows a conventient signature
     * for use-cases where an underlying error is being wrapped by a
     * Serverless Error.
     */
    static from<TUnderlying extends Error>(
      err: TUnderlying,
      /** a textual code for the error being thrown */
      code: TCode,
      /**
       * Additional characteristics which should be added
       * to the error.
       */
      options: {}
    ) {
      const se = new ServerlessError(err.message, code, {
        name: err.name || type,
        underlying: err,
      });

      return se;
    }

    /**
     * **Constructor**
     *
     * @param message a string-based, human friendly message to present to the user
     * @param code A string-based classification of the error; this aligns with the
     * latest versions of Node which has a string based "code". This code will _also_
     * be included as part of the `classification` property
     * @param options a dictionary of params you _can_ but are _not required_ to set;
     * this includes setting the `httpCode` which is a numeric HTTP error code (if not
     * set then the default HTTP code will be used)
     */
    constructor(message: string, code: TCode, options: IServerlessOptions<TCode, THttp> = {}) {
      super(`[ ${type}/${code} ]: ${message}`);
      if (this.structuredMessage) {
        this.message = JSON.stringify(this);
      }
      const opts: IServerlessOptions<TCode, THttp> = { ...defaultOptions, ...options };
      this.name = opts.underlying ? opts.underlying.name : type;
      this.handlerFn = opts.handlerFn || "";
      this.code = code;
      this.classification = `${type}/${code}`;
      this.httpCode = opts.httpCode || (500 as THttp);
    }
  }

  return ServerlessError;
}
