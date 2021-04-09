import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { StoreContext } from "../../AppContext";
import { subscribe, unsubscribe } from "../../api/quotes";
import * as moment from "moment";

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
};
// useEffect(() => {
//     const chartData = {
//         price: historicalPrice(s).pipe(take(1)),
//         rsi: rsi(s).pipe(take(1))
//     }

//     const o = forkJoin(chartData);
//     o.subscribe({
//         next: value => {
//             setResults({
//                 price: transformTradeData(value.price),
//                 rsi: transformRSIData(value.rsi)
//             });
//         },
//         complete: () => console.log('This is how it ends!'),
//     });

// }, s);
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
const data = transformTradeData(getData());
console.log(data);
const Dashboard = () => {
  const history = useHistory();
  const [state, dispatch] = useContext(StoreContext);
  let stockChart = null;
  useEffect(() => {
    if (state.isAuthenticated) {
      subscribe();

      // setTimeout(() => {

      //     unsubscribe('AAPL');

      // }, 10000);
    } else {
      history.push("/login");
    }
  });

  useEffect(() => {
    stockChart = new Vue({
      el: "#app",
      data() {
        return {
          stockData: {
            ohlcv: data,

            offchart: [
              {
                name: "RSI, 20",
                type: "RSI",
                data: [[1555315200000, 59.79775300640897]],
                settings: {
                  upper: 70,
                  lower: 30,
                  backColor: "#9b9ba316",
                  bandColor: "purple",
                },
              },
            ],
          },
        };
      },
      methods: {
        reset() {
          Object.assign(this.$data, { stockData: {} });
          setTimeout(() => {
            Object.assign(this.$data, {
              stockData: {
                ohlcv: [
                  [1588597200000, 8705.99, 8830.2, 8705.99, 8821.2, 597.03],
                  [1588600800000, 8821.2, 8845, 8775.8, 8787, 376.39],
                  [1588604400000, 8787, 8845, 8787, 8844.8, 180.09],
                  [1588608000000, 8844.73, 8890, 8800, 8827.6, 240.39],
                  [1588611600000, 8827.7, 8851, 8754.9, 8802.35, 200.83],
                  [1588615200000, 8802.3, 8877.1, 8801.4, 8846.5, 116.25],
                ],
              },
            });
          }, 0);
        },
      },
      components: {
        trading: TradingVueJs.TradingVue,
      },
    });
  });
  const testReset = () => stockChart.reset();

  return (
    <>
      <p>test</p>
      <button onClick={testReset}>Test Reset </button>
    </>
  );
};

export default Dashboard;

