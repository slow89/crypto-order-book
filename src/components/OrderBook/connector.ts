import { connect } from "react-redux";

import { IOrderBookInputProps } from "./props";
import { IApplicationState } from "../../store/state";
import {
  LoadOrderBookSnapshot,
  UpdateOrderBookAsks,
  UpdateOrderBookBids
} from "../../store/orderBook/actions";

import selectors from "../../store/selectors";

export default connect<IOrderBookInputProps, null, {}, IApplicationState>(
  state => {
    const bids = selectors.orderBook.getTopBids(state);
    const asks = selectors.orderBook.getTopAsks(state);
    return {
      bids: bids,
      asks: asks,
      midpoint: selectors.orderBook.getMidpoint(state),
      totalSize:
        bids && asks
          ? bids.map(b => b.size).reduce((a, b) => a + b) +
            asks.map(a => a.size).reduce((a, b) => a + b)
          : undefined
    };
  },
  null
);
