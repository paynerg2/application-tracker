import { userConstants } from '../_constants';
import { userService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const userActions = {
    login,
    logout,
    getAll,
    create
};

function login(username, password) {
    return dispatch => {
        dispatch(request({ username }));

        userService.login(username, password).then(
            user => {
                dispatch(success(user));
                history.push('/');
            },
            error => {
                dispatch(failure(error));
                dispatch(alertActions.error(error));
            }
        );
    };

    function request(user) {
        return { type: userConstants.LOGIN_REQUEST, user };
    }
    function success(user) {
        return { type: userConstants.LOGIN_SUCCESS, user };
    }
    function failure(error) {
        return { type: userConstants.LOGIN_FAILURE, error };
    }
}

function logout() {
    userService.logout();
    history.push('/login');
    return { type: userConstants.LOGOUT };
}

function getAll() {
    return dispatch => {
        dispatch(request());

        userService
            .getAll()
            .then(
                users => dispatch(success(users)),
                error => dispatch(failure(error))
            );
    };

    function request() {
        return { type: userConstants.GETALL_REQUEST };
    }
    function success(users) {
        return { type: userConstants.GETALL_SUCCESS, users };
    }
    function failure(error) {
        return { type: userConstants.GETALL_FAILURE, error };
    }
}

function create(user) {
    return dispatch => {
        dispatch(request());

        userService
            .create(user)
            .then(
                () => history.push('/login'),
                error => dispatch(failure(error))
            )
            .catch(err => dispatch(failure(err)));
    };

    function request() {
        return { type: userConstants.CREATE_REQUEST };
    }
    function failure(error) {
        return { type: userConstants.CREATE_FAILURE, error };
    }
}
