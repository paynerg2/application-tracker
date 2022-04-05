import { applyMiddleware, createStore } from 'redux';
import rootReducer from '../../_reducers';
import { middlewares } from '../../app/store';

export const testStore = (initialState) => {
    const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);
    return createStoreWithMiddleware(rootReducer, initialState);
};
