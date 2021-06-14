import { ConstructorFor, TypeSubtype } from "common-types";
import {
  BaseBrilliance,
  MessageConstructor,
  IErrorConfigOptions,
  IErrorRuntimeOptions,
} from "~/@types";
import callsites, { CallSite } from "callsites";

function prettyStack(s: CallSite[]) {
  return s
    .map((i) => {
      const file = (i.getFileName() || "[file unknown]").split("/").slice(-2).join("/");
      const func = i.getFunctionName() || i.getMethodName() || "unknown";
      const line = i.getLineNumber();
      return `\t- ${file}, ${func}()${line ? `, at line ${line}` : ""}`;
    })
    .join("\n");
}

/**
 * An Error thrown by a application. A string based "code" for the error can be added to errors
 * when throwing but isn't strictly required.
 */
export function createError<
  T extends string = string,
  S extends string = string,
  H extends number = number,
  N extends string = string,
  O extends string = string
>(name: N, origin: O, _options?: IErrorConfigOptions<S, T>): MessageConstructor<T, S, H, N, O> {
  // CLASS DEFINITION
  class BrilliantError extends BaseBrilliance<T, S, H, N, O> {
    public readonly kind = "BrilliantError";
    public readonly name!: N;
    public readonly classification!: TypeSubtype<T, S>;
    public readonly type!: T;
    public readonly subType!: S;
    public readonly origin!: O;
    public readonly structuredStack!: CallSite[];
    public readonly httpStatus!: H;
    public readonly filename!: string | null;
    public readonly fn!: string | null;
    public readonly line!: number | null;

    public toJSON() {
      return {
        name: this.name,
        message: this.message,
        classification: this.classification,
        origin: this.origin,
        fn: this.fn,
        line: this.line,
        stack: this.structuredStack,
      };
    }

    /**
     * Simple Message and Classification signature
     */
    constructor(
      message: string,
      classification: TypeSubtype<T, S>,
      options: IErrorRuntimeOptions<H> = {}
    ) {
      super(message);
      this.name = name;
      this.origin = origin;
      this.classification = classification;
      this.structuredStack = callsites().slice(1) || [];
      this.filename = (this.structuredStack[0].getFileName() || "").split("/").slice(-2).join("/");
      this.line = this.structuredStack[0].getLineNumber();
      this.fn =
        this.structuredStack[0].getMethodName() || this.structuredStack[0].getFunctionName();
      this.message = `${message} [ ${this.classification} ]\n\n${prettyStack(
        this.structuredStack
      )}`;

      if (options.httpStatusCode) {
        this.httpStatus = options.httpStatusCode;
      }
    }
  }

  return BrilliantError as ConstructorFor<BaseBrilliance<T, S, H, N, O>>;
}
