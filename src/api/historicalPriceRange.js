import axios from "./Axios";
import { of, from, forkJoin, throwError, Observable } from "rxjs";
import { switchMap, map, tap, catchError, reduce } from "rxjs/operators";
import moment from 'moment';

const key = 'a6bc9823f42d03208d2933eef1c722bd';

const url = ({ symbol, fromDate, toDate }) => `https://financialmodelingprep.com/api/v3/historical-price-full/${symbol}?from=${fromDate}&to=${toDate}&apikey=${key}`;



const historicalPriceByRange = (query) => {


    return from(axios.get(`${url(query)}`))
        .pipe(
            map((res) => res.data),
            catchError((error) => {
                return of({ message: "Server Error" });
            })
        );

}

export default historicalPriceByRange;