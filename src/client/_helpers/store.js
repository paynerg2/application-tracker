import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from '../_reducers';

const loggerMiddleware = createLogger();

export const middlewares = [thunkMiddleware, loggerMiddleware];

export const store = createStore(rootReducer, applyMiddleware(...middlewares));
