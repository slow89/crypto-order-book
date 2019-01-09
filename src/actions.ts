import {
  LoadOrderBookSnapshot,
  UpdateOrderBookAsks,
  UpdateOrderBookBids,
  UpdateStats
} from "./store/orderBook/actions";

export type AppAction =
  | LoadOrderBookSnapshot
  | UpdateOrderBookAsks
  | UpdateOrderBookBids
  | UpdateStats;
