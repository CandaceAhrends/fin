
const stockData = chart => ({
    "ohlcv": chart.price,

    "offchart": [{
        "name": "RSI, 20",
        "type": "RSI",
        "data": chart.rsi,
        "settings": {
            "legend": false
        }

    }]
});
export const stockChartConfig = chart => ({
    data() {
        return {
            width: window.innerWidth,
            height: window.innerHeight,
            stockData(chart)
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

                this.$data = { ...this.$data, ...stockData(chart) }

            }, 0);



        }
    },
    components: {
        trading: TradingVueJs.TradingVue
    }
});
