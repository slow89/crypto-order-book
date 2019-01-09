import { ISnaphsot, Change } from "./model";

export interface IGdaxClientOutputProps {
  loadSnapshot: (snapshot: ISnaphsot) => void;
  updateAsks: (change: Change) => void;
  updateBids: (change: Change) => void;
}

export type GdaxClientProps = IGdaxClientOutputProps;
