import { TypeSubtype } from "common-types";

export type IErrorConfigOptions<T extends string, S extends string> = {
  defaultHttpStatus?: number;
  requireHttpStatus?: boolean;
  defaultType?: T;
  defaultClassification?: TypeSubtype<T, S>;
};

export type IErrorRuntimeOptions<H extends number> = {
  httpStatusCode?: H;
};

// export type IErrorConfigApi<N extends string, O extends string, E extends string> = {
//   name(name: N): IErrorConfigApi<N, O, E & "name">;
//   origin(name: O): IErrorConfigApi<N, O, E & "origin">;
//   options(options: IErrorConfigOptions<T,S>): IErrorConfigApi<N, O, E & "options">;
// };

// export type IErrorConfigurator = (c: IErrorConfigApi<N extends string, O extends string>, E extends string = "") => IErrorConfigApi<N extends string, O extends string, E extends string>;

// export type IErrorState<N extends string, O extends string> = {
//   name: N;
//   origin: O;
//   options: IErrorConfigOptions;
// };
