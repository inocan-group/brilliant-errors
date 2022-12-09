import {
  ErrorConstructorType,
  IBrilliantError,
  IConstructorProps,
  IErrorRuntimeOptions,
  StandardConstructor,
  TypeSubtype,
} from "src/@types";
import { prettyStack } from "src/shared";

export default <
    N extends string,
    A extends string,
    T extends string,
    S extends string,
    H extends number,
    C extends ErrorConstructorType
  >(
    ctx: IBrilliantError<N, A, T, S, H, C>,
    props: IConstructorProps<N, A, T, S, H>
  ): StandardConstructor<T, S, H> =>
  (message: string, classification: TypeSubtype<T, S>, options?: IErrorRuntimeOptions<H>) => {
    ctx.message = `[ ${classification} ]: ${message} \n\n${prettyStack(ctx.structuredStack)}`;
    ctx.classification = classification;
    const parts = classification.split("/");
    ctx.code = parts[0] as T;
    ctx.subType = parts[1] as S;
    if (options?.httpStatusCode || props.configOptions.defaultHttpStatus) {
      ctx.httpStatus = (options?.httpStatusCode || props.configOptions.defaultHttpStatus) as H;
    }
  };
