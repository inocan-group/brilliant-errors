/* eslint-disable brace-style */
import {
  IErrorConfigOptions,
  IBrilliantError,
  ErrorConstructorType,
  BrilliantErrorTuple,
  ConstructorFor,
  ErrorTypes,
  ErrorSubTypes,
  ErrorHttpCodes,
  ErrorOptions,
  TypeSubtype,
  TypeGuard,
} from "~/@types";
import callsites, { CallSite } from "callsites";
import { isBrilliantError } from "~/@guards";
import getConstructor from "./constructors";

/**
 * Create an error type and type guard using brilliant errors.
 */
export const createError =
  <N extends string, A extends string>(name: N, app: A): ErrorTypes<N, A> =>
  <T extends string>(...types: T[]): ErrorSubTypes<N, A, T> =>
  <S extends string>(...subTypes: S[]): ErrorHttpCodes<N, A, T, S> =>
  <H extends number>(...httpCodes: H[]): ErrorOptions<N, A, T, S, H> =>
  <C extends ErrorConstructorType = "standard">(
    configOptions?: IErrorConfigOptions<T, S, C>
  ): BrilliantErrorTuple<N, A, T, S, H, C> => {
    const ErrorClass = class BrilliantError
      extends Error
      implements IBrilliantError<N, A, T, S, H, C>
    {
      public readonly kind = "BrilliantError";
      public readonly name!: N;
      public readonly classification!: TypeSubtype<T, S>;
      public readonly code!: T;
      public readonly subType!: S;
      public readonly app!: A;
      public readonly constructorType!: C;
      public readonly structuredStack!: CallSite[];
      public readonly httpStatus!: C extends "network" ? H : H | undefined;
      public readonly filename!: string | null;
      public readonly fn!: string | null;
      public readonly line!: number | null;

      public toJSON() {
        return {
          app: this.app,
          name: this.name,
          message: this.message,
          classification: this.classification,
          httpStatus: this.httpStatus as H,
          code: this.code as T,
          subType: this.subType as S,
          fn: this.fn,
          line: this.line,
        };
      }

      /**
       * Simple Message and Classification signature
       */
      constructor(...params: any[]) {
        // always start by calling Error contructor
        super("");
        // assign properties which are unaffected by API style
        this.constructorType = (configOptions?.constructorType || "standard") as C;
        this.name = name;
        this.app = app;
        this.structuredStack = callsites().slice(1) || [];
        this.filename = (this.structuredStack[0].getFileName() || "")
          .split("/")
          .slice(-2)
          .join("/");
        this.line = this.structuredStack[0].getLineNumber();
        this.fn =
          this.structuredStack[0].getMethodName() || this.structuredStack[0].getFunctionName();

        // now call into the appropriate constructor to do the rest
        const c = getConstructor<N, A, T, S, H, C>(this, {
          name,
          app,
          types,
          subTypes,
          httpCodes,
          configOptions: configOptions || {},
        });

        const ctor = c[this.constructorType] as (...args: any[]) => void;
        // let the particular API provided to user manipulate the state of this error
        ctor(...params);
      }
    };

    const SpecificGuard: TypeGuard<IBrilliantError<N, A, T, S, H, C>> = (
      unknown: unknown
    ): unknown is IBrilliantError<N, A, T, S, H, C> => {
      return isBrilliantError(unknown) && unknown.name === name && unknown.app === app;
    };

    type Ctor = ConstructorFor<N, A, T, S, H, C>;

    // return the error class, a specific type guard, and a general purpose type guard
    return [ErrorClass as unknown as Ctor, SpecificGuard, isBrilliantError] as BrilliantErrorTuple<
      N,
      A,
      T,
      S,
      H,
      C
    >;
  };
