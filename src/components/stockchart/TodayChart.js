import React, { useEffect } from "react";
import StockChart from "../stockchart/StockChart";
import Today from "../querybar/Today";
import * as moment from "moment";
import { take } from "rxjs/operators";
import { forkJoin } from "rxjs";
import historicalPrice from "../../api/historicalPrice";
import rsi from "../../api/rsi";

const TodayChart = (props) => {
  const [results, setResults] = React.useState({ price: [], rsi: [] });

  useEffect(() => {
    if (props.symbol) load();
  }, [props.symbol]);

  const load = () => {
    const chartData = {
      price: historicalPrice(props.symbol).pipe(take(1)),
      rsi: rsi(props.symbol).pipe(take(1)),
    };

    const o = forkJoin(chartData);
    o.subscribe({
      next: (value) => {
        props.setChartResults({
          price: transformTradeData(value.price),
          offCharts: [{ type: "rsi", data: transformRSIData(value.rsi) }],
        });
      },
      complete: () => {},
    });
  };
  return (
    <>
      <div style={{ marginLeft: "15.5rem" }}>
        <Today></Today>
      </div>
    </>
  );
};

export default TodayChart;
const transformRSIData = (data) => {
  return data.reverse().map((d) => {
    return [moment.utc(d.date.replace(" ", "T") + "-00:00").valueOf(), d.rsi];
  });

  // return [
  //   [1555315200000, 59.79775300640897],
  //   [1555318800000, 60.46131186910198],
  //   [1555322400000, 54.80141442765696],
  // ];
};
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

  // return [
  //   [1588597200000, 8705.99, 8830.2, 8705.99, 8821.2, 597.03],
  //   [1588600800000, 8821.2, 8845, 8775.8, 8787, 376.39],
  //   [1588604400000, 8787, 8845, 8787, 8844.8, 180.09],
  //   [1588608000000, 8844.73, 8890, 8800, 8827.6, 240.39],
  //   [1588611600000, 8827.7, 8851, 8754.9, 8802.35, 200.83],
  //   [1588615200000, 8802.3, 8877.1, 8801.4, 8846.5, 116.25],
  // ];
};
