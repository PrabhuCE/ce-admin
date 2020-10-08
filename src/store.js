import { createStore, applyMiddleware, compose } from "redux";
import combineReducers from "./Store/rootReducer";
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { persistStore } from 'redux-persist';
const middlewares = [logger, thunk];

export const store = createStore(combineReducers, applyMiddleware(...middlewares))

export const persistor = persistStore(store);

export default { store, persistor };