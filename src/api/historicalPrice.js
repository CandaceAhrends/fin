import axios from "./Axios";
import { of, from, forkJoin, throwError, Observable } from "rxjs";
import { switchMap, map, tap, catchError, reduce } from "rxjs/operators";
import moment from 'moment';
//const url = "http://localhost:3200/user";
const url = symbol => `https://financialmodelingprep.com/api/v3/historical-chart/1min/${symbol}?apikey=`;

const key = 'a6bc9823f42d03208d2933eef1c722bd';


const historicalPrice = symbol => {


    return from(axios.get(`${url(symbol)}${key}`))
        .pipe(
            map((res) => res.data),
            catchError((error) => {
                return of({ message: "Server Error" });
            })
        );

}

export default historicalPrice;