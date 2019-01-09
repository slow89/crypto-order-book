import { AnyAction } from "redux";
import { ActionType } from "../../../types";
import { Change } from "../../../components/GdaxClient/model";

export default class UpdateOrderBookBids implements AnyAction {
  public static create(change: Change) {
    return new UpdateOrderBookBids({ change });
  }

  private constructor(
    public readonly payload: {
      change: Change;
    }
  ) {}

  public readonly type = ActionType.GDAX_CLIENT_UPDATE_BID;
}
