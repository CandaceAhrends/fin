import axios from "./Axios";
import { of, from, forkJoin, throwError, Observable } from "rxjs";
import { switchMap, map, tap, catchError, reduce } from "rxjs/operators";

import { apiKey } from "./config";

const url = (symbol) =>
  `https://financialmodelingprep.com/api/v3/historical-chart/1min/${symbol}?apikey=`;

const historicalPrice = (symbol) => {
  return from(axios.get(`${url(symbol)}${apiKey}`)).pipe(
    map((res) => res.data),
    catchError((error) => {
      return of({ message: "Server Error" });
    })
  );
};

export default historicalPrice;
