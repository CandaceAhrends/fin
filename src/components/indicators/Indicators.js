import React from "react";
import * as moment from "moment";
import "./indicators.scss";
import historicalPriceByRange from "../../api/historicalPriceRange";
import { take } from "rxjs/operators";
import { movingAvg } from "./utils";

const get200DayRange = () => {
  const today = moment();
  const daysAgo200 = moment().subtract(200, "days");
  return {
    fromDate: today,
    toDate: daysAgo200,
  };
};

const Indicators = () => {
  const [historicalPrices, setHIstoricalPrices] = React.useState({});

  React.useEffect(() => {}, []);

  return (
    <>
      <div style={{ marginLeft: "15.5rem" }}>
        <p>indicator</p>
        <div class="popover-info">
          <p> testing </p>
        </div>
      </div>
    </>
  );
};

export default Indicators;

const transformRangeData = (data = []) => {
  //date: "2021-03-22 12:12:00"
  //date: "2021-03-22 13:15:00"
  //		date, open, high, low, close, volume
  return data.reverse().map((d) => {
    return {
      date: moment.utc(`${d.date}T00:00:00-00:00`).valueOf(),
      open: d.open,
      high: d.low,
      low: d.high,
      close: d.close,
      volume: d.volume,
    };
  });
};
