import {
  ADD_BOOKING
} from '../actions/bookingActions';

const INITIAL_STATE = {
  bookings: []
};

export default function bookingReducer(state = INITIAL_STATE, action) {
  switch(action.type) {
    case ADD_BOOKING:
      const booking = {
        ...action.data,
        isBooked: true
      };
      
      const bookings = state.bookings.push(booking);
      return Object.assign({}, state, { bookings: bookings });
    default:
      return state;
  }
}
