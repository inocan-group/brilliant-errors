import { TypeGuard } from "inferred-types";
import { IBrilliantError } from "./IBriliantError";
import { isBrilliantError } from "../@guards";
import { StandardConstructor } from "~/configurators/constructors/standard";
import { WrapperConstructor } from "~/configurators/constructors/wrapper";
import { NetworkConstructor } from "~/configurators/constructors/network";
import type { ConstructorFor } from "~/@types";

export type ErrorConstructorType = "standard" | "network" | "wrapper";
export type ErrorClass<
  N extends string,
  A extends string,
  T extends string,
  S extends string,
  H extends number,
  C extends ErrorConstructorType
> = C extends "standard"
  ? StandardConstructor<N, A, T, S, H, C>
  : C extends "wrapper"
  ? WrapperConstructor<T, S, H>
  : C extends "network"
  ? NetworkConstructor<T, S, H>
  : never;

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
  typeof isBrilliantError
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
export type ErrorHttpCodes<N extends string, A extends string, T extends string, S extends string> =
  <H extends number>(...httpCodes: H[]) => ErrorOptions<N, A, T, S, H>;

export type ErrorSubTypes<N extends string, A extends string, T extends string> = <
  S extends string
>(
  ...subTypes: S[]
) => ErrorHttpCodes<N, A, T, S>;

export type ErrorTypes<N extends string, A extends string> = <T extends string>(
  ...types: T[]
) => ErrorSubTypes<N, A, T>;
