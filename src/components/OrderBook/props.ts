import { ILevel } from "../../store/orderBook/state";
import { IStats } from "../../api/stats/model";

export interface IOrderBookInputProps {
  bids: Array<ILevel> | null;
  asks: Array<ILevel> | null;
  midpoint: number | null;
  totalSize?: number;
  percentageChange?: number;
}

export type OrderBookProps = IOrderBookInputProps;
