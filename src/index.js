import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import Calendar from "./components/Calendar"
import configureStore from './store/configureStore.js';
import './style/main.scss';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <Calendar />
  </Provider>,
  document.getElementById("main")
);
