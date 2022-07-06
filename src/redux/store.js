import { applyMiddleware, createStore, compose } from 'redux'

import thunk from "redux-thunk";
import { storage } from "./local_storage";
import reducer from "./reducer/index";

/**
 * load state from local storage
 */
const loadState = () => {
  try {
    const local_storage = storage.get("_CALDERA_");

    if (local_storage === null) {
      return undefined;
    }
    return local_storage;
  } catch (e) {
    return undefined;
  }
};

//get initial state before page rendering
const preloadedState = { user: loadState() };

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  preloadedState,
  composeEnhancers(
    applyMiddleware(thunk)
  )
);

//save to local storage if redux state is changed
store.subscribe(() => {
  storage.store(
    "_CALDERA_",
    store.getState().user
  );
});

export default store;
