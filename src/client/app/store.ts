import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authReducer from '../state/authSlice';
import { setupListeners } from '@reduxjs/toolkit/query';
import { createLogger } from 'redux-logger';
import { api } from '../services/api';

const loggerMiddleware = createLogger();

export const middlewares = [loggerMiddleware, api.middleware];
export const store = configureStore({
    reducer: {
        auth: authReducer,
        [api.reducerPath]: api.reducer,
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

setupListeners(store.dispatch);
