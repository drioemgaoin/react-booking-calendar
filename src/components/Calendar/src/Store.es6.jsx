import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import reducer from './reducers/headerReducer';

export function configureStore(initialState) {
  const finalCreateStore = compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )(createStore);

  const store = finalCreateStore(reducer, initialState);

  if (module.hot) {
    module.hot.accept('./reducers/headerReducer', () => {
      const nextReducer = require('./reducers/headerReducer');
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}

export default configureStore()
module.export = configureStore()
