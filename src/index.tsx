import React from "react";
import ReactDOM from "react-dom";

// Components
import App from "./App";

// Global styles
import "./index.css";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  rootElement
);
