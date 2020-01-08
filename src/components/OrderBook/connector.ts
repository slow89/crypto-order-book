import { connect } from "react-redux";

import { IOrderBookInputProps } from "./props";
import { IApplicationState } from "../../store/state";

import selectors from "../../store/selectors";

export default connect<IOrderBookInputProps, null, any, IApplicationState>(
  state => {
    const bids = selectors.orderBook.getTopBids(state);
    const asks = selectors.orderBook.getTopAsks(state);
    const stats = selectors.orderBook.getStats(state);
    const open = stats ? parseFloat(stats.open) : undefined;
    const midpoint = selectors.orderBook.getMidpoint(state);
    return {
      bids: bids,
      asks: asks,
      midpoint: midpoint,
      percentageChange:
        midpoint && open ? ((midpoint - open) / open) * 100 : undefined,
      totalSize:
        bids && asks
          ? bids.map(b => b.size).reduce((a, b) => a + b) +
            asks.map(a => a.size).reduce((a, b) => a + b)
          : undefined
    };
  },
  null
);
