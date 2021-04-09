import React, { useEffect, useState } from "react";
import { createStockChartVue } from "./configure";

const StockChart = ({ data }) => {
  const [created, setCreated] = useState(null);
  useEffect(() => {
    if (!created && data.price.length) {
      const stockChart = createStockChartVue(data);
      setCreated(stockChart);
    } else {
      created && created.reset(data) && created.update();
    }
  }, [data]);

  useEffect(() => {
    console.log("init chart >>>>>>");
    return () => created && created.close();
  }, []);

  return <></>;
};

export default StockChart;
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
