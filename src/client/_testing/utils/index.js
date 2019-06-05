import checkPropTypes from 'check-prop-types';
import { applyMiddleware, createStore } from 'redux';
import rootReducer from '../../_reducers';

export const checkProps = (component, expectedProps) => {
    const propsError = checkPropTypes(
        component.propTypes,
        expectedProps,
        'props',
        component.name
    );
    return propsError;
};
