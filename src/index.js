import React from "react";
import ReactDOM from "react-dom";

import Booking from "./components/Booking/Booking"
import Calendar from "./components/Calendar/Calendar"

const booking = null//<Booking />
ReactDOM.render(
  <Calendar>
    {booking}
  </Calendar>,
  document.getElementById("root")
);
