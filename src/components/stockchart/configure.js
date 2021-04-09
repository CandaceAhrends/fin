import React, { useEffect } from "react";

const rsi = (rsi) => {
  return {
    name: "RSI, 20",
    type: "RSI",
    data: rsi,
    settings: {
      legend: false,
    },
  };
};

const sma = (sma) => {
  return {
    name: "200 Day Moving Average, 20",
    type: "SMA",
    data: sma,
    settings: {
      legend: true,
    },
  };
};
const offChartFnMap = {
  rsi: rsi,
  sma: sma,
};

const buildOffCharts = (charts) => {
  return charts.map((chart) => {
    return offChartFnMap[chart.type](chart.data);
  });
};

const configure = ({ price, type, offCharts = [] }) => {
  console.log("creating chart of type ", offCharts);
  const chartConfig = {
    chart: { type: type }, //Candles  Spline
    ohlcv: price,
  };

  const test = offCharts.length
    ? { ...chartConfig, offchart: buildOffCharts(offCharts) }
    : chartConfig;

  return test;
};
const windowWidth = () => window.innerWidth - 250;
const windowHeight = () => window.innerHeight - 220;

export const createStockChartVue = (chart) => {
  return new Vue({
    el: "#app",
    data() {
      return {
        width: windowWidth(),
        height: windowHeight(),

        stockData: configure(chart),
      };
    },
    mounted() {
      window.addEventListener("resize", this.onResize);
      window.DataCube = this.data;
    },

    computed: {
      colors() {
        return this.night
          ? {}
          : {
              colorBack: "#fff",
              colorGrid: "#eee",
              colorText: "#333",
            };
      },
    },
    beforeDestroy() {
      window.removeEventListener("resize", this.onResize);
    },
    methods: {
      onResize(event) {
        this.width = windowWidth();
        this.height = windowHeight();
      },
      update() {
        this.$forceUpdate();
      },
      close() {
        // destroy the vue listeners, etc
        this.$destroy();

        // remove the element from the DOM
        this.$el.parentNode.removeChild(this.$el);
        console.log("removed >>>>");
      },
      reset(resetData) {
        Object.assign(this.$data, { stockData: {} });
        setTimeout(() => {
          Object.assign(this.$data, {
            stockData: configure(resetData),
          });
        }, 0);
      },
    },
    components: {
      trading: TradingVueJs.TradingVue,
    },
  });
};
