import axios from "./Axios";
import { of, from, forkJoin, throwError, Observable } from "rxjs";
import { switchMap, map, tap, catchError, reduce } from "rxjs/operators";
import { apiKey } from "./config";

const url = (symbol) =>
  `https://financialmodelingprep.com/api/v3/technical_indicator/1min/${symbol}?period=10&type=rsi&apikey=${apiKey}`;

const rsi = (symbol) => {
  return from(axios.get(url(symbol))).pipe(
    map((res) => res.data),
    catchError((error) => {
      return of({ message: "Server Error" });
    })
  );
};

export default rsi;
