import { TypeGuard } from "inferred-types";
import { IBrilliantError } from "./IBriliantError";
import { BrillianErrorTypeGuard } from "../@guards";
import type { ConstructorFor } from "src/@types";
import { TypeSubtype } from "common-types";

/**
 * The constructor when using a "network" error from Brilliant Errors
 */
export type NetworkConstructor<
  T extends string,
  S extends string,
  H extends number,
  R extends any = void
> = (
  code: H,
  message: string,
  options?: {
    classification?: TypeSubtype<T, S>;
  }
) => R;

export type WrapperConstructor<
  T extends string,
  S extends string,
  H extends number,
  R extends any = void
> = (
  underlying: Error,
  classification: TypeSubtype<T, S>,
  options?: {
    message?: string;
    httpErrorCode?: H;
  }
) => R;

export type StandardConstructor<
  T extends string,
  S extends string,
  H extends number,
  R extends any = void
> = (
  message: string,
  classification: TypeSubtype<T, S>,
  // eslint-disable-next-line no-use-before-define
  options?: IErrorRuntimeOptions<H> | undefined
) => R;

export type ErrorConstructorType = "standard" | "network" | "wrapper";

/** configuration options when setting up an Error class */
export type IErrorConfigOptions<
  T extends string,
  S extends string,
  C extends ErrorConstructorType
> = {
  constructorType?: C;
  defaultHttpStatus?: number;
  requireHttpStatus?: boolean;
  defaultType?: T;
  defaultSubType?: S;
};

export type IErrorRuntimeOptions<H extends number> = {
  httpStatusCode?: H;
};

export type BrilliantErrorTuple<
  N extends string,
  A extends string,
  T extends string,
  S extends string,
  H extends number,
  C extends ErrorConstructorType
> = [
  ConstructorFor<N, A, T, S, H, C>,
  TypeGuard<IBrilliantError<N, A, T, S, H, C>>,
  BrillianErrorTypeGuard
];

/**
 * Add any additional _options_ for the error type
 */
export type ErrorOptions<
  N extends string,
  A extends string,
  T extends string,
  S extends string,
  H extends number
> = <C extends ErrorConstructorType = "standard">(
  options?: IErrorConfigOptions<T, S, C>
) => BrilliantErrorTuple<N, A, T, S, H, C>;

/** enter the numeric error codes that this error can throw; leaving it empty will allow all numeric codes */
export type ErrorHttpCodes<
  N extends string,
  A extends string,
  T extends string,
  S extends string
> = <H extends number>(...httpCodes: H[]) => ErrorOptions<N, A, T, S, H>;

export type ErrorSubTypes<N extends string, A extends string, T extends string> = <
  S extends string
>(
  ...subTypes: S[]
) => ErrorHttpCodes<N, A, T, S>;

export type ErrorTypes<N extends string, A extends string> = <T extends string>(
  ...types: T[]
) => ErrorSubTypes<N, A, T>;
