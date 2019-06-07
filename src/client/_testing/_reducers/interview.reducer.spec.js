import { interviews } from '../../_reducers/interviews.reducer';
import { interviewConstants } from '../../_constants';

describe('Interviews Reducer', () => {
    const defaultList = [
        { id: 'test 1', name: 'test 1' },
        { id: 'test 2', name: 'test 2' }
    ];
    const testMessage = 'test';

    describe('when no action present', () => {
        it('returns default state if no initial state present', () => {
            const defaultState = {
                loading: false,
                interviewList: []
            };
            expect(interviews(undefined, {})).toEqual(defaultState);
        });

        it('returns state', () => {
            const initialState = {
                loading: false,
                interviewList: defaultList
            };
            expect(interviews(initialState, {})).toEqual(initialState);
        });
    });

    describe('Get All Actions', () => {
        const initialState = {
            loading: false,
            interviewList: defaultList
        };

        it('should handle get all request', () => {
            const action = {
                type: interviewConstants.GETALL_REQUEST
            };
            const expectedState = {
                loading: true,
                interviewList: defaultList
            };
            expect(interviews(initialState, action)).toEqual(expectedState);
        });

        it('should handle get all success', () => {
            const action = {
                type: interviewConstants.GETALL_SUCCESS,
                interviews: defaultList
            };
            const initialState = {
                loading: true,
                interviewList: []
            };
            const expectedState = {
                loading: false,
                interviewList: defaultList
            };
            expect(interviews(initialState, action)).toEqual(expectedState);
        });

        it('should handle get all failure', () => {
            const action = {
                type: interviewConstants.GETALL_FAILURE,
                error: testMessage
            };
            const initialState = {
                loading: false,
                interviewList: defaultList
            };
            const expectedState = {
                error: testMessage
            };
            expect(interviews(initialState, action)).toEqual(expectedState);
        });
    });

    describe('Get By ID Actions', () => {
        it('should handle get by ID request', () => {
            const initialState = {
                loading: false,
                interviewList: defaultList
            };
            const action = {
                type: interviewConstants.GETBYID_REQUEST
            };
            const expectedState = {
                loading: true,
                interviewList: defaultList
            };
            expect(interviews(initialState, action)).toEqual(expectedState);
        });

        it('should handle get by ID failure', () => {
            const initialState = {
                loading: false,
                interviewList: defaultList
            };
            const action = {
                type: interviewConstants.GETBYID_FAILURE,
                error: testMessage
            };
            const expectedState = {
                error: testMessage
            };
            expect(interviews(initialState, action)).toEqual(expectedState);
        });
    });

    describe('Create Actions', () => {
        it('should handle create request', () => {
            const initialState = {
                loading: false,
                interviewList: defaultList
            };
            const action = {
                type: interviewConstants.CREATE_REQUEST
            };
            const expectedState = {
                loading: true,
                interviewList: defaultList
            };
            expect(interviews(initialState, action)).toEqual(expectedState);
        });

        it('should handle create failure', () => {
            const initialState = {
                loading: true,
                interviewList: defaultList
            };
            const action = {
                type: interviewConstants.CREATE_FAILURE,
                error: testMessage
            };
            const expectedState = {
                error: testMessage
            };
            expect(interviews(initialState, action)).toEqual(expectedState);
        });
    });

    describe('Update Actions', () => {
        it('should handle update request', () => {
            const initialState = {
                loading: false,
                interviewList: defaultList
            };
            const action = {
                type: interviewConstants.UPDATE_REQUEST
            };
            const expectedState = {
                loading: true,
                interviewList: defaultList
            };
            expect(interviews(initialState, action)).toEqual(expectedState);
        });

        it('should handle update success', () => {
            const initialState = {
                loading: true,
                interviewList: defaultList
            };
            const updatedItem = {
                id: defaultList[0].id,
                name: 'updated test 1'
            };
            const action = {
                type: interviewConstants.UPDATE_SUCCESS,
                update: updatedItem
            };
            const expectedState = {
                loading: false,
                interviewList: [updatedItem, defaultList[1]]
            };
            expect(interviews(initialState, action)).toEqual(expectedState);
        });

        it('should handle update failure', () => {
            const initialState = {
                loading: true,
                interviewList: defaultList
            };
            const action = {
                type: interviewConstants.UPDATE_FAILURE,
                error: testMessage
            };
            const expectedState = {
                error: testMessage
            };
            expect(interviews(initialState, action)).toEqual(expectedState);
        });
    });

    describe('Delete Actions', () => {
        it('should handle delete request', () => {
            const initialState = {
                loading: false,
                interviewList: defaultList
            };
            const action = {
                type: interviewConstants.DELETE_REQUEST
            };
            const expectedState = {
                loading: true,
                interviewList: defaultList
            };
            expect(interviews(initialState, action)).toEqual(expectedState);
        });

        it('should handle delete success', () => {
            const initialState = {
                loading: true,
                interviewList: defaultList
            };
            const action = {
                type: interviewConstants.DELETE_SUCCESS,
                id: defaultList[0].id
            };
            const expectedState = {
                loading: false,
                interviewList: [defaultList[1]]
            };
            expect(interviews(initialState, action)).toEqual(expectedState);
        });

        it('should handle delete failure', () => {
            const initialState = {
                loading: true,
                interviewList: defaultList
            };
            const action = {
                type: interviewConstants.DELETE_FAILURE,
                error: testMessage
            };
            const expectedState = {
                error: testMessage
            };
            expect(interviews(initialState, action)).toEqual(expectedState);
        });
    });
});
