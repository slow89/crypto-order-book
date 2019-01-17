import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

import { Provider } from "react-redux";
import createStore from "./store/createStore";
import GdaxClient from "./components/GdaxClient";
import OrderBook from "./components/OrderBook";

const store = createStore();

ReactDOM.render(
  <Provider store={store}>
    <OrderBook.connected />
    <GdaxClient.connected />
  </Provider>,
  document.getElementById("root")
);
