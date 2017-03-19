import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';

import Calendar from "./components/Calendar/Calendar"
import Booking from "./components/Booking/Booking"
import store from "./components/Booking/Store"

import './style/main.scss';

ReactDOM.render(
  <Calendar booking={<Booking />} />,
  document.getElementById("main")
);
