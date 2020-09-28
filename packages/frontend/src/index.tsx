import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import store from "./store/store";
import 'semantic-ui-css/semantic.min.css';
/* import "./wdyr"; */


const root = document.getElementById("root");

const load = () => {
  const App = require("./App").default;
  render(
    <Provider store={store}>
      <App />
    </Provider>,
    root
  );
};

load();

if (process.env.NODE_ENV === "development" && module.hot) {
  module.hot.accept("./App", load);
}
