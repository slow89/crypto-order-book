import React from "react";
import { PriceLevelProps } from "./props";
import "./styles.css";
import { Side } from "../../store/orderBook/state";

export default class PriceLevel extends React.PureComponent<PriceLevelProps> {
  render() {
    let classes =
      this.props.level.side === Side.Bid ? "bid level " : "ask level ";

    if (this.props.last) {
      classes += "last";
    }
    const style = this.props.totalSize
      ? {
          backgroundColor:
            this.props.level.side === Side.Bid
              ? "rgba(92, 160, 81, " +
                this.props.level.size / this.props.totalSize +
                ")"
              : "rgba(191, 92, 72, " +
                this.props.level.size / this.props.totalSize +
                ")"
        }
      : undefined;

    return (
      <div className={classes} style={style}>
        <div className="price">
          $
          {this.props.level.price
            .toFixed(2)
            .toString()
            .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")}
        </div>
        <div className="size">
          {this.props.level.size < 1
            ? this.props.level.size.toFixed(4)
            : this.props.level.size.toPrecision(5)}
        </div>
      </div>
    );
  }
}
