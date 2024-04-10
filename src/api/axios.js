// tạo axios instance và đăng ký inteceptor để handle vấn đế gắn access token và xóa
// accessToken đã đăng nhập nếu bị hết hạn

import axios from "axios";
import APP_CONFIG from "../config/appConfig";
import { store } from "../store/config";
import { login, logout } from "../store/slice/auth";
import authService from "../service/auth";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BACK_END_BASE_URL || 'localhost:8080',
    timeout: import.meta.env.VITE_REQUEST_HTTP_TIMEOUT || 10000,
});

axiosInstance.interceptors.request.use(function (config) {
    // LOGIC ADD ACCESS TOKEN NẾU ACCESS TOKEN CÓ TỒN TẠI TRONG LOCAL STORAGE
    // TỨC LÀ NẾU NGƯỜI DÙNG ĐÃ LOGIN HOẶC TOKEN CHƯA HẾT HẠN

    // lấy access token từ store 
    const { auth: { isLogin, accessToken } } = store.getState()

    if (isLogin && accessToken) {
        config.headers['Authorization'] = "Bearer " + accessToken
    }

    return config;
});

// Add a response interceptor
axiosInstance.interceptors.response.use(function (response) {
    // NẾU RESPONSE TỪ SERVER THÀNH CÔNG THÌ OK IGNORE ĐỂ CODE CHẠY BT
    return response;
}, async function (error) {
    // NẾU RESPONSE TỪ SERVER THẤT BẠI, VÀ LÝ DO REQUEST BỊ THẤT BẠI LÀ DO TOKEN HẾT HẠN
    // TỨC LÀ RESPONSE STATUS CODE LÀ 401 THÌ TỨC LÀ TOKEN HẾT HẠN
    // THÊM ĐOẠN CODE XÓA ACCESS TOKEN TRONG LOCAL STORAGE

    // nếu refresh token hoặc access token hết hạn
    // 1. đối với access token hết hạn thì check refresh token có không nếu
    // nếu refresh token có thì gọi service renewAccessToken sau đó dispatch lại
    // trạng thái login cho redux
    // 2. access token và refresh token cũng bị hết hạn thì mình lúc này mình xóa
    // local storage cho refresh token và dispatch logout cho toàn app
    if (error.code === 401) {
        if (error.url.includes('/renew-access-token')) {
            localStorage.removeItem(APP_CONFIG.STORAGE_TOKEN_NAME.REFRESH_TOKEN)
            const { auth: { isLogin } } = store.getState()
            if (isLogin) {
                store.dispatch(logout())
            }
        } else {
            const refreshToken = localStorage.removeItem(APP_CONFIG.STORAGE_TOKEN_NAME.REFRESH_TOKEN)
            if (refreshToken) {
                const { accessToken, userInfo } = await authService.renewAccessToken(refreshToken)
                store.dispatch(login({ accessToken, userInfo }))
            } else {
                const { auth: { isLogin } } = store.getState()
                if (isLogin) {
                    store.dispatch(logout())
                }
            }
        }
    }

    return Promise.reject(error);
});


export default axiosInstance