import React, { useEffect } from "react";
import StockChart from "./StockChart";
import DateRange from "../querybar/DateRange";
import * as moment from "moment";
import historicalPriceByRange from "../../api/historicalPriceRange";
import { saveLocalData, getLocalData } from "../../utils";
import { take } from "rxjs/operators";

const DATE_FORMAT = "YYYY-MM-DD";
const DASHBOARD_STATE = "querydates";
const getCurrentDate = () => moment().format(DATE_FORMAT);
const getEarlierDate = () => moment().subtract(45, "days").format(DATE_FORMAT);

const HistoricalChart = (props) => {
  const [results, setResults] = React.useState({ price: [], rsi: [] });
  const [query, setQuery] = React.useState({
    toDate: getCurrentDate(),
    fromDate: getEarlierDate(),
  });

  useEffect(() => {
    const savedDates = getLocalData(DASHBOARD_STATE);
    if (savedDates) setQuery(savedDates);
  }, []);

  useEffect(() => {
    saveLocalData(query, DASHBOARD_STATE);
  }, [query]);

  useEffect(() => {
    console.log("use effect historical props change", props.symbol);
    const rangeQuery = { ...query, symbol: props.symbol };
    if (props.symbol) load(rangeQuery);
  }, [props.symbol]);

  const handleDateSelect = (evt) => {
    setQuery({ ...query, [evt.target.name]: evt.target.value });
  };

  const load = (rangeQuery) => {
    historicalPriceByRange(rangeQuery)
      .pipe(take(1))
      .subscribe((prices) => {
        const priceData = transformRangeData(prices.historical);

        const queryprices = {
          price: [...priceData],
          id: "historical",
          // type: "Spline",
        };

        setResults({
          ...queryprices,
        });

        props.setChartResults({ ...queryprices });
      });
  };
  return (
    <>
      <div style={{ marginLeft: "15.5rem" }}>
        <DateRange
          toDate={query.toDate}
          fromDate={query.fromDate}
          handleDateSelect={handleDateSelect}
        ></DateRange>
      </div>
    </>
  );
};
const transformRangeData = (data = []) => {
  //date: "2021-03-22 12:12:00"
  //date: "2021-03-22 13:15:00"
  //		date, open, high, low, close, volume
  return data
    .reverse()
    .map((d) => {
      return {
        date: moment.utc(`${d.date}T00:00:00-00:00`).valueOf(),
        open: d.open,
        high: d.low,
        low: d.high,
        close: d.close,

        volume: d.volume,
      };
    })
    .map((d) => Object.values(d));
};
export default HistoricalChart;
