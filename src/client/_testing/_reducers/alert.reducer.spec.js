import { alert } from '../../_reducers/alert.reducer';
import { alertConstants } from '../../_constants';

describe('Alert Reducer', () => {
    it('Returns default state by default', () => {
        expect(alert(undefined, {})).toEqual({});
    });

    it('should handle the success alert', () => {
        const testMessage = 'test';
        const expectedState = {
            type: 'alert-success',
            message: testMessage
        };
        const action = {
            type: alertConstants.SUCCESS,
            message: testMessage
        };
        expect(alert(undefined, action)).toEqual(expectedState);
    });

    it('should handle the error alert', () => {
        const testMessage = 'test';
        const expectedState = {
            type: 'alert-danger',
            message: testMessage
        };
        const action = {
            type: alertConstants.ERROR,
            message: testMessage
        };
        expect(alert(undefined, action)).toEqual(expectedState);
    });

    it('should clear alerts', () => {
        const testMessage = 'test';
        const expectedState = {};
        const initialState = {
            type: alertConstants.SUCCESS,
            message: testMessage
        };
        const action = {
            type: alertConstants.CLEAR
        };
        expect(alert(initialState, action)).toEqual(expectedState);
    });
});
