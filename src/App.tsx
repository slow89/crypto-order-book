import React, { Component } from "react";
import { Provider } from "react-redux";
import createStore from "./store/createStore";
import GdaxClient from "./components/GdaxClient";
import "./App.css";
import OrderBook from "./components/OrderBook";

class App extends Component {
  render() {
    const store = createStore();
    return (
      <Provider store={store}>
        <OrderBook.connected />
        <GdaxClient.connected />
      </Provider>
    );
  }
}

export default App;
