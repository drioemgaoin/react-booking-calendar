import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import modalReducer from './reducers/modalReducer';
import viewReducer from './reducers/viewReducer';
import dateReducer from './reducers/dateReducer';

function combined(state = {}, action) {
  const view = viewReducer(state.view, action)
  return {
    modal: modalReducer(state.modal, action),
    view,
    date: dateReducer(state.date, action, view.type)
  };
}

export function configureStore(initialState) {
  const finalCreateStore = compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )(createStore);

  const store = finalCreateStore(combined, initialState);

  // if (module.hot) {
  //   module.hot.accept('./reducers', () => {
  //     store.replaceReducer(reducers);
  //   });
  // }
  return store;
}

export default configureStore()
module.export = configureStore()
