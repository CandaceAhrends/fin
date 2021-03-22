

import axios from "./Axios";
import { of, from, forkJoin, throwError, Observable } from "rxjs";
import { switchMap, map, tap, catchError, reduce } from "rxjs/operators";


const key = 'a6bc9823f42d03208d2933eef1c722bd';

const url = symbol => `https://financialmodelingprep.com/api/v3/technical_indicator/1min/${symbol}?period=10&type=rsi&apikey=${key}`;


const rsi = symbol => {


    return from(axios.get(url(symbol)))
        .pipe(
            map((res) => res.data),
            catchError((error) => {
                return of({ message: "Server Error" });
            })
        );

}

export default rsi;