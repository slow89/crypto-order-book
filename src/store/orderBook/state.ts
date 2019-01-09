import { IStats } from "../../api/stats/model";

export interface ISideState {
  values: { [key: string]: number };
  order: Array<number>;
}

export interface IOrderBookState {
  bids: ISideState | null;
  asks: ISideState | null;
  stats: IStats | null;
}

export enum Side {
  Bid,
  Ask
}

export interface ILevel {
  price: number;
  size: number;
  side: Side;
}
