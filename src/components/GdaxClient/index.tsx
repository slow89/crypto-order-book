import React from "react";
import { GdaxClientProps } from "./props";
import connect from "./connector";
import { Change } from "./model";

export default class GdaxClient extends React.PureComponent<GdaxClientProps> {
  public static readonly connected = connect(GdaxClient);

  componentDidMount() {
    const websocket = new WebSocket("wss://ws-feed.pro.coinbase.com");

    websocket.addEventListener("message", event => {
      const data = JSON.parse(event.data);
      const type = data.type;

      switch (type) {
        case "snapshot":
          this.props.loadSnapshot(data);
          break;
        case "l2update":
          data.changes.forEach((e: Change) => {
            if (e[0] == "buy") {
              this.props.updateBids(e);
            } else {
              this.props.updateAsks(e);
            }
          });
          break;
      }
    });

    websocket.addEventListener("open", event => {
      console.log(event);

      websocket.send(
        JSON.stringify({
          type: "subscribe",
          product_ids: ["BTC-USD"],
          channels: [
            "level2",
            {
              name: "ticker",
              product_ids: ["BTC-USD"]
            }
          ]
        })
      );
    });

    websocket.addEventListener("error", error => {
      console.log(error);
    });
  }

  render() {
    return null;
  }
}
