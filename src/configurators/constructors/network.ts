import { TypeSubtype } from "common-types";
import {
  ErrorConstructorType,
  IBrilliantError,
  IConstructorProps,
  NetworkConstructor,
} from "~/@types";
import { prettyStack } from "~/shared";

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
  ): NetworkConstructor<T, S, H> =>
  (code, message, options) => {
    ctx.httpStatus = code;

    const classification =
      options?.classification ||
      `${props.configOptions.defaultType || props.app}/${
        props.configOptions.defaultSubType
      } || "unspecified"`;

    ctx.classification = classification as TypeSubtype<T, S>;

    ctx.message = `${message} [ ${code}, ${classification} ]\n\n${prettyStack(
      ctx.structuredStack
    )}`;
  };
