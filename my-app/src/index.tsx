import * as React from "react";
import { render } from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { BrowserRouter } from "react-router-dom";
import { composeWithDevTools } from "redux-devtools-extension";
import "./styles/profiles.css";

import App from "./App";
import reducer from "./redux/reducers";

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

const rootElement = document.getElementById("root");
render(
  <Provider store={store}>
    <BrowserRouter basename="/">
      <App />
    </BrowserRouter>
  </Provider>,
  rootElement
);
