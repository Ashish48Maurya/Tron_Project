import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../store/auth';

const PrivateRoute = () => {
    const { isLoggedIn } = useAuth();
    if (isLoggedIn) {
        return <>
            <Outlet />
        </>
    }
    else {
        return <Navigate to={"/login"} />
    }
}

export default PrivateRoute;