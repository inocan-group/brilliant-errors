import type { IAWSLambaContext } from "common-types";
import { ErrorKind, IBaseErrorOptions, IErrorBaseline } from "./general";

/**
 * Options that can be passed into the error at run time
 */
export type IServerlessOptions<TCode extends string = string, THttp extends number = number> = {
  /**
   * This property is typically not set directly but rather becomes
   * the _name_ of the underlying error (if there is one) or falls back
   * to the error class's name.
   */
  name?: string;
  /**
   * The name of the serverless handler function
   */
  handlerFn?: string;
  /**
   * if you pass in the AWS context object into the error
   * it will configure the error with the following props:
   *
   * - awsRequestId
   * - caller (if available)
   * - handlerFn
   */
  ctx?: IAWSLambaContext;
} & IBaseErrorOptions<TCode, THttp>;

/**
 * Options that can be configured when configuring the error class
 */
export type IServerlessConfig<
  TCode extends string = string,
  THttp extends number = number
> = IServerlessOptions<TCode, THttp> & {};

//#region class-interfaces
export interface IServerlessErrorConstructor<
  TCode extends string = string,
  THttp extends number = number
> {
  new (message: string, code: TCode, options?: IServerlessOptions<TCode, THttp>): IServerlessError<
    TCode,
    THttp
  >;
}

export interface IServerlessError<
  TCode extends string = string,
  THttp extends number = number,
  TRequest = unknown
> extends IErrorBaseline<TCode, THttp> {
  /**
   * The type/category of serverless error which is being thrown
   */
  type: string;
  kind: Readonly<ErrorKind.ServerlessError>;

  /**
   * The name of the handler function which started
   * the execution prior to this error being encountered.
   */
  handlerFn: string;

  /**
   * A boolean flag which indicates whether this error
   * happened within a serverless function where the invocation
   * was originated by AWS's API Gateway.
   */
  isApiGatewayRequest: boolean;
  /**
   * Serverless errors can opt to include the _request_ body which was
   * sent into the handler function which led to this error
   */
  request?: TRequest;

  /**
   * Serverless errors can opt to include the AWS id in the error
   */
  awsRequestId?: string;
}
