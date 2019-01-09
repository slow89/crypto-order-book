import { compose } from "redux";

const composeEnhancers: <R>(a: R) => R =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default composeEnhancers;
