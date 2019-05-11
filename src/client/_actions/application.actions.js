import { applicationConstants } from '../_constants';
import { applicationService } from '../_services';
import { history } from '../_helpers';

export const applicationActions = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

function getAll() {
    return dispatch => {
        dispatch(request());

        applicationService
            .getAll()
            .then(
                applications => dispatch(success(applications)),
                error => dispatch(failure(error))
            );
    };

    function request() {
        return { type: applicationConstants.GETALL_REQUEST };
    }
    function success(applications) {
        return { type: applicationConstants.GETALL_SUCCESS, applications };
    }
    function failure(error) {
        return { type: applicationConstants.GETALL_FAILURE, error };
    }
}

function getById(id) {
    return dispatch => {
        dispatch(request());

        applicationService
            .getById(id)
            .then(
                application => dispatch(success(application)),
                error => dispatch(failure(error))
            );
    };

    function request() {
        return { type: applicationConstants.GETBYID_REQUEST };
    }
    function success(application) {
        return { type: applicationConstants.GETALL_REQUEST, application };
    }
    function failure(error) {
        return { type: applicationConstants.GETALL_REQUEST, error };
    }
}

function create(application) {
    return dispatch => {
        dispatch(request());

        applicationService
            .create(application)
            .then(history.push('/'))
            .catch(err => dispatch(failure(err)));
    };

    function request() {
        return { type: applicationConstants.CREATE_REQUEST };
    }
    function failure(error) {
        return { type: applicationConstants.CREATE_FAILURE, error };
    }
}

function update(id, update) {
    return dispatch => {
        dispatch(request());

        applicationService
            .update(id, update)
            .then(() => {
                dispatch(success(update));
                history.push('/');
            })
            .catch(err => dispatch(failure(err)));
    };

    function request() {
        return { type: applicationConstants.UPDATE_REQUEST };
    }
    function success(update) {
        return { type: applicationConstants.UPDATE_SUCCESS, update };
    }
    function failure(error) {
        return { type: applicationConstants.UPDATE_FAILURE, error };
    }
}

function _delete(id) {
    return dispatch => {
        dispatch(request());

        applicationService
            .delete(id)
            .then(() => {
                history.push('/');
                dispatch(success(id));
            })
            .catch(err => dispatch(failure(err)));

        function request() {
            return { type: applicationConstants.DELETE_REQUEST };
        }
        function success(id) {
            return { type: applicationConstants.DELETE_SUCCESS, id };
        }
        function failure(error) {
            return { type: applicationConstants.DELETE_FAILURE, error };
        }
    };
}
