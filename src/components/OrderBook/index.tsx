import React from "react";
import { OrderBookProps } from "./props";
import PriceLevel from "../PriceLevel";
import connect from "./connector";
import "./styles.css";

export default class OrderBook extends React.PureComponent<OrderBookProps> {
  public static readonly connected = connect(OrderBook);

  render() {
    const bidLength = this.props.bids ? this.props.bids.length : 0;

    const bids = this.props.bids
      ? this.props.bids.map((bid, index) => (
          <PriceLevel
            level={bid}
            key={bid.price}
            last={index === bidLength - 1}
            totalSize={this.props.totalSize}
          />
        ))
      : null;

    const asks = this.props.asks
      ? this.props.asks.map((ask, index) => (
          <PriceLevel
            level={ask}
            key={ask.price}
            last={index === 0}
            totalSize={this.props.totalSize}
          />
        ))
      : null;

    return this.props.midpoint ? (
      <div className="wrapper">
        <div className="order-book">
          <div className="column-header">
            <div>Price (USD)</div>
            <div>Market Size</div>
          </div>
          <div className="asks">{asks}</div>
          <div className="midpoint">
            Midpoint: $
            {this.props.midpoint
              .toFixed(3)
              .toString()
              .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")}
          </div>
          <div className="bids">{bids}</div>
        </div>
      </div>
    ) : null;
  }
}
