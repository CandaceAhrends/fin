
const rsiConfig = rsi => {

    return [{
        "name": "RSI, 20",
        "type": "RSI",
        "data": rsi,
        "settings": {
            "legend": false
        }
    }]
}

const configure = ({ price, rsi }) => {
    return {
        ohlcv: price,
        offchart: rsi ? rsiConfig(rsi) : {}
    }
}
const windowWidth = () => window.innerWidth - 250;
const windowHeight = () => window.innerHeight - 150;

export const createStockChartVue = (chart) => {
    return new Vue({
        el: "#app",
        data() {
            return {
                width: windowWidth(),
                height: windowHeight(),
                stockData: configure(chart)
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
            },
            reset(resetData) {

                Object.assign(this.$data, { stockData: {} });
                setTimeout(() => {
                    Object.assign(this.$data,
                        {
                            stockData: configure(resetData)
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
