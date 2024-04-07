import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from 'react-redux'

export const ProtectedRoute = () => {
    const { isAuth } = useSelector(state => state.auth)

    if (!isAuth) {
        return <Navigate to="/auth/login" />
    }

    return (
        <Outlet />
    );
};
