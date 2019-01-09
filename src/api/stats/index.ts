import { IStats } from "./model";

export class Stats {
  public static get(url: string): Promise<IStats> {
    return fetch(url)
      .then(res => {
        if (res.status < 200 || res.status > 299) return res;
        const response = res as Response;

        const text = response.text();
        if (text === null) return null;
        return text.then(v => JSON.parse(v));
      })
      .catch(error => {
        console.error(error);
      });
  }
}
