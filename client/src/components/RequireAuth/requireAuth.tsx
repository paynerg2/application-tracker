import React from 'react';
import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { isEmpty } from '../../_helpers/objectHelpers';

function RequireAuth() {
    let location = useLocation();
    const token = window.localStorage.getItem('user');
    const user = useAppSelector((state) => state.auth.user);

    const verifiedUser = !isEmpty(user) && !!token;

    return verifiedUser ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />;
}

export default RequireAuth;
