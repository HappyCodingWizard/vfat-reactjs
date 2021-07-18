import React from "react";
import ReactDOM from "react-dom";
import "animate.css/animate.compat.css";
import "react-calendar/dist/Calendar.css";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import $ from "jquery";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


window.printLog = () => {
  let logger = document.getElementById('log');
  $('#logger').append(logger.innerHTML);  
  logger.innerHTML = "";
}

window.printStyledLog = () => {
  let logger = document.getElementById('log');
  let jQuery = require('jquery');

  let styled = jQuery('<div/>', {
    class: "pool-container"
  }).append(jQuery('<div/>', {
    class: "pool-board"
  }).append(logger.innerHTML));

  $('#logger').append(styled)
  logger.innerHTML = "";
}
