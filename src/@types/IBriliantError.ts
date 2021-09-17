import { CallSite } from "callsites";
import { TypeSubtype } from "common-types";
import type { ErrorConstructorType } from "~/@types";

/**
 * Defines the structure of a [Brilliant Error](https://github.com/inocan-group/brilliant-errors).
 */
export interface IBrilliantError<
  N extends string,
  A extends string,
  T extends string,
  S extends string,
  H extends number,
  C extends ErrorConstructorType
> extends Error {
  /** a static identifier to ensure that this is a brilliant error */
  kind: "BrilliantError";
  /** the **Name** of the error given when error was configured */
  name: N;

  /**
   * specifies the API which the error constructor will provide
   */
  constructorType: C;

  /**
   * The configured **App**'s name (this can be left undefined); alternatively
   * a library author may indicate the library name as being the "app".
   */
  app: A;

  /**
   * The **code** is the first segment of the "classification" string and
   * therefore the higher-level scope description of the error.
   */
  code: T;

  subType: S;

  /**
   * The representative HTTP status code associated with this error
   */
  httpStatus: C extends "network" ? H : H | undefined;

  /**
   * The classification of an error into a type/sub-type.
   *
   * Note: the "type" can also be found as an independant prop `code` for the
   * error. Likewise, the subType is defined as prop on the error as well.
   */
  classification: TypeSubtype<T, S>;

  /**
   * An array of stack elements instead of stringified version typically
   * returned.
   */
  structuredStack: CallSite[];

  /** the function (or class method) which the error occurred in */
  fn: string | null;
  filename: string | null;
  /** the line number where the error occurred */
  line: number | null;

  toJSON(): {
    app: A;
    name: string;
    message: string;
    classification: TypeSubtype<T, S>;
    httpStatus: H;
    code: T;
    subType: S;
    fn: string | null;
    line: number | null;
  };
}
