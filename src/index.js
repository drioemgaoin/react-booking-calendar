import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import Calendar from "./components/Calendar/Calendar"
import Booking from "./components/Booking/Booking"
import configureStore from './store/configureStore.js';
import './style/main.scss';

const store = configureStore();

var bookingComponent = <Booking services={[ { "id": 1, "type": "ladies", "name": "Wash and Blow Dry", "slot": 45, "price": 22 }]} />

ReactDOM.render(
  <Provider store={store}>
    <Calendar booking={bookingComponent} />
  </Provider>,
  document.getElementById("main")
);
