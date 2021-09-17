import {
  ErrorConstructorType,
  IErrorConfigOptions,
  NetworkConstructor,
  WrapperConstructor,
} from "./error-config";

import { Constructor, IBrilliantError, StandardConstructor } from ".";

export type IConstructorProps<
  N extends string,
  A extends string,
  T extends string,
  S extends string,
  H extends number
> = {
  name: N;
  app: A;
  types: T[];
  subTypes: S[];
  httpCodes: H[];
  configOptions: IErrorConfigOptions<T, S, ErrorConstructorType>;
};

export type ConstructorFor<
  N extends string,
  A extends string,
  T extends string,
  S extends string,
  H extends number,
  C extends ErrorConstructorType
> = C extends "standard"
  ? Constructor<Parameters<StandardConstructor<T, S, H>>, IBrilliantError<N, A, T, S, H, C>>
  : C extends "network"
  ? Constructor<Parameters<NetworkConstructor<T, S, H>>, IBrilliantError<N, A, T, S, H, C>>
  : C extends "wrapper"
  ? Constructor<Parameters<WrapperConstructor<T, S, H>>, IBrilliantError<N, A, T, S, H, C>>
  : never;
