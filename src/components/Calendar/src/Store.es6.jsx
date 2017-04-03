import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form'
import thunk from 'redux-thunk';

import viewReducer from './reducers/viewReducer';
import dateReducer from './reducers/dateReducer';
import bookingReducer from './reducers/bookingReducer';

const reducers = combineReducers({
  view: viewReducer,
  date: dateReducer,
  booking: bookingReducer,
  form: reduxFormReducer
})

export function configureStore(initialState) {
  const finalCreateStore = compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )(createStore);

  const store = finalCreateStore(reducers, initialState);

  // if (module.hot) {
  //   module.hot.accept('./reducers', () => {
  //     store.replaceReducer(reducers);
  //   });
  // }
  return store;
}

export default configureStore();
module.export = configureStore();
