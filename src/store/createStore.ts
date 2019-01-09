import { applyMiddleware, createStore } from "redux";
import composeEnhancers from "./middleware/composeEnhancers";
import store from "./index";
import actionMiddleware from "./middleware/actionMiddleware";

const middleware = [actionMiddleware];
const enhancer = composeEnhancers(applyMiddleware(...middleware));

export default () => createStore(store, enhancer);
