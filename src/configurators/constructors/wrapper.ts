import { TypeSubtype } from "common-types";
import { ErrorConstructorType, IBrilliantError, IConstructorProps } from "~/@types";
import { prettyStack } from "~/shared";

export type WrapperConstructor<T extends string, S extends string, H extends number> = (
  underlying: Error,
  classification: TypeSubtype<T, S>,
  options?: {
    message?: string;
    httpErrorCode?: H;
  }
) => void;

export default <
    N extends string,
    A extends string,
    T extends string,
    S extends string,
    H extends number,
    C extends ErrorConstructorType
  >(
    ctx: IBrilliantError<N, A, T, S, H, C>,
    _props: IConstructorProps<N, A, T, S, H>
  ): WrapperConstructor<T, S, Exclude<H, undefined>> =>
  (underlying, classification, options) => {
    ctx.classification = classification;
    if (options?.httpErrorCode) {
      ctx.httpStatus = options.httpErrorCode;
    }

    ctx.message = options?.message
      ? `${options?.message} [ ${classification} ]: ${underlying.message}\n\n${prettyStack(
          ctx.structuredStack
        )}`
      : `${underlying.message} [ ${classification} ]: wrapped error ${
          underlying.name
        }\n\n${prettyStack(ctx.structuredStack)}`;
  };
