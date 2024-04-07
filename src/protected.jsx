import { Navigate, Outlet } from "react-router-dom";
import APP_CONFIG from "./config/appConfig";

export const ProtectedRoute = () => {
    // do useEffect trigger sau khi view nó render nên nó chạy thẳng xuống return

    const accessToken = localStorage.getItem(APP_CONFIG.STORAGE_TOKEN_NAME.ACCESS_TOKEN)

    if (!accessToken) {
        return <Navigate to="/auth/login" />
    }

    return (
        <Outlet />
    );
};
