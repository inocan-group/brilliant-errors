import { TypeGuard as TG } from "inferred-types";
import { TypeSubtype as TS } from "common-types";

export type TypeGuard<T> = TG<T>;
export type TypeSubtype<T extends string, S extends string> = TS<T, S>;
