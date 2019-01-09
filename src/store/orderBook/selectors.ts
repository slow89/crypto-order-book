import { bind } from "../bind";
import { ISideState, ILevel, Side } from "./state";
import { IApplicationState } from "../state";
import { createSelector } from "reselect";
import { IStats } from "../../api/stats/model";

export default class NavigatorSelectors {
  private readonly levelsToShow = 20;

  public readonly getState = bind(this, s => s.orderBook);

  public readonly getBids = bind<
    ISideState | null,
    (state: IApplicationState) => ISideState | null
  >(this, (state: IApplicationState) => this.getState(state).bids);

  public readonly getAsks = bind<
    ISideState | null,
    (state: IApplicationState) => ISideState | null
  >(this, (state: IApplicationState) => this.getState(state).asks);

  public readonly getTopBids = bind<
    Array<ILevel> | null,
    (state: IApplicationState) => Array<ILevel> | null
  >(
    this,
    createSelector(
      [this.getBids],
      bids => {
        if (bids == null) {
          return null;
        }
        let topBids = bids.order.slice(0, this.levelsToShow);
        return topBids.map(price => ({
          price: price,
          size: bids.values[price.toFixed(2).toString()],
          side: Side.Bid
        }));
      }
    )
  );

  public readonly getTopAsks = bind<
    Array<ILevel> | null,
    (state: IApplicationState) => Array<ILevel> | null
  >(
    this,
    createSelector(
      [this.getAsks],
      asks => {
        if (asks == null) {
          return null;
        }
        let topAsks = asks.order.slice(0, this.levelsToShow);
        return topAsks.reverse().map(price => ({
          price: price,
          size: asks.values[price.toFixed(2).toString()],
          side: Side.Ask
        }));
      }
    )
  );

  public readonly getMidpoint = bind<
    number | null,
    (state: IApplicationState) => number | null
  >(
    this,
    createSelector(
      [this.getAsks, this.getBids],
      (asks, bids) => {
        if (asks == null || bids == null) {
          return null;
        }

        let bestBid = bids.order[0];
        let bestAsk = asks.order[0];

        return bestBid + (bestAsk - bestBid) / 2;
      }
    )
  );

  public readonly getStats = bind<
    IStats | null,
    (state: IApplicationState) => IStats | null
  >(this, (state: IApplicationState) => this.getState(state).stats);
}
