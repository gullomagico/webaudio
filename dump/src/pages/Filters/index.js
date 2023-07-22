import React from "react";
import ReactDOM from "react-dom";

import App from "@root/src/js/components/Filters";

import "./index.scss";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  rootElement
);
