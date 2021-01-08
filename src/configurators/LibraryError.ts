import {
  ErrorKind,
  ILibraryError,
  ILibraryErrorConstructor,
  ILibraryOptions,
} from "../types";

export function createLibraryError<
  TCode extends string = string,
  TError extends number = number
>(
  /**
   * The library's name
   */
  library: string,
  /**
   * Default options
   */
  defaultOptions: ILibraryOptions<TCode, TError> = {}
): ILibraryErrorConstructor<TCode, TError> {
  /**
   * An Error thrown by library code which does _not_ require a numeric
   * HTTP error code on each throw. You may, however, include one where appropriate,
   * and you have the option when configuring the error to state a "default" HTTP code
   * (though no default will be provided unless you state it)
   *
   * Unlike, `AppError`'s, the `LibraryError` _does_ require that a string based code be
   * included (versus being defaulted to 'error'). This ensures that consumers of the library
   * can build conditional logic off of a reasonable categorical name.
   */
  class LibraryError extends Error implements ILibraryError<TCode, TError> {
    public readonly kind = ErrorKind.LibraryError;
    public library: Readonly<string> = library;
    public classification: Readonly<string>;
    public code: Readonly<TCode>;
    public errorCode?: Readonly<TError>;

    /**
     *
     * @param message a string-based, human friendly message to present to the user; because this is considered an `AppError` the name of the application -- in brackets -- will be prefixed
     * to the text included here in the message
     * @param code A string-based classification of the error; this aligns with the
     * latest versions of Node which has a string based "code". This code will _also_
     * be included as part of the `classification` property
     * @param options a dictionary of params you _can_ but are _not required_ to set;
     * this includes setting the `httpCode` which is a numeric HTTP error code (if not
     * set then the default HTTP code will be used)
     */
    constructor(
      message: string,
      code: TCode,
      options: ILibraryOptions<TCode, TError> = {}
    ) {
      super(`[ ${library} ]: ${message}`);
      const opts: ILibraryOptions<TCode, TError> = { ...defaultOptions, ...options };
      this.code = code;
      this.classification = `${library}/${code}`;
      if (opts.errorCode) {
        this.errorCode = opts.errorCode;
      }
    }
  }

  return LibraryError;
}
