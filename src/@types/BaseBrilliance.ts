
import type { CallSite } from "callsites";
import { TypeSubtype } from "./IBrilliantError";

export abstract class BaseBrilliance<
  /** type */
  T extends string = string,
  /** sub-type */
  S extends string = string,
  /** http status codes */
  H extends number = number,
  /** name */
  N extends string = string,
  /** origin */
  O extends string = string
> extends Error {
  public readonly kind = "BrilliantError";
  /** The error's name */
  public readonly name!: N;
  /** the originating application or service */
  public readonly origin!: O;

  /**
   * The classification of an error into a type/sub-type
   */
  public readonly classification!: TypeSubtype<T, S>;
  /**
   * The major type from the error's classification
   */
  public readonly type!: T;
  /**
   * The minor type/subtype from the error's classification
   */
  public readonly subType!: S;
  /**
   * An HTTP numeric error code
   */
  public readonly httpStatus?: H;

  public readonly structuredStack!: CallSite[];

  /** the function (or class method) which the error occurred in */
  public readonly fn!: string | null;
  public readonly filename!: string | null;
  /** the line number where the error occurred */
  public readonly line!: number | null;
}
