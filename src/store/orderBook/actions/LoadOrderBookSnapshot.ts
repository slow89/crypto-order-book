import { AnyAction } from "redux";
import { ActionType } from "../../../types";
import { ISnaphsot } from "../../../components/GdaxClient/model";

export default class LoadOrderBookSnapshot implements AnyAction {
  public static create(snapshot: ISnaphsot) {
    return new LoadOrderBookSnapshot({ snapshot });
  }

  private constructor(
    public readonly payload: {
      snapshot: ISnaphsot;
    }
  ) {}

  public readonly type = ActionType.GDAX_CLIENT_SNAPSHOT;
}
