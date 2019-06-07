import { users } from '../../_reducers/users.reducer';
import { userConstants } from '../../_constants';

describe('Users Reducer', () => {
    const defaultList = [
        { id: 'test 1', username: 'test 1' },
        { id: 'test 2', username: 'test 2' }
    ];
    const testMessage = 'test';

    describe('when no action present', () => {
        it('returns default state if no initial state present', () => {
            const defaultState = {};
            expect(users(undefined, {})).toEqual(defaultState);
        });

        it('returns state', () => {
            const initialState = {
                loading: false,
                items: defaultList
            };
            expect(users(initialState, {})).toEqual(initialState);
        });
    });

    describe('Get All Action', () => {
        const initialState = {
            loading: false,
            interviewList: defaultList
        };

        it('should handle get all request', () => {
            const action = {
                type: userConstants.GETALL_REQUEST
            };
            const expectedState = {
                loading: true
            };
            expect(users(initialState, action)).toEqual(expectedState);
        });

        it('should handle get all success', () => {
            const action = {
                type: userConstants.GETALL_SUCCESS,
                users: defaultList
            };
            const initialState = {
                loading: true
            };
            const expectedState = {
                items: defaultList
            };
            expect(users(initialState, action)).toEqual(expectedState);
        });

        it('should handle get all failure', () => {
            const action = {
                type: userConstants.GETALL_FAILURE,
                error: testMessage
            };
            const initialState = {
                loading: true
            };
            const expectedState = {
                error: testMessage
            };
            expect(users(initialState, action)).toEqual(expectedState);
        });
    });

    describe('Create Actions', () => {
        it('should handle create request', () => {
            const initialState = {};
            const action = {
                type: userConstants.CREATE_REQUEST
            };
            const expectedState = {
                loading: true
            };
            expect(users(initialState, action)).toEqual(expectedState);
        });

        it('should handle create failure', () => {
            const initialState = {
                loading: true
            };
            const action = {
                type: userConstants.CREATE_FAILURE,
                error: testMessage
            };
            const expectedState = {
                error: testMessage
            };
            expect(users(initialState, action)).toEqual(expectedState);
        });
    });
});
