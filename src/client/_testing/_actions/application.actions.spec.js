import configureMockStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk';

import { applicationConstants } from '../../_constants';
import { applicationActions } from '../../_actions';
import { applicationService } from '../../_services/application.service';

/* The general testing strategy for application actions is as follows:
    1. Use a spy on the service to create a mock of the service method
       called by the action creator.
    2. Mock the implementation of the method, returning a promise resolution or rejection.
    3. Mock the Redux store.
    4. Use the mock store to dispatch the action under test and test that it behaves as expected.
 */

const mockStore = configureMockStore([thunkMiddleware]);

describe('Application Action Creator', () => {
    describe('Get All', () => {
        const resolveData = {
            applications: [
                {
                    _id: 'test'
                }
            ]
        };
        let getAllMock;
        beforeEach(() => {
            getAllMock = jest.spyOn(applicationService, 'getAll');
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
                    applications: []
                };
                store = mockStore(() => initialState);
                store.dispatch(applicationActions.getAll());
            });

            it('should call the getAll service method', () => {
                expect(getAllMock).toHaveBeenCalled();
            });
            it('should dispatch request and success actions', () => {
                const expectedActions = [
                    { type: applicationConstants.GETALL_REQUEST },
                    {
                        type: applicationConstants.GETALL_SUCCESS,
                        applications: resolveData
                    }
                ];
                expect(store.getActions()).toEqual(expectedActions);
            });
        });

        describe('on unsuccessful request', () => {
            it('should dispatch request and failure actions', async () => {
                getAllMock.mockImplementation(() => Promise.reject('error'));
                const store = mockStore();
                await store.dispatch(applicationActions.getAll());
                const expectedActions = [
                    { type: applicationConstants.GETALL_REQUEST },
                    {
                        type: applicationConstants.GETALL_FAILURE,
                        error: 'error'
                    }
                ];
                expect(store.getActions()).toEqual(expectedActions);
            });
        });
    });

    describe('Get By ID', () => {
        const resolveData = {
            application: {
                _id: 'test'
            }
        };
        let getByIdMock;
        beforeEach(() => {
            getByIdMock = jest.spyOn(applicationService, 'getById');
        });

        afterEach(() => {
            getByIdMock.mockClear();
        });

        describe('on successful request', () => {
            let store;
            beforeEach(async () => {
                getByIdMock.mockImplementation(() =>
                    Promise.resolve(resolveData)
                );
                store = mockStore();
                await store.dispatch(applicationActions.getById('id'));
            });

            it('should call the getById service method', () => {
                expect(getByIdMock).toHaveBeenCalled();
            });

            it('should dispatch request and success actions', () => {
                const expectedActions = [
                    { type: applicationConstants.GETBYID_REQUEST },
                    {
                        type: applicationConstants.GETBYID_SUCCESS,
                        application: resolveData
                    }
                ];
                expect(store.getActions()).toEqual(expectedActions);
            });
        });

        describe('on unsuccessful request', () => {
            it('should dispatch request and failure actions', async () => {
                getByIdMock.mockImplementation(() => Promise.reject('error'));
                const store = mockStore();
                await store.dispatch(applicationActions.getById('id'));
                const expectedActions = [
                    { type: applicationConstants.GETBYID_REQUEST },
                    {
                        type: applicationConstants.GETBYID_FAILURE,
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
            createMock = jest.spyOn(applicationService, 'create');
        });

        afterEach(() => {
            createMock.mockClear();
        });

        describe('on successful request', () => {
            const testApplication = {
                _id: 'test'
            };
            let store;
            beforeEach(async () => {
                createMock.mockImplementation(() => Promise.resolve({}));
                store = mockStore();

                await store.dispatch(
                    applicationActions.create(testApplication)
                );
            });

            it('should call the create service method', () => {
                expect(createMock).toHaveBeenCalled();
            });

            it('should dispatch request and success actions', () => {
                const expectedActions = [
                    { type: applicationConstants.CREATE_REQUEST },
                    {
                        type: applicationConstants.CREATE_SUCCESS,
                        application: testApplication
                    }
                ];
                expect(store.getActions()).toEqual(expectedActions);
            });
        });

        describe('on unsuccessful request', () => {
            it('should dispatch request and failure actions', async () => {
                createMock.mockImplementation(() => Promise.reject('error'));
                const store = mockStore();
                await store.dispatch(applicationActions.create('test'));
                const expectedActions = [
                    { type: applicationConstants.CREATE_REQUEST },
                    {
                        type: applicationConstants.CREATE_FAILURE,
                        error: 'error'
                    }
                ];
                expect(store.getActions()).toEqual(expectedActions);
            });
        });
    });

    describe('Update', () => {
        let updateMock;
        beforeEach(() => {
            updateMock = jest.spyOn(applicationService, 'update');
        });

        afterEach(() => {
            updateMock.mockClear();
        });

        const testId = 'test';
        const testApplication = {
            _id: 'test'
        };

        describe('on successful request', () => {
            let store;
            beforeEach(async () => {
                updateMock.mockImplementation(() => Promise.resolve({}));
                store = mockStore();
                await store.dispatch(
                    applicationActions.update(testId, testApplication)
                );
            });

            it('should call the update service method', () => {
                expect(updateMock).toHaveBeenCalled();
            });

            it('should dispatch request and success actions', () => {
                const expectedActions = [
                    { type: applicationConstants.UPDATE_REQUEST },
                    {
                        type: applicationConstants.UPDATE_SUCCESS,
                        update: testApplication
                    }
                ];
                expect(store.getActions()).toEqual(expectedActions);
            });
        });

        describe('on unsuccessful request', () => {
            it('should dispatch request and failure actions', async () => {
                updateMock.mockImplementation(() => Promise.reject('error'));
                const store = mockStore();
                await store.dispatch(
                    applicationActions.update(testId, testApplication)
                );
                const expectedActions = [
                    { type: applicationConstants.UPDATE_REQUEST },
                    {
                        type: applicationConstants.UPDATE_FAILURE,
                        error: 'error'
                    }
                ];
                expect(store.getActions()).toEqual(expectedActions);
            });
        });
    });

    describe('Delete', () => {
        let deleteMock;
        beforeEach(() => {
            deleteMock = jest.spyOn(applicationService, 'delete');
        });

        afterEach(() => {
            deleteMock.mockClear();
        });

        const testId = 'test';

        describe('on successful request', () => {
            let store;
            beforeEach(async () => {
                deleteMock.mockImplementation(() => Promise.resolve({}));
                store = mockStore();
                await store.dispatch(applicationActions.delete(testId));
            });

            it('should call the delete service method', () => {
                expect(deleteMock).toHaveBeenCalled();
            });

            it('should dispatch request and success actions', () => {
                const expectedActions = [
                    { type: applicationConstants.DELETE_REQUEST },
                    {
                        type: applicationConstants.DELETE_SUCCESS,
                        id: testId
                    }
                ];
                expect(store.getActions()).toEqual(expectedActions);
            });
        });

        describe('on unsuccessful request', () => {
            it('should dispatch request and failure actions', async () => {
                deleteMock.mockImplementation(() => Promise.reject('error'));
                const store = mockStore();
                await store.dispatch(applicationActions.delete(testId));
                const expectedActions = [
                    { type: applicationConstants.DELETE_REQUEST },
                    {
                        type: applicationConstants.DELETE_FAILURE,
                        error: 'error'
                    }
                ];
                expect(store.getActions()).toEqual(expectedActions);
            });
        });
    });
});
