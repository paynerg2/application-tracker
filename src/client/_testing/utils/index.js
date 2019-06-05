import checkPropTypes from 'check-prop-types';
import { applyMiddleware, createStore } from 'redux';
import rootReducer from '../../_reducers';
import { middlewares } from '../../_helpers/store';

export const checkProps = (component, expectedProps) => {
    const propsError = checkPropTypes(
        component.propTypes,
        expectedProps,
        'props',
        component.name
    );
    return propsError;
};

export const testStore = initialState => {
    const createStoreWithMiddleware = applyMiddleware(...middlewares)(
        createStore
    );
    return createStoreWithMiddleware(rootReducer, initialState);
};
