import { ILevel } from "../../store/orderBook/state";

export interface IOrderBookInputProps {
  bids: Array<ILevel> | null;
  asks: Array<ILevel> | null;
  midpoint: number | null;
  totalSize?: number;
  percentageChange?: number;
}

export type OrderBookProps = IOrderBookInputProps;
