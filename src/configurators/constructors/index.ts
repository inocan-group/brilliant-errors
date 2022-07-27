import type { ErrorConstructorType, IBrilliantError, IConstructorProps } from "src/@types";
import standard from "./standard";
import wrapper from "./wrapper";
import network from "./network";

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
) => ({
  standard: standard(ctx, props),
  wrapper: wrapper(ctx, props),
  network: network(ctx, props),
});
