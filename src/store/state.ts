import { IOrderBookState } from "./orderBook/state";

export interface IApplicationState {
  orderBook: IOrderBookState;
}
