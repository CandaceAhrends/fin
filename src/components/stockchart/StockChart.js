import React, { useEffect, useState } from 'react';
import { createStockChartVue } from './configure';

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



export default StockChart;

