import React, { useEffect, useState } from 'react';

const StockChart = ({ data, title }) => {


    const [test, setTest] = useState(null);
    useEffect(() => {
        console.log("RESETING NEW DATA", data);
        if (!test) {
            console.log("NEW CREATION >>>>> EXISTS NEW DATA", data);
            const stockChart = createStockChartVue(data);
            setTest(stockChart);
        }
        else {
            console.log("ALREADY EXISTS NEW DATA", data);
            test.reset(data);
            test.update();
        }
    }, [data]);



    return (<><p>{title}</p></>);
}

const createStockChartVue = (chart) => {
    return new Vue({
        el: "#app",
        data() {
            return {
                width: window.innerWidth,
                height: window.innerHeight,
                stockData: {
                    "ohlcv": chart.price,

                    "offchart": [{
                        "name": "RSI, 20",
                        "type": "RSI",
                        "data": chart.rsi,
                        "settings": {
                            "legend": false
                        }

                    }]
                }
            }


        },
        mounted() {
            window.addEventListener('resize', this.onResize)
            window.DataCube = this.data
        },

        computed: {
            colors() {
                return this.night ? {} : {
                    colorBack: '#fff',
                    colorGrid: '#eee',
                    colorText: '#333'
                }
            },
        },
        beforeDestroy() {
            window.removeEventListener('resize', this.onResize)
        },
        methods: {
            onResize(event) {
                console.log(window.innerWidth);
                this.width = window.innerWidth;
                this.height = window.innerHeight;
            },
            update() {
                this.$forceUpdate();
            },
            close() {
                // destroy the vue listeners, etc
                this.$destroy();

                // remove the element from the DOM
                this.$el.parentNode.removeChild(this.$el);
            },
            reset(resetData) {

                Object.assign(this.$data, { stockData: {} });
                setTimeout(() => {
                    Object.assign(this.$data,
                        {
                            stockData: {
                                "ohlcv": resetData.price,

                                "offchart": [{
                                    "name": "RSI, 20",
                                    "type": "RSI",
                                    "data": resetData.rsi,
                                    "settings": {
                                        "legend": false
                                    }

                                }]
                            }
                        }

                    );

                }, 0);



            }
        },
        components: {
            trading: TradingVueJs.TradingVue
        }
    });


}


export default StockChart;

