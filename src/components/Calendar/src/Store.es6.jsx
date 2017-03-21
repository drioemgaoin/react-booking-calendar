import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import reducer from './Reducer.es6.jsx';

export default function configureStore(initialState) {
  const finalCreateStore = compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )(createStore);

  const store = finalCreateStore(reducer, initialState);

  if (module.hot) {
    module.hot.accept('./Reducer', () => {
      const nextReducer = require('./Reducer');
      store.replaceReducer(nextReducer);
    });
  }
  return store;
}

module.exports = configureStore
