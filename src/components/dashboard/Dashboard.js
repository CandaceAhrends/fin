import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { StoreContext } from "../../AppContext";
import { subscribe, unsubscribe } from "../../api/quotes";
import * as moment from "moment";
import StockChart from "../stockchart/StockChart";
import historicalPrice from "../../api/historicalPrice";
import rsi from "../../api/rsi";
import { take } from "rxjs/operators";
import { forkJoin } from "rxjs";
import historicalPriceByRange from "../../api/historicalPriceRange";
import QueryBar from "../workarea/QueryBar";
import ScrollableList from "../list/ScrollableList";

const transformTradeData = (data) => {
  return data
    .reverse()
    .map((d) => {
      return {
        ...d,
        date: moment.utc(d.date.replace(" ", "T") + "-00:00").valueOf(),
        high: d.low,
        low: d.high,
      };
    })
    .map((d) => Object.values(d));

  // return [[1555315200000, 5194.8, 5197.3, 5182.4, 5192, 129.53875463],
  // [1555318800000, 5192, 5195.7, 5190, 5195.6, 90.52421995],
  // [1555322400000, 5195.6, 5195.7, 5170, 5174.2, 233.89034995]]
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

const testing = () => {
  const data = [
    { c: ["1"], p: 125.98, s: "AAPL", t: 1615915372045, v: 100 },
    { c: ["1", "12"], p: 125.9908, s: "AAPL", t: 1615915372651, v: 2 },
    { c: ["1"], p: 125.9992, s: "AAPL", t: 1615915372882, v: 800 },
    { c: ["1", "12"], p: 125.99, s: "AAPL", t: 1615915373035, v: 10 },
    { c: ["1"], p: 125.995, s: "AAPL", t: 1615915373403, v: 500 },
    { c: ["1", "8", "12"], p: 125.99, s: "AAPL", t: 1615915373417, v: 33 },
    { c: ["1", "8"], p: 125.99, s: "AAPL", t: 1615915373417, v: 100 },
    { c: ["1", "8"], p: 125.99, s: "AAPL", t: 1615915373417, v: 200 },
    { c: ["1", "8"], p: 125.99, s: "AAPL", t: 1615915373417, v: 100 },
    { c: ["1", "8"], p: 126, s: "AAPL", t: 1615915373419, v: 100 },
  ];
  console.log("testing testing >>>>>", trades);
  //      [1588597200000, 8705.99, 8830.2, 8705.99, 8821.2, 597.03],
  //[1588600800000, 8821.2, 8845, 8775.8, 8787, 376.39],

  const trades = data.map((trade) => {
    console.log(trade.p, trade.t, trade.v);

    return [trade.t, trade.p, trade.p, trade.p, trade.p, trade.v];
  });

  const test = [
    [1615915372045, 125.98, 125.98, 125.98, 125.98, 100],
    [1615915372651, 125.9908, 125.9908, 125.9908, 125.9908, 2],
  ];

  console.log("TRADES >>>>>", test, trades.slice(0, 2));

  return trades.slice(0, 5);
};
const transformRSIData = (data) => {
  return data.reverse().map((d) => {
    return [moment.utc(d.date.replace(" ", "T") + "-00:00").valueOf(), d.rsi];
  });

  // return [
  //     [1555315200000, 59.79775300640897],
  //     [1555318800000, 60.46131186910198],
  //     [1555322400000, 54.80141442765696]]
};

const Dashboard = () => {
  const history = useHistory();
  const [state, dispatch] = useContext(StoreContext);

  const [data, setData] = useState({ price: [], rsi: [] });

  const [symbol, setSymbol] = useState("AAPL");

  // useEffect(() => {
  //     const chartData = {
  //         price: historicalPrice(symbol).pipe(take(1)),
  //         rsi: rsi(symbol).pipe(take(1))
  //     }

  //     const o = forkJoin(chartData);
  //     o.subscribe({
  //         next: value => {
  //             setData({
  //                 price: transformTradeData(value.price),
  //                 rsi: transformRSIData(value.rsi)
  //             });
  //         },
  //         complete: () => console.log('This is how it ends!'),
  //     });

  // }, symbol);

  const loadTest = (query) => {
    const queryprices = {
      price: [...testing()],
      rsi: [],
    };
    setData({
      ...queryprices,
    });
    console.log("load test exe query >>>>>>", query, queryprices);
  };

  const load = () => {
    historicalPriceByRange(query)
      .pipe(take(1))
      .subscribe((prices) => {
        const priceData = transformRangeData(prices.historical);
        console.log("price returned from range", priceData);
        const queryprices = {
          price: [...priceData],
          rsi: [],
        };
        console.log(">>>>>", queryprices);
        setData({
          ...queryprices,
        });
      });
  };

  const itemsTest = [
    { title: "one" },
    { title: "two" },
    { title: "two" },
    { title: "two" },
    { title: "two" },
    { title: "two" },
    { title: "two" },
    { title: "two" },
    { title: "two" },
    { title: "two" },
    { title: "two" },
    { title: "two" },
    { title: "two" },
    { title: "two" },
    { title: "two" },
    { title: "last" },
  ];

  return (
    <>
      <div
        style={{
          position: "absolute",
          top: 0,
          height: "99vh",
          width: "15rem",
          border: "solid green",
        }}
      >
        <ScrollableList items={itemsTest}></ScrollableList>
      </div>
      <div id="work-area" style={{ marginLeft: "16rem" }}>
        <QueryBar onClick={loadTest}></QueryBar>
      </div>
      <div id="stock-chart">
        <StockChart data={data} title={symbol}></StockChart>
      </div>
    </>
  );
};

export default Dashboard;
