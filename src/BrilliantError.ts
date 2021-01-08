import { ErrorKind } from "./index";

export abstract class BrilliantError<
  TCode extends string = string,
  TError extends number = number
> {
  public readonly kind = ErrorKind;

  /**
   * The classification of the error a combination of the app's
   * name and the error code passed in.
   */
  public classification!: TCode;
  /**
   * A string based code to classify the error
   */
  public code!: TCode;
  /**
   * An HTTP Error code; this is not required for an `AppError`'s but may be provided
   * optionally.
   */
  public errorCode?: number;
}
