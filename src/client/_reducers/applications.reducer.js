import { applicationConstants } from '../_constants';

const initialState = {
    applicationList: [],
    loading: false
};

export function applications(state = initialState, action) {
    switch (action.type) {
        case applicationConstants.GETALL_REQUEST:
            return {
                loading: true
            };
        case applicationConstants.GETALL_SUCCESS:
            return {
                applicationList: action.applications
            };
        case applicationConstants.GETALL_FAILURE:
            return {
                error: action.error
            };
        case applicationConstants.GETBYID_REQUEST:
            return {
                loading: true
            };
        case applicationConstants.GETBYID_SUCCESS:
            return {
                // !
            };
        case applicationConstants.GETBYID_FAILURE:
            return {
                error: action.error
            };
        case applicationConstants.CREATE_REQUEST:
            return {
                loading: true
            };
        case applicationConstants.CREATE_FAILURE:
            return {
                error: action.error
            };
        case applicationConstants.UPDATE_REQUEST:
            return {
                loading: true
            };
        case applicationConstants.UPDATE_FAILURE:
            return {
                error: action.error
            };
        case applicationConstants.DELETE_REQUEST:
            return {
                loading: true
            };
        case applicationConstants.DELETE_FAILURE:
            return {
                error: action.error
            };
        default:
            return state;
    }
}
