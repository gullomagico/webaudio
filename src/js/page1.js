import React from "react";
import ReactDOM from "react-dom";

import App from "./components/Osc";

import "../scss/page1.scss";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  rootElement
);
