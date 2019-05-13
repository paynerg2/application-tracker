import { applicationConstants } from '../_constants';

const initialState = {
    applicationList: [],
    loading: false
};

export function applications(state = initialState, action) {
    switch (action.type) {
        case applicationConstants.GETALL_REQUEST:
            return {
                ...state,
                loading: true
            };
        case applicationConstants.GETALL_SUCCESS:
            return {
                loading: false,
                applicationList: action.applications
            };
        case applicationConstants.GETALL_FAILURE:
            return {
                error: action.error
            };
        case applicationConstants.GETBYID_REQUEST:
            return {
                ...state,
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
                ...state,
                loading: true
            };
        case applicationConstants.CREATE_FAILURE:
            return {
                error: action.error
            };
        case applicationConstants.UPDATE_REQUEST:
            return {
                ...state,
                loading: true
            };
        case applicationConstants.UPDATE_SUCCESS:
            // Remove old version of updated entry, replace with updated version
            const listWithoutUpdatedApplication = state.applicationList.filter(
                app => app.id !== action.update.id
            );
            //const updatedList = state.applicationList.map(app => app.id === action.update.id ? action.update : app);
            return {
                applicationList: [
                    ...listWithoutUpdatedApplication,
                    action.update
                ],
                loading: false
            };
        case applicationConstants.UPDATE_FAILURE:
            return {
                error: action.error
            };
        case applicationConstants.DELETE_REQUEST:
            return {
                ...state,
                loading: true
            };
        case applicationConstants.DELETE_SUCCESS:
            const { id } = action;
            const updatedApplicationList = state.applicationList.filter(
                app => app.id !== id
            );
            return {
                applicationList: updatedApplicationList,
                loading: false
            };
        case applicationConstants.DELETE_FAILURE:
            return {
                error: action.error
            };
        default:
            return state;
    }
}
