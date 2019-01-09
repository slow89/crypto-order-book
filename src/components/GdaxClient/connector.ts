import { connect } from "react-redux";

import { IGdaxClientOutputProps } from "./props";
import { IApplicationState } from "../../store/state";
import {
  LoadOrderBookSnapshot,
  UpdateOrderBookAsks,
  UpdateOrderBookBids,
  UpdateStats
} from "../../store/orderBook/actions";

export default connect<null, IGdaxClientOutputProps, {}, IApplicationState>(
  null,
  (dispatch: any) => ({
    loadSnapshot: snapshot => dispatch(LoadOrderBookSnapshot.create(snapshot)),
    updateAsks: change => dispatch(UpdateOrderBookAsks.create(change)),
    updateBids: change => dispatch(UpdateOrderBookBids.create(change)),
    updateStats: stats => dispatch(UpdateStats.create(stats))
  })
);
