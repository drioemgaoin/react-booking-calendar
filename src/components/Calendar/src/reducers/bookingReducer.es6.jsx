import {
  ADD_BOOKING,
  INIT_BOOKINGS
} from '../actions/bookingActions';

const INITIAL_STATE = {
  bookings: [],
};

export default function bookingReducer(state = INITIAL_STATE, action) {
  switch(action.type) {
    case INIT_BOOKINGS:
      return Object.assign({}, state, { bookings: action.data });
    case ADD_BOOKING:
      return Object.assign({}, state, { bookings: [...state.bookings, action.data] });
    default:
      return state;
  }
}
