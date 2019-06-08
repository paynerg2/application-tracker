import { userConstants } from '../../_constants';
import { authentication } from '../../_reducers/authentication.reducer';
import { userActions } from '../../_actions';
import { init } from 'events';

describe('Authentication Reducer', () => {
    const testMessage = 'test';
    const defaultUser = {
        username: 'test'
    };

    describe('when no action present', () => {
        it('returns default state if no initial state present', () => {
            const defaultState = {};
            expect(authentication(undefined, {})).toEqual(defaultState);
        });

        it('returns state', () => {
            const initialState = {
                loggedIn: true,
                user: defaultUser
            };
            expect(authentication(initialState, {})).toEqual(initialState);
        });
    });

    describe('Login Actions', () => {
        it('should handle login request', () => {
            const initialState = {};
            const action = {
                type: userConstants.LOGIN_REQUEST,
                user: defaultUser
            };
            const expectedState = {
                loggingIn: true,
                user: defaultUser
            };
            expect(authentication(initialState, action)).toEqual(expectedState);
        });

        it('should handle login success', () => {
            const initialState = {
                loggingIn: true,
                user: defaultUser
            };
            const action = {
                type: userConstants.LOGIN_SUCCESS,
                user: defaultUser
            };
            const expectedState = {
                loggedIn: true,
                user: defaultUser
            };
            expect(authentication(initialState, action)).toEqual(expectedState);
        });

        it('should handle login failure', () => {
            const initialState = {
                loggingIn: true,
                user: defaultUser
            };
            const action = {
                type: userConstants.LOGIN_FAILURE
            };
            const expectedState = {};
            expect(authentication(initialState, action)).toEqual(expectedState);
        });
    });

    describe('Logout Actions', () => {
        it('should handle logout', () => {
            const initialState = {
                loggedIn: true,
                user: defaultUser
            };
            const action = {
                type: userConstants.LOGOUT
            };
            const expectedState = {};
            expect(authentication(initialState, action)).toEqual(expectedState);
        });
    });
});
