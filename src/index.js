import React from "react";
import ReactDOM from "react-dom";

import Booking from "./components/Booking/Booking"
import Calendar from "./components/Calendar/Calendar"

const timeSlot = 30;

const timeSlice = {
  monday: { start: 9, end: 16 },
  tuesday: { start: 10, end: 15 },
  wednesday: { start: 9, end: 16 },
  thursday: { start: 9, end: 16 },
  friday: { start: 9, end: 18 },
  saturday: { start: 10, end: 19 },
  sunday: { start: 9, end: 14 }
}

const booking = null//<Booking />
ReactDOM.render(
  <Calendar timeSlot={timeSlot}
            timeSlice={timeSlice}>
    {booking}
  </Calendar>,
  document.getElementById("root")
);
