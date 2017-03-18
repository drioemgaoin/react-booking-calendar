import { combineReducers } from 'redux';

import CalendarReducer from './CalendarReducer';
import BookingReducer from './BookingReducer';

const rootReducer = combineReducers({
  calendar: CalendarReducer,
  booking: BookingReducer
});

export default rootReducer;
