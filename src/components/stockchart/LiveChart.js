import React, { useEffect } from "react";
import StockChart from "../stockchart/StockChart";
import Today from "../querybar/Today";

import livePrices from "../../api/livePrices";

const trades = (trade) => {
  //  //		date, open, high, low, close, volume
  return [
    trade.timestamp,
    trade.open,
    trade.dayHigh,
    trade.dayLow,
    trade.previousClose,
    trade.volume,
  ];
};

const sma = (trade) => {
  return [trade.timestamp, trade.priceAvg200];
};
const removeDupes = (totals) => {
  return Array.from(
    totals
      .reduce((items, item) => {
        items.set(item[0], item);
        return items;
      }, new Map())
      .values()
  );
};

const TodayChart = (props) => {
  const [results, setResults] = React.useState({ price: [], rsi: [], sma: [] });

  useEffect(() => {
    const runningTotals = [];
    const runningSma = [];
    const subscription$ = livePrices(props.symbol).subscribe((prices) => {
      const stockData = prices.pop();
      runningTotals.push([...trades(stockData)]);
      runningSma.push([...sma(stockData)]);
      const queryprices = {
        price: removeDupes(runningTotals),
        offCharts: [{ type: "sma", data: removeDupes(runningSma) }],
        id: "live",
        // type: "Spline",
      };

      setResults({
        ...queryprices,
      });
      props.setChartResults({ ...queryprices });
    });
    return () => subscription$.unsubscribe();
  }, [props.symbol]);

  const tests = [
    [1615915372045, 125.98, 125.98, 125.98, 125.98, 100],
    [1615915372651, 125.9908, 125.9908, 125.9908, 125.9908, 2],
  ];
  return <></>;
};

export default TodayChart;
