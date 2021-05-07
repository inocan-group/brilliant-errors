import { ErrorKind, IBaseErrorOptions, IErrorBaseline } from "./general";

export interface IAppOptions<TCode extends string = string, TError extends number = number>
  extends IBaseErrorOptions<TCode, TError> {}
export interface IAppError<TCode extends string = string, TError extends number = number>
  extends IErrorBaseline<TCode, TError> {
  kind: Readonly<ErrorKind.AppError>;
}
export interface IAppErrorConstructor<
  TCode extends string = string,
  TError extends number = number
> {
  new (message: string, code?: TCode, options?: IAppOptions<TCode, TError>): IAppError<
    TCode,
    TError
  >;
}
