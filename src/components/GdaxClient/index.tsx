import React from "react";
import { GdaxClientProps } from "./props";
import connect from "./connector";
import { Change } from "./model";
import { Stats } from "../../api/stats";

export default class GdaxClient extends React.PureComponent<GdaxClientProps> {
  public static readonly connected = connect(GdaxClient);

  constructor(props: GdaxClientProps) {
    super(props);
    this.getStats = this.getStats.bind(this);
  }

  componentDidMount() {
    this.getStats();

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

    setInterval(this.getStats, 60000);
  }

  private async getStats() {
    const stats = await Stats.get(
      "https://api.pro.coinbase.com/products/BTC-USD/stats"
    );
    this.props.updateStats(stats);
  }

  render() {
    return null;
  }
}
