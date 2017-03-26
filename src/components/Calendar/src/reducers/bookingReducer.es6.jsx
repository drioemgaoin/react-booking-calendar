import {
  ADD_BOOKING,
  OPEN_BOOKING
} from '../actions/bookingActions';

const INITIAL_STATE = {
  bookings: [],
  booking: {}
};

export default function bookingReducer(state = INITIAL_STATE, action) {
  switch(action.type) {
    case ADD_BOOKING:
      const newBooking = {
        ...action.data,
        isBooked: true
      };

      const bookings = state.bookings.push(newBooking);
      return Object.assign({}, state, { bookings: bookings });
    case OPEN_BOOKING:
      const booking = {
        startDate: action.data.startDate,
        endDate: action.data.endDate,
        isBooked: false
      };
      return Object.assign({}, state, { booking: booking });
    default:
      return state;
  }
}
