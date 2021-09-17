import { ErrorConstructorType } from ".";

/**
 * Provides a default type if `T` is undefined
 */
export type IfUndefined<T, D extends T> = undefined extends T ? D : T;

/** if `I` extends `T` then return as `T`, otherwise change type to `D` */
export type IfNotThen<I, T, D extends T> = I extends T ? I : D;

/**
 * Define a class constructor; allowing strong typing for constructor's parameters
 * and the returned class structure.
 */
export type Constructor<Ctor extends any[], Klass extends any> = new (...props: Ctor) => Klass;
