import { combineReducers } from 'redux';
import CalendarReducer from './CalendarReducer';

const rootReducer = combineReducers({
  calendar: CalendarReducer
});

export default rootReducer;
