import { IApplicationState } from "./state";

export function bind<R, T extends (state: IApplicationState) => R | null>(
  target: any,
  func: T
) {
  return func.bind(target) as T;
}
