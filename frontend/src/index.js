import React from "react";
import ReactDOM from "react-dom";
//redux tools
import { Provider } from "react-redux";
import store from "./store.js";

import "./bootstrap.min.css";
import "./index.css";
import App from "./App";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
