// tạo axios instance và đăng ký inteceptor để handle vấn đế gắn access token và xóa
// accessToken đã đăng nhập nếu bị hết hạn

import axios from "axios";
import APP_CONFIG from "../config/appConfig";
import apiLogin from "./login";

const axiosInstance = axios.create({
    baseURL: process.env.BACK_END_BASE_URL || 'localhost:8080',
    timeout: process.env.REQUEST_HTTP_TIMEOUT || 10000,
});

axiosInstance.interceptors.request.use(function (config) {
    // LOGIC ADD ACCESS TOKEN NẾU ACCESS TOKEN CÓ TỒN TẠI TRONG LOCAL STORAGE
    // TỨC LÀ NẾU NGƯỜI DÙNG ĐÃ LOGIN HOẶC TOKEN CHƯA HẾT HẠN
    const accessToken = localStorage.get(APP_CONFIG.STORAGE_TOKEN_NAME.ACCESS_TOKEN);
    if (accessToken) {
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
    if (error.code === 401 && localStorage.getItem(APP_CONFIG.STORAGE_TOKEN_NAME.ACCESS_TOKEN)) {
        const refreshToken = localStorage.removeItem(APP_CONFIG.STORAGE_TOKEN_NAME.REFRESH_TOKEN)

        if (refreshToken) {
            try {
                const { accessToken } = await apiLogin.renewAccessToken({ refreshToken })
                localStorage.setItem(APP_CONFIG.STORAGE_TOKEN_NAME.ACCESS_TOKEN, accessToken)
            } catch (error) {
                localStorage.removeItem(APP_CONFIG.STORAGE_TOKEN_NAME.REFRESH_TOKEN)
            }
        } else {
            localStorage.removeItem(APP_CONFIG.STORAGE_TOKEN_NAME.ACCESS_TOKEN)
        }
    }

    return Promise.reject(error);
});


export default axiosInstance