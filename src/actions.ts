import {
  LoadOrderBookSnapshot,
  UpdateOrderBookAsks,
  UpdateOrderBookBids
} from "./store/orderBook/actions";

export type AppAction =
  | LoadOrderBookSnapshot
  | UpdateOrderBookAsks
  | UpdateOrderBookBids;
