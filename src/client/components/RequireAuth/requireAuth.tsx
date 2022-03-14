import React from 'react';
import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';

function RequireAuth() {
    let location = useLocation();
    const token = window.localStorage.getItem('token');
    const user = useAppSelector((state) => state.auth.user);

    const verifiedUser = !!user && !!token;

    return verifiedUser ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />;
}

export default RequireAuth;
