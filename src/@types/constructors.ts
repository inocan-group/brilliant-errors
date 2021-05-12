import { TypeSubtype } from "common-types";
import { BaseBrilliance } from "./BaseBrilliance";
import { IErrorRuntimeOptions } from "./error-config";

/**
 * Error construction with "message" and "classification" as the key inputs
 */
export type MessageConstructor<
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
> = new (
  message: string,
  classification: TypeSubtype<T, S>,
  options?: IErrorRuntimeOptions<H>
) => BaseBrilliance<T, S, H, N, O>;

/**
 * Error construction which emphasizes the inclusion of an HTTP
 * status code.
 */
export type HttpConstructor<
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
> = new (
  httpStatus: H,
  message: string,
  classification: TypeSubtype<T, S>,
  options?: IErrorRuntimeOptions<H>
) => BaseBrilliance<T, S, H, N, O>;

export type BrilliantContructor<
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
> = HttpConstructor<T, S, H, N, O> | MessageConstructor<T, S, H, N, O>;
