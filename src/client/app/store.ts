import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
import { api } from '../services/api';
import { authApi } from '../services/authApi';
import signupReducer from '../features/forms/signupSlice';
import authReducer from '../features/auth/authSlice';

const loggerMiddleware = createLogger();

export const middlewares = [loggerMiddleware, authApi.middleware, api.middleware];
export const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
        auth: authReducer,
        [authApi.reducerPath]: authApi.reducer,
        signupForm: signupReducer,
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
