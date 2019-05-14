import { interviewConstants } from '../_constants';

const initialState = {
    interviewList: [],
    loading: false
};

export function interviews(state = initialState, action) {
    switch (action.type) {
        case interviewConstants.GETALL_REQUEST:
            return {
                ...state,
                loading: true
            };
        case interviewConstants.GETALL_SUCCESS:
            return {
                loading: false,
                interviewList: action.interviews
            };
        case interviewConstants.GETALL_FAILURE:
            return {
                error: action.error
            };
        case interviewConstants.GETBYID_REQUEST:
            return {
                ...state,
                loading: true
            };
        case interviewConstants.GETBYID_SUCCESS:
            return {
                // ! Consider adding or replacing with 'get by application id'
            };
        case interviewConstants.GETBYID_FAILURE:
            return {
                error: action.error
            };
        case interviewConstants.CREATE_REQUEST:
            return {
                ...state,
                loading: true
            };
        case interviewConstants.CREATE_FAILURE:
            return {
                error: action.error
            };
        case interviewConstants.UPDATE_REQUEST:
            return {
                ...state,
                loading: true
            };
        case interviewConstants.UPDATE_SUCCESS:
            const { update } = action;
            const updatedList = state.interviewList.map(interview =>
                interview.id === update.id ? update : interview
            );
            return {
                interviewList: updatedList,
                loading: false
            };
        case interviewConstants.UPDATE_FAILURE:
            return {
                error: action.error
            };
        case interviewConstants.DELETE_REQUEST:
            return {
                ...state,
                loading: true
            };
        case interviewConstants.DELETE_SUCCESS:
            const { id } = action;
            const updatedInterviewList = state.interviewList.filter(
                interview => interview.id !== id
            );
            return {
                interviewList: updatedInterviewList,
                loading: false
            };
        case interviewConstants.DELETE_FAILURE:
            return {
                error: action.error
            };
        default:
            return state;
    }
}
