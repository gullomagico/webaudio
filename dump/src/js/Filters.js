import React from "react";
import ReactDOM from "react-dom";

import App from "./components/Filters";

import "../scss/Filters.scss";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  rootElement
);
