import { AppAction } from "../../actions";
import { ISideState, IOrderBookState } from "./state";
import { combineReducers } from "redux";
import { ActionType } from "../../types";
import { Level, Change } from "../../components/GdaxClient/model";
import { IStats } from "../../api/stats/model";

const bids = (
  state: ISideState | null = null,
  action: AppAction
): ISideState | null => {
  switch (action.type) {
    case ActionType.GDAX_CLIENT_SNAPSHOT:
      return parseSide(action.payload.snapshot.bids, false);
    case ActionType.GDAX_CLIENT_UPDATE_BID:
      let nState = state ? { ...state } : null;
      return updateSide(action.payload.change, nState, false);
    case ActionType.GDAX_CLIENT_UPDATE_BID:

    default:
      return state;
  }
};

const asks = (
  state: ISideState | null = null,
  action: AppAction
): ISideState | null => {
  switch (action.type) {
    case ActionType.GDAX_CLIENT_SNAPSHOT:
      return parseSide(action.payload.snapshot.asks, true);
    case ActionType.GDAX_CLIENT_UPDATE_ASK:
      let nState = state ? { ...state } : null;
      return updateSide(action.payload.change, nState, true);
    default:
      return state;
  }
};

const stats = (
  state: IStats | null = null,
  action: AppAction
): IStats | null => {
  switch (action.type) {
    case ActionType.GDAX_CLIENT_UPDATE_STATS:
      return action.payload.stats;
    default:
      return state;
  }
};

export default combineReducers<IOrderBookState>({
  bids,
  asks,
  stats
});

function parseSide(side: Array<Level>, isAscending: boolean): ISideState {
  let values: { [key: string]: number } = {};
  let order: Array<number> = [];

  side.forEach(e => {
    let level = parseFloat(e[0]);
    let size = parseFloat(e[1]);
    values[level.toFixed(2).toString()] = size;

    order.push(level);
  });

  return {
    values,
    order: sort(order, isAscending)
  };
}

function updateSide(
  update: Change,
  side: ISideState | null,
  isAscending: boolean
): ISideState | null {
  if (side == null) {
    console.error("Update Side was recieved before a snapshot");
    return null;
  }

  const level = parseFloat(update[1]);
  const index = side.order.indexOf(level, 0);

  if (update[2] == "0") {
    delete side.values[level.toFixed(2).toString()];

    if (index > -1) {
      let order = side.order.slice();
      order.splice(index, 1);
      side.order = order;
    }
  } else {
    side.values[level.toFixed(2).toString()] = parseFloat(update[2]);

    if (index == -1) {
      let order = side.order.slice();
      order.push(level);
      side.order = sort(order, isAscending);
    }
  }
  return side;
}

function sort(numbers: Array<number>, isAscending: boolean): Array<number> {
  let comparator = isAscending
    ? (a: number, b: number) => a - b
    : (a: number, b: number) => b - a;

  return numbers.sort(comparator);
}
