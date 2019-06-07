import configureMockStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk';

import { interviewConstants } from '../../_constants';
import { interviewActions } from '../../_actions';
import { interviewService } from '../../_services';

/* The general testing strategy for interview actions is as follows:
    1. Use a spy on the service to create a mock of the service method
       called by the action creator.
    2. Mock the implementation of the method, returning a promise resolution or rejection.
    3. Mock the Redux store.
    4. Use the mock store to dispatch the action under test and test that it behaves as expected.
 */

const mockStore = configureMockStore([thunkMiddleware]);

describe('Interview Action Creator', () => {
    describe('Get All', () => {
        const resolveData = {
            interviews: [{ _id: 'test' }]
        };

        let getAllMock;
        beforeEach(() => {
            getAllMock = jest.spyOn(interviewService, 'getAll');
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
                    interviews: []
                };
                store = mockStore(() => initialState);
                store.dispatch(interviewActions.getAll());
            });

            it('should call the getAll service method', () => {
                expect(getAllMock).toHaveBeenCalled();
            });
            it('should dispatch request and success actions', () => {
                const expectedActions = [
                    { type: interviewConstants.GETALL_REQUEST },
                    {
                        type: interviewConstants.GETALL_SUCCESS,
                        interviews: resolveData
                    }
                ];
                expect(store.getActions()).toEqual(expectedActions);
            });
        });

        describe('on unsuccessful request', () => {
            it('should dispatch request and failure actions', async () => {
                getAllMock.mockImplementation(() => Promise.reject('error'));
                const store = mockStore();
                await store.dispatch(interviewActions.getAll());
                const expectedActions = [
                    { type: interviewConstants.GETALL_REQUEST },
                    {
                        type: interviewConstants.GETALL_FAILURE,
                        error: 'error'
                    }
                ];
                expect(store.getActions()).toEqual(expectedActions);
            });
        });
    });

    describe('Get By ID', () => {
        const resolveData = {
            interview: {
                _id: 'test'
            }
        };
        let getByIdMock;
        beforeEach(() => {
            getByIdMock = jest.spyOn(interviewService, 'getById');
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
                await store.dispatch(interviewActions.getById('id'));
            });

            it('should call the getById service method', () => {
                expect(getByIdMock).toHaveBeenCalled();
            });

            it('should dispatch request and success actions', () => {
                const expectedActions = [
                    { type: interviewConstants.GETBYID_REQUEST },
                    {
                        type: interviewConstants.GETBYID_SUCCESS,
                        interview: resolveData
                    }
                ];
                expect(store.getActions()).toEqual(expectedActions);
            });
        });

        describe('on unsuccessful request', () => {
            it('should dispatch request and failure actions', async () => {
                getByIdMock.mockImplementation(() => Promise.reject('error'));
                const store = mockStore();
                await store.dispatch(interviewActions.getById('id'));
                const expectedActions = [
                    { type: interviewConstants.GETBYID_REQUEST },
                    {
                        type: interviewConstants.GETBYID_FAILURE,
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
            createMock = jest.spyOn(interviewService, 'create');
        });

        afterEach(() => {
            createMock.mockClear();
        });

        describe('on successful request', () => {
            let store;
            beforeEach(async () => {
                createMock.mockImplementation(() => Promise.resolve({}));
                store = mockStore();
                const testInterview = {
                    _id: 'test'
                };
                await store.dispatch(interviewActions.create(testInterview));
            });

            it('should call the create service method', () => {
                expect(createMock).toHaveBeenCalled();
            });

            it('should dispatch a request action', () => {
                const expectedActions = [
                    { type: interviewConstants.CREATE_REQUEST }
                ];
                expect(store.getActions()).toEqual(expectedActions);
            });
        });

        describe('on unsuccessful request', () => {
            it('should dispatch request and failure actions', async () => {
                createMock.mockImplementation(() => Promise.reject('error'));
                const store = mockStore();
                await store.dispatch(interviewActions.create('test'));
                const expectedActions = [
                    { type: interviewConstants.CREATE_REQUEST },
                    {
                        type: interviewConstants.CREATE_FAILURE,
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
            updateMock = jest.spyOn(interviewService, 'update');
        });

        afterEach(() => {
            updateMock.mockClear();
        });

        const testId = 'test';
        const testInterview = {
            _id: 'test'
        };

        describe('on successful request', () => {
            let store;
            beforeEach(async () => {
                updateMock.mockImplementation(() => Promise.resolve({}));
                store = mockStore();
                await store.dispatch(
                    interviewActions.update(testId, testInterview)
                );
            });

            it('should call the update service method', () => {
                expect(updateMock).toHaveBeenCalled();
            });

            it('should dispatch request and success actions', () => {
                const expectedActions = [
                    { type: interviewConstants.UPDATE_REQUEST },
                    {
                        type: interviewConstants.UPDATE_SUCCESS,
                        update: testInterview
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
                    interviewActions.update(testId, testInterview)
                );
                const expectedActions = [
                    { type: interviewConstants.UPDATE_REQUEST },
                    {
                        type: interviewConstants.UPDATE_FAILURE,
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
            deleteMock = jest.spyOn(interviewService, 'delete');
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
                await store.dispatch(interviewActions.delete(testId));
            });

            it('should call the delete service method', () => {
                expect(deleteMock).toHaveBeenCalled();
            });

            it('should dispatch request and success actions', () => {
                const expectedActions = [
                    { type: interviewConstants.DELETE_REQUEST },
                    {
                        type: interviewConstants.DELETE_SUCCESS,
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
                await store.dispatch(interviewActions.delete(testId));
                const expectedActions = [
                    { type: interviewConstants.DELETE_REQUEST },
                    {
                        type: interviewConstants.DELETE_FAILURE,
                        error: 'error'
                    }
                ];
                expect(store.getActions()).toEqual(expectedActions);
            });
        });
    });
});
