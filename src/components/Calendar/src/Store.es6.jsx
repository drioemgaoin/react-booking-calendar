import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form'
import thunk from 'redux-thunk';

import calendarReducer from './reducers/calendarReducer';
import bookingReducer from './reducers/bookingReducer';

const reducers = combineReducers({
  calendar: calendarReducer,
  booking: bookingReducer,
  form: reduxFormReducer
})

export function configureStore(initialState) {
  const finalCreateStore = compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )(createStore);

  return finalCreateStore(reducers, initialState);
}

export default configureStore();
module.export = configureStore();
