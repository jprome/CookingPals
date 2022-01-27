import * as React from "react"
import { render } from "react-dom"
import { createStore, applyMiddleware, Store } from "redux"
import { Provider } from "react-redux"
import thunk from "redux-thunk"
import { BrowserRouter, Route, Routes  } from 'react-router-dom'
import { composeWithDevTools } from 'redux-devtools-extension'

import App from "./App"
import reducer from "./redux/reducer"

const store = createStore(reducer, applyMiddleware(thunk))

const rootElement = document.getElementById("root")
render(
  <Provider store={store}>
    <BrowserRouter basename="/">
    <App />
    </BrowserRouter>
  </Provider>,
  rootElement
)