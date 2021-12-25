import { TypeGuard as TG } from "inferred-types";
export { TypeSubtype } from "common-types";

export type TypeGuard<T> = TG<T>;
