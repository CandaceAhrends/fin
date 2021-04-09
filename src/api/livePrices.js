import axios from "./Axios";
import { of, from, forkJoin, throwError, Observable } from "rxjs";
import { switchMap, take, map, tap, catchError, reduce } from "rxjs/operators";
import { apiKey } from "./config";
import { interval } from "rxjs";
const url = (symbol) =>
  `https://financialmodelingprep.com/api/v3/quote/${symbol}?apikey=`;

const livePrices = (symbol) => {
  return interval(10000).pipe(
    take(2),
    switchMap((i) =>
      from(axios.get(`${url(symbol)}${apiKey}`)).pipe(
        map((res) => res.data),
        catchError((error) => {
          return of({ message: "Server Error" });
        })
      )
    )
  );
  // return of
  getDummy();
  //return interval(1000).pipe(switchMap((i) => of(getDummy())));
};

export default livePrices;

function getDummy() {
  return [
    {
      symbol: "AAPL",
      name: "Apple Inc.",
      price: 130.36,
      changesPercentage: 1.92,
      change: 2.46,
      dayLow: 128.52,
      dayHigh: 130.39,
      yearHigh: 145.09,
      yearLow: 66.175,
      marketCap: 2188496732160.0,
      priceAvg50: 123.31229,
      priceAvg200: 123.54175,
      volume: 87394440,
      avgVolume: 107218581,
      exchange: "NASDAQ",
      open: 128.95,
      previousClose: 127.9,
      eps: 3.687,
      pe: 35.35666,
      earningsAnnouncement: "2021-01-27T16:30:00.000+0000",
      sharesOutstanding: 16788100124,
      timestamp: 1615915372045,
    },
  ];
}
