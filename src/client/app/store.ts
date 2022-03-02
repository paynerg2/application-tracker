import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
import { api } from '../services/api';
import { authApi } from '../services/authApi';

const loggerMiddleware = createLogger();

export const middlewares = [loggerMiddleware, authApi.middleware, api.middleware];
export const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
        [authApi.reducerPath]: authApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middlewares),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
