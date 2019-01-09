export interface IMessage {
  type: string;
  product_id: string;
}

export type Level = [string, string];

export interface ISnaphsot extends IMessage {
  bids: Array<Level>;
  asks: Array<Level>;
}

export type Change = [string, string, string];

export interface IUpdate extends IMessage {
  changes: Array<Change>;
}
