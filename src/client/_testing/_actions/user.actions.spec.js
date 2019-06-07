import configureMockStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk';

import { userConstants } from '../../_constants';
import { alertConstants } from '../../_constants';
import { userActions } from '../../_actions';
import { userService } from '../../_services';

const mockStore = configureMockStore([thunkMiddleware]);

describe('User Action Creator', () => {
    describe('Login', () => {
        const testUser = {
            username: 'test',
            password: 'test'
        };

        let loginMock;
        beforeEach(() => {
            loginMock = jest.spyOn(userService, 'login');
        });

        afterEach(() => {
            loginMock.mockClear();
        });

        describe('on successful request', () => {
            let store;
            beforeEach(() => {
                loginMock.mockImplementation(() => Promise.resolve(testUser));
                store = mockStore();
                store.dispatch(
                    userActions.login(testUser.username, testUser.password)
                );
            });

            it('should call the login service method', () => {
                expect(loginMock).toHaveBeenCalled();
            });

            it('should dispatch request and success actions', () => {
                const expectedActions = [
                    {
                        type: userConstants.LOGIN_REQUEST,
                        user: { username: testUser.username }
                    },
                    {
                        type: userConstants.LOGIN_SUCCESS,
                        user: testUser
                    }
                ];
                expect(store.getActions()).toEqual(expectedActions);
            });
        });

        describe('on unsuccessful request', () => {
            it('should dispatch request, error alert, and failure actions', async () => {
                loginMock.mockImplementation(() => Promise.reject('error'));
                const store = mockStore();
                await store.dispatch(
                    userActions.login(testUser.username, testUser.password)
                );
                const expectedActions = [
                    {
                        type: userConstants.LOGIN_REQUEST,
                        user: { username: testUser.username }
                    },
                    { type: userConstants.LOGIN_FAILURE, error: 'error' },
                    { type: alertConstants.ERROR, message: 'error' }
                ];
                expect(store.getActions()).toEqual(expectedActions);
            });
        });
    });

    describe('Logout', () => {
        const logoutMock = jest.spyOn(userService, 'logout');
        logoutMock.mockImplementation = jest.fn();

        const store = mockStore();
        store.dispatch(userActions.logout());
        it('should call the logout service method', () => {
            expect(logoutMock).toHaveBeenCalled();
        });

        it('should dispatch the logout action', () => {
            const expectedActions = [{ type: userConstants.LOGOUT }];
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    describe('Get All', () => {
        const resolveData = {
            users: [{ _id: 'test' }]
        };
        let getAllMock;
        beforeEach(() => {
            getAllMock = jest.spyOn(userService, 'getAll');
        });

        afterEach(() => {
            getAllMock.mockClear();
        });

        describe('on successful request', () => {
            let store;
            beforeEach(() => {
                getAllMock.mockImplementation(() =>
                    Promise.resolve(resolveData)
                );
                const initialState = {
                    users: []
                };
                store = mockStore(() => initialState);
                store.dispatch(userActions.getAll());
            });

            it('should call the getAll service method', () => {
                expect(getAllMock).toHaveBeenCalled();
            });
            it('should dispatch request and success actions', () => {
                const expectedActions = [
                    { type: userConstants.GETALL_REQUEST },
                    {
                        type: userConstants.GETALL_SUCCESS,
                        users: resolveData
                    }
                ];
                expect(store.getActions()).toEqual(expectedActions);
            });
        });

        describe('on unsuccessful request', () => {
            it('should dispatch request and failure actions', async () => {
                getAllMock.mockImplementation(() => Promise.reject('error'));
                const store = mockStore();
                await store.dispatch(userActions.getAll());
                const expectedActions = [
                    { type: userConstants.GETALL_REQUEST },
                    {
                        type: userConstants.GETALL_FAILURE,
                        error: 'error'
                    }
                ];
                expect(store.getActions()).toEqual(expectedActions);
            });
        });
    });

    describe('Create', () => {
        let createMock;
        beforeEach(() => {
            createMock = jest.spyOn(userService, 'create');
        });

        afterEach(() => {
            createMock.mockClear();
        });

        describe('on successful request', () => {
            let store;
            beforeEach(async () => {
                createMock.mockImplementation(() => Promise.resolve({}));
                store = mockStore();
                const testUser = {
                    _id: 'test'
                };
                await store.dispatch(userActions.create(testUser));
            });

            it('should call the create service method', () => {
                expect(createMock).toHaveBeenCalled();
            });

            it('should dispatch a request action', () => {
                const expectedActions = [
                    { type: userConstants.CREATE_REQUEST }
                ];
                expect(store.getActions()).toEqual(expectedActions);
            });
        });

        describe('on unsuccessful request', () => {
            it('should dispatch request and failure actions', async () => {
                createMock.mockImplementation(() => Promise.reject('error'));
                const store = mockStore();
                await store.dispatch(userActions.create('test'));
                const expectedActions = [
                    { type: userConstants.CREATE_REQUEST },
                    {
                        type: userConstants.CREATE_FAILURE,
                        error: 'error'
                    }
                ];
                expect(store.getActions()).toEqual(expectedActions);
            });
        });
    });
});
