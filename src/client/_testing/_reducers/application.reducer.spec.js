import { applications } from '../../_reducers/applications.reducer';
import { applicationConstants } from '../../_constants';

describe('Applications Reducer', () => {
    const defaultList = [
        { id: 'test 1', name: 'test 1' },
        { id: 'test 2', name: 'test 2' }
    ];
    const testMessage = 'test';

    describe('when no action present', () => {
        it('returns default state if no initial state present', () => {
            const defaultState = {
                loading: false,
                applicationList: []
            };
            expect(applications(undefined, {})).toEqual(defaultState);
        });

        it('returns state', () => {
            const initialState = {
                loading: false,
                applicationList: defaultList
            };
            expect(applications(initialState, {})).toEqual(initialState);
        });
    });

    describe('Get All Actions', () => {
        const initialState = {
            loading: false,
            applicationList: defaultList
        };

        it('should handle get all request', () => {
            const action = {
                type: applicationConstants.GETALL_REQUEST
            };
            const expectedState = {
                loading: true,
                applicationList: defaultList
            };
            expect(applications(initialState, action)).toEqual(expectedState);
        });

        it('should handle get all success', () => {
            const action = {
                type: applicationConstants.GETALL_SUCCESS,
                applications: defaultList
            };
            const initialState = {
                loading: true,
                applicationList: []
            };
            const expectedState = {
                loading: false,
                applicationList: defaultList
            };
            expect(applications(initialState, action)).toEqual(expectedState);
        });

        it('should handle get all failure', () => {
            const action = {
                type: applicationConstants.GETALL_FAILURE,
                error: testMessage
            };
            const initialState = {
                loading: false,
                applicationList: defaultList
            };
            const expectedState = {
                error: testMessage
            };
            expect(applications(initialState, action)).toEqual(expectedState);
        });
    });

    describe('Get By ID Actions', () => {
        it('should handle get by ID request', () => {
            const initialState = {
                loading: false,
                applicationList: defaultList
            };
            const action = {
                type: applicationConstants.GETBYID_REQUEST
            };
            const expectedState = {
                loading: true,
                applicationList: defaultList
            };
            expect(applications(initialState, action)).toEqual(expectedState);
        });

        it('should handle get by ID failure', () => {
            const initialState = {
                loading: false,
                applicationList: defaultList
            };
            const action = {
                type: applicationConstants.GETBYID_FAILURE,
                error: testMessage
            };
            const expectedState = {
                error: testMessage
            };
            expect(applications(initialState, action)).toEqual(expectedState);
        });
    });

    describe('Create Actions', () => {
        it('should handle create request', () => {
            const initialState = {
                loading: false,
                applicationList: defaultList
            };
            const action = {
                type: applicationConstants.CREATE_REQUEST
            };
            const expectedState = {
                loading: true,
                applicationList: defaultList
            };
            expect(applications(initialState, action)).toEqual(expectedState);
        });

        it('should handle create success', () => {
            const initialState = {
                loading: true,
                applicationList: defaultList
            };
            const newApplication = {
                id: 'new test',
                name: 'new test'
            };
            const action = {
                type: applicationConstants.CREATE_SUCCESS,
                application: newApplication
            };
            const expectedState = {
                loading: false,
                applicationList: [...defaultList, newApplication]
            };
            expect(applications(initialState, action)).toEqual(expectedState);
        });

        it('should handle create failure', () => {
            const initialState = {
                loading: true,
                applicationList: defaultList
            };
            const action = {
                type: applicationConstants.CREATE_FAILURE,
                error: testMessage
            };
            const expectedState = {
                error: testMessage
            };
            expect(applications(initialState, action)).toEqual(expectedState);
        });
    });

    describe('Update Actions', () => {
        it('should handle update request', () => {
            const initialState = {
                loading: false,
                applicationList: defaultList
            };
            const action = {
                type: applicationConstants.UPDATE_REQUEST
            };
            const expectedState = {
                loading: true,
                applicationList: defaultList
            };
            expect(applications(initialState, action)).toEqual(expectedState);
        });

        it('should handle update success', () => {
            const initialState = {
                loading: true,
                applicationList: defaultList
            };
            const updatedItem = {
                id: defaultList[0].id,
                name: 'updated test 1'
            };
            const action = {
                type: applicationConstants.UPDATE_SUCCESS,
                update: updatedItem
            };
            const expectedState = {
                loading: false,
                applicationList: [defaultList[1], updatedItem]
            };
            expect(applications(initialState, action)).toEqual(expectedState);
        });

        it('should handle update failure', () => {
            const initialState = {
                loading: true,
                applicationList: defaultList
            };
            const action = {
                type: applicationConstants.UPDATE_FAILURE,
                error: testMessage
            };
            const expectedState = {
                error: testMessage
            };
            expect(applications(initialState, action)).toEqual(expectedState);
        });
    });

    describe('Delete Actions', () => {
        it('should handle delete request', () => {
            const initialState = {
                loading: false,
                applicationList: defaultList
            };
            const action = {
                type: applicationConstants.DELETE_REQUEST
            };
            const expectedState = {
                loading: true,
                applicationList: defaultList
            };
            expect(applications(initialState, action)).toEqual(expectedState);
        });

        it('should handle delete success', () => {
            const initialState = {
                loading: true,
                applicationList: defaultList
            };
            const action = {
                type: applicationConstants.DELETE_SUCCESS,
                id: defaultList[0].id
            };
            const expectedState = {
                loading: false,
                applicationList: [defaultList[1]]
            };
            expect(applications(initialState, action)).toEqual(expectedState);
        });

        it('should handle delete failure', () => {
            const initialState = {
                loading: true,
                applicationList: defaultList
            };
            const action = {
                type: applicationConstants.DELETE_FAILURE,
                error: testMessage
            };
            const expectedState = {
                error: testMessage
            };
            expect(applications(initialState, action)).toEqual(expectedState);
        });
    });
});
