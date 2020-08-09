import { IDictionary } from "./index";
import { ErrorKind, IExtendedError, IBaseErrorOptions } from "./types";

export type ILibraryOptions<TCodes extends string = string, TErrors extends number = number> = IBaseErrorOptions<
  TCodes,
  TErrors
>;

export function createLibraryError<TCodes extends string = string, TErrors extends number = number>(
  /**
   * The library's name
   */
  library: string,
  /**
   * Default options
   */
  defaultOptions: ILibraryOptions<TCodes, TErrors> = {}
) {
  /**
   * An Error thrown by library code which does _not_ require a numeric
   * HTTP error code on each throw. You may, however, include one where appropriate,
   * and you have the option when configuring the error to state a "default" HTTP code
   * (though no default will be provided unless you state it)
   *
   * Unlike, `AppError`'s, the `LibraryError` _does_ require that a string based code be
   * included (versus being defaulted to 'error'). This ensures that consumers of the library
   * can build conditional logic off of a reasonable
   */
  class LibraryError extends Error implements IExtendedError {
    public readonly kind = ErrorKind.LibraryError;
    /**
     * The name of the library which threw the error
     */
    public library: string = library;
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
    constructor(message: string, code: TCodes, options: ILibraryOptions<TCodes, TErrors> = {}) {
      super(`[ ${library} ]: ${message}`);
      const opts: ILibraryOptions<TCodes, TErrors> = { ...defaultOptions, ...options };
      this.code = code;
      this.classification = `${library}/${code}`;
      if (opts.errorCode) {
        this.errorCode = opts.errorCode;
      }
    }
  }

  return LibraryError;
}
