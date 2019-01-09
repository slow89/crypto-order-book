import { combineReducers } from "redux";
import { IApplicationState } from "./state";
import orderBook from "./orderBook";

export default combineReducers<IApplicationState>({
  orderBook
});
