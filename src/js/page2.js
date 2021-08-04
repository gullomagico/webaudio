import React from "react";
import ReactDOM from "react-dom";

import App from "./components/Filter";

import "../scss/page2.scss";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  rootElement
);
