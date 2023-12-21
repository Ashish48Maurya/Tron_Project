import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../store/auth';
import { toast } from 'react-toastify';

const PrivateRoute = () => {
    const notify = (msg) => toast.error(msg);
    const { isLoggedIn } = useAuth();
    if (isLoggedIn) {
        return <>
            <Outlet />
        </>
    }
    else {
        return <>
                <Navigate to={"/login"} />
            {
                notify("Please Login First")
            }
        </>
    }
}

export default PrivateRoute;