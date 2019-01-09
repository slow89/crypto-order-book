import { AnyAction } from "redux";
import { ActionType } from "../../../types";
import { IStats } from "../../../api/stats/model";

export default class UpdateStats implements AnyAction {
  public static create(stats: IStats) {
    return new UpdateStats({ stats });
  }

  private constructor(
    public readonly payload: {
      stats: IStats;
    }
  ) {}

  public readonly type = ActionType.GDAX_CLIENT_UPDATE_STATS;
}
