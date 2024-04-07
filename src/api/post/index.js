import axiosInstance from "../axios"
import API_CONFIG from "../config"

const BASE_PATH = '/api/' + API_CONFIG.API_VERSION + API_CONFIG.RESOURCES.POST;

const apiPost = {
    getAllPost: async () => {
        // dùng axios để bắn request login và nhận lại response
        const { data } = await axiosInstance.get(BASE_PATH)

        if (data) {
            return data
        } else {
            throw new Error('Dữ liệu trả về bị thiếu')
        }
    }
}
export default apiPost