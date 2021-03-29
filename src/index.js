console.log("index.js starting");
import React, { Component } from "react";
import ReactDOM from "react-dom";
import App from "./app";
import "./styles.scss";


console.log("creating trading view");
const wrapper = document.getElementById("container");
const tradingVueElement = document.createElement('div');
tradingVueElement.id = 'app';
tradingVueElement.innerHTML = ` 
<trading :data="stockData" :width="this.width" :height="this.height"></trading>
 `;


wrapper ? ReactDOM.render(<App />, wrapper) : false;


document.getElementById('stock-chart').appendChild(tradingVueElement);
//wrapper.appendChild(tradingVueElement);