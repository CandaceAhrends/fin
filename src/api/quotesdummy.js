import { aapl } from "../mock/stockStrem";
import { interval } from "rxjs";
import { map } from "rxjs/operators";

// Connection opened -> Subscribe
export const quotes = () => {
  return interval(1000).pipe(map((idx) => aapl[idx]));
};

const parsePrice = (data) => {
  return data.map((s) => {
    return {
      price: s.p,
      symbol: s.s,
    };
  });
};
