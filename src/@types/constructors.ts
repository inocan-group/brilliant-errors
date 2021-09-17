import { ErrorConstructorType, IErrorConfigOptions } from "./error-config";
import { Constructor } from "./general";
import { IBrilliantError } from ".";
import standard from "~/configurators/constructors/standard";
import wrapper from "~/configurators/constructors/wrapper";
import network from "~/configurators/constructors/network";

const c = { standard, wrapper, network };

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
  ? Constructor<Parameters<ReturnType<typeof c.standard>>, IBrilliantError<N, A, T, S, H, C>>
  : C extends "network"
  ? Constructor<Parameters<ReturnType<typeof c.network>>, IBrilliantError<N, A, T, S, H, C>>
  : C extends "wrapper"
  ? Constructor<Parameters<ReturnType<typeof c.wrapper>>, IBrilliantError<N, A, T, S, H, C>>
  : never;
