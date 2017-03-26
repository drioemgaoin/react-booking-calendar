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
      action.data.isBooked = true;
      return Object.assign({}, state, { bookings: [...state.bookings, action.data] });
    case OPEN_BOOKING:
      const initBooking = {
        startDate: action.data.startDate,
        endDate: action.data.endDate,
        isBooked: false
      };
      return Object.assign({}, state, { booking: initBooking });
    default:
      return state;
  }
}
