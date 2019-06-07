import configureMockStore from 'redux-mock-store';

import { alertActions } from '../../_actions';
import { alertConstants } from '../../_constants';

const mockStore = configureMockStore();
let store;
const testMessage = 'test';

describe('Alert Action Creator', () => {
    describe('Success Message', () => {
        it('dispatches a success action', () => {
            store = mockStore();
            const expectedActions = [
                { type: alertConstants.SUCCESS, message: testMessage }
            ];
            store.dispatch(alertActions.success(testMessage));
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    describe('Error Message', () => {
        it('dispatches an error message', () => {
            store = mockStore();
            const expectedActions = [
                { type: alertConstants.ERROR, message: testMessage }
            ];
            store.dispatch(alertActions.error(testMessage));
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    describe('Clear Message', () => {
        it('dispatches a clear action', () => {
            store = mockStore();
            const expectedActions = [{ type: alertConstants.CLEAR }];
            store.dispatch(alertActions.clear());
            expect(store.getActions()).toEqual(expectedActions);
        });
    });
});
