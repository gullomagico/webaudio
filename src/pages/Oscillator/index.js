import React from "react";
import ReactDOM from "react-dom";

import App from "@root/src/js/components/Osc";

import "@root/src/scss/Oscillator.scss";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  rootElement
);
