import React from 'react';
import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

function RequireAuth() {
    let location = useLocation();
    const { user } = useAuth();

    return !!user ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />;
}

export default RequireAuth;
