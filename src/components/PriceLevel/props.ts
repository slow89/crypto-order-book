import { ILevel } from "../../store/orderBook/state";

export interface IPriceLevelInputProps {
  level: ILevel;
  last?: boolean;
  totalSize?: number;
}

export type PriceLevelProps = IPriceLevelInputProps;
