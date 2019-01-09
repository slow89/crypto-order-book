import { ISnaphsot, Change } from "./model";
import { IStats } from "../../api/stats/model";

export interface IGdaxClientOutputProps {
  loadSnapshot: (snapshot: ISnaphsot) => void;
  updateAsks: (change: Change) => void;
  updateBids: (change: Change) => void;
  updateStats: (stats: IStats) => void;
}

export type GdaxClientProps = IGdaxClientOutputProps;
