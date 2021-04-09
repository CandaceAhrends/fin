import React, { useState, useContext, useEffect } from "react";
import Indicators from "../indicators/Indicators";
import SideBar from "../sidebar/SideBar";
import Tabs from "../tabsbar/Tabs";
import HistoricalChart from "../stockchart/HistoricalChart";
import TodayChart from "../stockchart/TodayChart";
import LiveChart from "../stockchart/LiveChart";
import StockChart from "../stockchart/StockChart";
import { Switch, Route } from "react-router-dom";

const Dashboard = () => {
  const [symbol, setSymbol] = useState("FB");
  const [results, setResults] = React.useState({ price: [], rsi: [] });
  const handleSelection = (s) => {
    setSymbol(s);
  };
  const setChartResults = (res) => {
    setResults(res);
  };
  return (
    <>
      <div
        style={{
          position: "absolute",
          top: 0,
          height: "99vh",
          width: "15rem",
        }}
      >
        <SideBar handleSelection={handleSelection}></SideBar>
      </div>
      <div style={{ marginLeft: "15.5rem" }}>
        <Tabs></Tabs>
      </div>

      <div id="stock-chart">
        <StockChart data={results}></StockChart>
        <Switch>
          <Route path={`/today`}>
            <TodayChart
              setChartResults={setChartResults}
              symbol={symbol}
            ></TodayChart>
            {/* <div id="stock-chart">
              <LiveChart
                setChartResults={setChartResults}
                symbol={symbol}
              ></LiveChart>
            </div> */}
          </Route>

          <Route path={"/historical"}>
            <HistoricalChart
              setChartResults={setChartResults}
              symbol={symbol}
            ></HistoricalChart>
          </Route>
          <Route path={"/indicators"}>
            <Indicators></Indicators>
          </Route>
        </Switch>
      </div>
    </>
  );
};

export default Dashboard;
