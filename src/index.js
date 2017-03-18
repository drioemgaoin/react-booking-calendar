import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import Calendar from "./components/Calendar/Calendar"
import Booking from "./components/Booking/Booking"
import configureStore from './store/configureStore.js';
import './style/main.scss';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <Calendar booking={Booking} />
  </Provider>,
  document.getElementById("main")
);