function getData() {
  return [
    {
      date: "2021-02-22 13:25:00",
      open: 20.84,
      low: 20.83,
      high: 20.89,
      close: 20.88,
      volume: 149196,
    },
    {
      date: "2021-02-22 13:24:00",
      open: 20.88,
      low: 20.83,
      high: 20.88,
      close: 20.83,
      volume: 113613,
    },
    {
      date: "2021-02-22 13:23:00",
      open: 20.85,
      low: 20.84,
      high: 20.89,
      close: 20.87,
      volume: 193637,
    },
    {
      date: "2021-02-22 13:22:00",
      open: 20.8,
      low: 20.79,
      high: 20.86,
      close: 20.85,
      volume: 184259,
    },
    {
      date: "2021-02-22 13:21:00",
      open: 20.79,
      low: 20.78,
      high: 20.8,
      close: 20.8,
      volume: 57717,
    },
    {
      date: "2021-02-22 13:20:00",
      open: 20.79,
      low: 20.77,
      high: 20.82,
      close: 20.8,
      volume: 118095,
    },
    {
      date: "2021-02-22 13:19:00",
      open: 20.8,
      low: 20.77,
      high: 20.8,
      close: 20.79,
      volume: 101466,
    },
    {
      date: "2021-02-22 13:18:00",
      open: 20.79,
      low: 20.78,
      high: 20.8,
      close: 20.8,
      volume: 84873,
    },
    {
      date: "2021-02-22 13:17:00",
      open: 20.78,
      low: 20.77,
      high: 20.79,
      close: 20.79,
      volume: 44600,
    },
    {
      date: "2021-02-22 13:16:00",
      open: 20.8,
      low: 20.77,
      high: 20.81,
      close: 20.78,
      volume: 114058,
    },
    {
      date: "2021-02-22 13:15:00",
      open: 20.81,
      low: 20.79,
      high: 20.81,
      close: 20.8,
      volume: 59933,
    },
    {
      date: "2021-02-22 13:14:00",
      open: 20.79,
      low: 20.78,
      high: 20.81,
      close: 20.81,
      volume: 83079,
    },
    {
      date: "2021-02-22 13:13:00",
      open: 20.78,
      low: 20.77,
      high: 20.81,
      close: 20.79,
      volume: 87874,
    },
    {
      date: "2021-02-22 13:12:00",
      open: 20.78,
      low: 20.77,
      high: 20.8,
      close: 20.78,
      volume: 51933,
    },
    {
      date: "2021-02-22 13:11:00",
      open: 20.79,
      low: 20.77,
      high: 20.8,
      close: 20.79,
      volume: 47635,
    },
    {
      date: "2021-02-22 13:10:00",
      open: 20.82,
      low: 20.77,
      high: 20.82,
      close: 20.78,
      volume: 63794,
    },
    {
      date: "2021-02-22 13:09:00",
      open: 20.77,
      low: 20.77,
      high: 20.82,
      close: 20.82,
      volume: 79962,
    },
    {
      date: "2021-02-22 13:08:00",
      open: 20.76,
      low: 20.75,
      high: 20.78,
      close: 20.77,
      volume: 98353,
    },
    {
      date: "2021-02-22 13:07:00",
      open: 20.77,
      low: 20.74,
      high: 20.78,
      close: 20.76,
      volume: 159397,
    },
    {
      date: "2021-02-22 13:06:00",
      open: 20.8,
      low: 20.76,
      high: 20.8,
      close: 20.76,
      volume: 95636,
    },
    {
      date: "2021-02-22 13:05:00",
      open: 20.82,
      low: 20.8,
      high: 20.83,
      close: 20.8,
      volume: 58097,
    },
    {
      date: "2021-02-22 13:04:00",
      open: 20.84,
      low: 20.79,
      high: 20.84,
      close: 20.82,
      volume: 196215,
    },
    {
      date: "2021-02-22 13:03:00",
      open: 20.84,
      low: 20.83,
      high: 20.84,
      close: 20.84,
      volume: 74687,
    },
    {
      date: "2021-02-22 13:02:00",
      open: 20.86,
      low: 20.83,
      high: 20.86,
      close: 20.84,
      volume: 50067,
    },
    {
      date: "2021-02-22 13:01:00",
      open: 20.87,
      low: 20.85,
      high: 20.87,
      close: 20.86,
      volume: 85373,
    },
    {
      date: "2021-02-22 13:00:00",
      open: 20.89,
      low: 20.86,
      high: 20.89,
      close: 20.87,
      volume: 100993,
    },
    {
      date: "2021-02-22 12:59:00",
      open: 20.87,
      low: 20.87,
      high: 20.91,
      close: 20.88,
      volume: 220286,
    },
    {
      date: "2021-02-22 12:58:00",
      open: 20.84,
      low: 20.83,
      high: 20.87,
      close: 20.87,
      volume: 102861,
    },
    {
      date: "2021-02-22 12:57:00",
      open: 20.87,
      low: 20.83,
      high: 20.87,
      close: 20.84,
      volume: 133674,
    },
    {
      date: "2021-02-22 12:56:00",
      open: 20.87,
      low: 20.86,
      high: 20.89,
      close: 20.86,
      volume: 194166,
    },
    {
      date: "2021-02-22 12:55:00",
      open: 20.86,
      low: 20.85,
      high: 20.87,
      close: 20.87,
      volume: 82314,
    },
    {
      date: "2021-02-22 12:54:00",
      open: 20.85,
      low: 20.84,
      high: 20.87,
      close: 20.85,
      volume: 101971,
    },
    {
      date: "2021-02-22 12:53:00",
      open: 20.84,
      low: 20.82,
      high: 20.85,
      close: 20.85,
      volume: 116841,
    },
    {
      date: "2021-02-22 12:52:00",
      open: 20.84,
      low: 20.84,
      high: 20.86,
      close: 20.85,
      volume: 71047,
    },
    {
      date: "2021-02-22 12:51:00",
      open: 20.86,
      low: 20.82,
      high: 20.86,
      close: 20.85,
      volume: 127812,
    },
    {
      date: "2021-02-22 12:50:00",
      open: 20.86,
      low: 20.85,
      high: 20.87,
      close: 20.86,
      volume: 148626,
    },
    {
      date: "2021-02-22 12:49:00",
      open: 20.83,
      low: 20.83,
      high: 20.86,
      close: 20.86,
      volume: 108977,
    },
    {
      date: "2021-02-22 12:48:00",
      open: 20.81,
      low: 20.79,
      high: 20.84,
      close: 20.83,
      volume: 214930,
    },
    {
      date: "2021-02-22 12:47:00",
      open: 20.82,
      low: 20.8,
      high: 20.82,
      close: 20.81,
      volume: 118799,
    },
    {
      date: "2021-02-22 12:46:00",
      open: 20.85,
      low: 20.8,
      high: 20.86,
      close: 20.81,
      volume: 198688,
    },
    {
      date: "2021-02-22 12:45:00",
      open: 20.9,
      low: 20.84,
      high: 20.9,
      close: 20.86,
      volume: 127595,
    },
    {
      date: "2021-02-22 12:44:00",
      open: 20.88,
      low: 20.88,
      high: 20.9,
      close: 20.9,
      volume: 84703,
    },
    {
      date: "2021-02-22 12:43:00",
      open: 20.87,
      low: 20.86,
      high: 20.89,
      close: 20.88,
      volume: 177248,
    },
    {
      date: "2021-02-22 12:42:00",
      open: 20.87,
      low: 20.83,
      high: 20.87,
      close: 20.87,
      volume: 147502,
    },
    {
      date: "2021-02-22 12:41:00",
      open: 20.85,
      low: 20.85,
      high: 20.88,
      close: 20.86,
      volume: 144365,
    },
    {
      date: "2021-02-22 12:40:00",
      open: 20.85,
      low: 20.83,
      high: 20.85,
      close: 20.85,
      volume: 76507,
    },
    {
      date: "2021-02-22 12:39:00",
      open: 20.85,
      low: 20.81,
      high: 20.85,
      close: 20.85,
      volume: 171534,
    },
    {
      date: "2021-02-22 12:38:00",
      open: 20.83,
      low: 20.83,
      high: 20.87,
      close: 20.85,
      volume: 78989,
    },
    {
      date: "2021-02-22 12:37:00",
      open: 20.89,
      low: 20.82,
      high: 20.9,
      close: 20.84,
      volume: 159274,
    },
    {
      date: "2021-02-22 12:36:00",
      open: 20.89,
      low: 20.88,
      high: 20.91,
      close: 20.89,
      volume: 133760,
    },
    {
      date: "2021-02-22 12:35:00",
      open: 20.9,
      low: 20.86,
      high: 20.9,
      close: 20.89,
      volume: 228406,
    },
    {
      date: "2021-02-22 12:34:00",
      open: 20.85,
      low: 20.84,
      high: 20.93,
      close: 20.9,
      volume: 226764,
    },
    {
      date: "2021-02-22 12:33:00",
      open: 20.84,
      low: 20.84,
      high: 20.87,
      close: 20.85,
      volume: 208461,
    },
    {
      date: "2021-02-22 12:32:00",
      open: 20.81,
      low: 20.81,
      high: 20.84,
      close: 20.84,
      volume: 88014,
    },
    {
      date: "2021-02-22 12:31:00",
      open: 20.81,
      low: 20.79,
      high: 20.82,
      close: 20.82,
      volume: 111298,
    },
    {
      date: "2021-02-22 12:30:00",
      open: 20.8,
      low: 20.79,
      high: 20.85,
      close: 20.82,
      volume: 204430,
    },
    {
      date: "2021-02-22 12:29:00",
      open: 20.79,
      low: 20.78,
      high: 20.8,
      close: 20.8,
      volume: 90401,
    },
    {
      date: "2021-02-22 12:28:00",
      open: 20.82,
      low: 20.79,
      high: 20.82,
      close: 20.8,
      volume: 163192,
    },
    {
      date: "2021-02-22 12:27:00",
      open: 20.8,
      low: 20.79,
      high: 20.82,
      close: 20.82,
      volume: 248254,
    },
    {
      date: "2021-02-22 12:26:00",
      open: 20.74,
      low: 20.73,
      high: 20.8,
      close: 20.8,
      volume: 166129,
    },
    {
      date: "2021-02-22 12:25:00",
      open: 20.72,
      low: 20.7,
      high: 20.75,
      close: 20.74,
      volume: 155028,
    },
    {
      date: "2021-02-22 12:24:00",
      open: 20.69,
      low: 20.68,
      high: 20.72,
      close: 20.72,
      volume: 108864,
    },
    {
      date: "2021-02-22 12:23:00",
      open: 20.66,
      low: 20.65,
      high: 20.69,
      close: 20.69,
      volume: 99926,
    },
    {
      date: "2021-02-22 12:22:00",
      open: 20.66,
      low: 20.64,
      high: 20.66,
      close: 20.66,
      volume: 77283,
    },
    {
      date: "2021-02-22 12:21:00",
      open: 20.64,
      low: 20.62,
      high: 20.66,
      close: 20.66,
      volume: 96216,
    },
    {
      date: "2021-02-22 12:20:00",
      open: 20.61,
      low: 20.61,
      high: 20.64,
      close: 20.64,
      volume: 81836,
    },
    {
      date: "2021-02-22 12:19:00",
      open: 20.64,
      low: 20.61,
      high: 20.66,
      close: 20.62,
      volume: 87012,
    },
    {
      date: "2021-02-22 12:18:00",
      open: 20.61,
      low: 20.58,
      high: 20.65,
      close: 20.65,
      volume: 132995,
    },
    {
      date: "2021-02-22 12:17:00",
      open: 20.62,
      low: 20.57,
      high: 20.62,
      close: 20.61,
      volume: 230431,
    },
    {
      date: "2021-02-22 12:16:00",
      open: 20.67,
      low: 20.62,
      high: 20.67,
      close: 20.63,
      volume: 60817,
    },
    {
      date: "2021-02-22 12:15:00",
      open: 20.67,
      low: 20.64,
      high: 20.67,
      close: 20.67,
      volume: 66221,
    },
    {
      date: "2021-02-22 12:14:00",
      open: 20.64,
      low: 20.64,
      high: 20.68,
      close: 20.67,
      volume: 83989,
    },
    {
      date: "2021-02-22 12:13:00",
      open: 20.64,
      low: 20.62,
      high: 20.64,
      close: 20.63,
      volume: 69133,
    },
    {
      date: "2021-02-22 12:12:00",
      open: 20.65,
      low: 20.63,
      high: 20.66,
      close: 20.64,
      volume: 87292,
    },
    {
      date: "2021-02-22 12:11:00",
      open: 20.63,
      low: 20.63,
      high: 20.68,
      close: 20.65,
      volume: 84979,
    },
    {
      date: "2021-02-22 12:10:00",
      open: 20.64,
      low: 20.63,
      high: 20.65,
      close: 20.64,
      volume: 63187,
    },
    {
      date: "2021-02-22 12:09:00",
      open: 20.68,
      low: 20.63,
      high: 20.69,
      close: 20.64,
      volume: 107019,
    },
    {
      date: "2021-02-22 12:08:00",
      open: 20.65,
      low: 20.64,
      high: 20.68,
      close: 20.68,
      volume: 149995,
    },
    {
      date: "2021-02-22 12:07:00",
      open: 20.65,
      low: 20.62,
      high: 20.65,
      close: 20.64,
      volume: 75116,
    },
    {
      date: "2021-02-22 12:06:00",
      open: 20.63,
      low: 20.62,
      high: 20.65,
      close: 20.65,
      volume: 40006,
    },
    {
      date: "2021-02-22 12:05:00",
      open: 20.64,
      low: 20.63,
      high: 20.67,
      close: 20.63,
      volume: 110570,
    },
    {
      date: "2021-02-22 12:04:00",
      open: 20.63,
      low: 20.61,
      high: 20.65,
      close: 20.64,
      volume: 123896,
    },
    {
      date: "2021-02-22 12:03:00",
      open: 20.66,
      low: 20.63,
      high: 20.67,
      close: 20.63,
      volume: 87838,
    },
    {
      date: "2021-02-22 12:02:00",
      open: 20.65,
      low: 20.63,
      high: 20.66,
      close: 20.65,
      volume: 88917,
    },
    {
      date: "2021-02-22 12:01:00",
      open: 20.66,
      low: 20.61,
      high: 20.66,
      close: 20.64,
      volume: 169735,
    },
    {
      date: "2021-02-22 12:00:00",
      open: 20.73,
      low: 20.66,
      high: 20.73,
      close: 20.66,
      volume: 199405,
    },
    {
      date: "2021-02-22 11:59:00",
      open: 20.74,
      low: 20.71,
      high: 20.74,
      close: 20.73,
      volume: 149469,
    },
    {
      date: "2021-02-22 11:58:00",
      open: 20.74,
      low: 20.73,
      high: 20.77,
      close: 20.74,
      volume: 261328,
    },
    {
      date: "2021-02-22 11:57:00",
      open: 20.73,
      low: 20.72,
      high: 20.75,
      close: 20.74,
      volume: 108152,
    },
    {
      date: "2021-02-22 11:56:00",
      open: 20.74,
      low: 20.72,
      high: 20.75,
      close: 20.73,
      volume: 149501,
    },
    {
      date: "2021-02-22 11:55:00",
      open: 20.72,
      low: 20.71,
      high: 20.75,
      close: 20.74,
      volume: 215298,
    },
    {
      date: "2021-02-22 11:54:00",
      open: 20.71,
      low: 20.7,
      high: 20.75,
      close: 20.71,
      volume: 160149,
    },
    {
      date: "2021-02-22 11:53:00",
      open: 20.7,
      low: 20.67,
      high: 20.72,
      close: 20.72,
      volume: 154716,
    },
    {
      date: "2021-02-22 11:52:00",
      open: 20.73,
      low: 20.69,
      high: 20.73,
      close: 20.71,
      volume: 147324,
    },
    {
      date: "2021-02-22 11:51:00",
      open: 20.68,
      low: 20.68,
      high: 20.73,
      close: 20.73,
      volume: 264281,
    },
    {
      date: "2021-02-22 11:50:00",
      open: 20.64,
      low: 20.62,
      high: 20.69,
      close: 20.69,
      volume: 290028,
    },
    {
      date: "2021-02-22 11:49:00",
      open: 20.67,
      low: 20.61,
      high: 20.67,
      close: 20.63,
      volume: 184709,
    },
    {
      date: "2021-02-22 11:48:00",
      open: 20.64,
      low: 20.64,
      high: 20.68,
      close: 20.67,
      volume: 408585,
    },
    {
      date: "2021-02-22 11:47:00",
      open: 20.59,
      low: 20.58,
      high: 20.65,
      close: 20.64,
      volume: 632664,
    },
    {
      date: "2021-02-22 11:46:00",
      open: 20.52,
      low: 20.52,
      high: 20.59,
      close: 20.59,
      volume: 356986,
    },
    {
      date: "2021-02-22 11:45:00",
      open: 20.54,
      low: 20.51,
      high: 20.55,
      close: 20.51,
      volume: 135283,
    },
    {
      date: "2021-02-22 11:44:00",
      open: 20.49,
      low: 20.48,
      high: 20.55,
      close: 20.55,
      volume: 196126,
    },
    {
      date: "2021-02-22 11:43:00",
      open: 20.49,
      low: 20.48,
      high: 20.52,
      close: 20.5,
      volume: 187937,
    },
    {
      date: "2021-02-22 11:42:00",
      open: 20.55,
      low: 20.48,
      high: 20.55,
      close: 20.49,
      volume: 214334,
    },
    {
      date: "2021-02-22 11:41:00",
      open: 20.55,
      low: 20.53,
      high: 20.56,
      close: 20.54,
      volume: 324765,
    },
    {
      date: "2021-02-22 11:40:00",
      open: 20.58,
      low: 20.54,
      high: 20.59,
      close: 20.55,
      volume: 155505,
    },
    {
      date: "2021-02-22 11:39:00",
      open: 20.6,
      low: 20.54,
      high: 20.61,
      close: 20.58,
      volume: 219886,
    },
    {
      date: "2021-02-22 11:38:00",
      open: 20.6,
      low: 20.6,
      high: 20.63,
      close: 20.61,
      volume: 102286,
    },
    {
      date: "2021-02-22 11:37:00",
      open: 20.63,
      low: 20.58,
      high: 20.64,
      close: 20.6,
      volume: 99496,
    },
    {
      date: "2021-02-22 11:36:00",
      open: 20.6,
      low: 20.6,
      high: 20.65,
      close: 20.64,
      volume: 342785,
    },
    {
      date: "2021-02-22 11:35:00",
      open: 20.55,
      low: 20.55,
      high: 20.6,
      close: 20.6,
      volume: 230499,
    },
    {
      date: "2021-02-22 11:34:00",
      open: 20.55,
      low: 20.54,
      high: 20.59,
      close: 20.55,
      volume: 190180,
    },
    {
      date: "2021-02-22 11:33:00",
      open: 20.55,
      low: 20.54,
      high: 20.57,
      close: 20.55,
      volume: 199054,
    },
    {
      date: "2021-02-22 11:32:00",
      open: 20.59,
      low: 20.52,
      high: 20.59,
      close: 20.55,
      volume: 127382,
    },
    {
      date: "2021-02-22 11:31:00",
      open: 20.58,
      low: 20.56,
      high: 20.6,
      close: 20.58,
      volume: 85125,
    },
    {
      date: "2021-02-22 11:30:00",
      open: 20.63,
      low: 20.54,
      high: 20.65,
      close: 20.58,
      volume: 292732,
    },
    {
      date: "2021-02-22 11:29:00",
      open: 20.56,
      low: 20.56,
      high: 20.63,
      close: 20.63,
      volume: 292457,
    },
    {
      date: "2021-02-22 11:28:00",
      open: 20.49,
      low: 20.48,
      high: 20.58,
      close: 20.57,
      volume: 324597,
    },
    {
      date: "2021-02-22 11:27:00",
      open: 20.48,
      low: 20.47,
      high: 20.5,
      close: 20.49,
      volume: 183366,
    },
    {
      date: "2021-02-22 11:26:00",
      open: 20.48,
      low: 20.44,
      high: 20.48,
      close: 20.48,
      volume: 241961,
    },
    {
      date: "2021-02-22 11:25:00",
      open: 20.49,
      low: 20.44,
      high: 20.51,
      close: 20.48,
      volume: 275676,
    },
  ];
}
