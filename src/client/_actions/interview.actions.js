import { interviewConstants } from '../_constants';
import { interviewService } from '../_services';
import { history } from '../_helpers';

export const interviewActions = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

function getAll() {
    return dispatch => {
        dispatch(request());

        interviewService
            .getAll()
            .then(
                interviews => dispatch(success(interviews)),
                error => dispatch(failure(error))
            );

        function request() {
            return { type: interviewConstants.GETALL_REQUEST };
        }
        function success(interviews) {
            return { type: interviewConstants.GETALL_SUCCESS, interviews };
        }
        function failure(error) {
            return { type: interviewConstants.GETALL_FAILURE, error };
        }
    };
}

function getById(id) {
    return dispatch => {
        dispatch(request());

        interviewService
            .getById(id)
            .then(
                interview => dispatch(success(interview)),
                error => dispatch(failure(error))
            );
    };

    function request() {
        return { type: interviewConstants.GETBYID_REQUEST };
    }
    function success(interview) {
        return { type: interviewConstants.GETALL_REQUEST, interview };
    }
    function failure(error) {
        return { type: interviewConstants.GETALL_REQUEST, error };
    }
}

function create(interview) {
    return dispatch => {
        dispatch(request());

        interviewService
            .create(interview)
            .then(history.push('/'))
            .catch(err => dispatch(failure(err)));
    };

    function request() {
        return { type: interviewConstants.CREATE_REQUEST };
    }
    function failure(error) {
        return { type: interviewConstants.CREATE_FAILURE, error };
    }
}

function update(id, update) {
    return dispatch => {
        dispatch(request());

        interviewService
            .update(id, update)
            .then(() => {
                dispatch(success(update));
                history.push('/');
            })
            .catch(err => dispatch(failure(err)));
    };

    function request() {
        return { type: interviewConstants.UPDATE_REQUEST };
    }
    function success(update) {
        return { type: interviewConstants.UPDATE_SUCCESS, update };
    }
    function failure(error) {
        return { type: interviewConstants.UPDATE_FAILURE, error };
    }
}

function _delete(id) {
    return dispatch => {
        dispatch(request());

        interviewService
            .delete(id)
            .then(() => {
                dispatch(success(id));
                history.push('/');
            })
            .catch(err => dispatch(failure(err)));
    };

    function request() {
        return { type: interviewConstants.DELETE_REQUEST };
    }
    function success(id) {
        return { type: interviewConstants.DELETE_SUCCESS, id };
    }
    function failure(error) {
        return { type: interviewConstants.DELETE_FAILURE, error };
    }
}
