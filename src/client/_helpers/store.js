import { configureStore } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
import reducers from '../_reducers';

const loggerMiddleware = createLogger();

export const middlewares = [loggerMiddleware];

export const store = configureStore({
    reducer: reducers,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middlewares),
    devTools: process.env.NODE_ENV !== 'production',
});
