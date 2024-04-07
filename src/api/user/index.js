import axiosInstance from "../axios"
import API_CONFIG from "../config"

const BASE_PATH = '/api/' + API_CONFIG.API_VERSION + API_CONFIG.RESOURCES.USER;

const apiUser = {

    getUserById: async (id) => {
        try {
            const { data } = await axiosInstance.get(`${BASE_PATH}/${id}`)

            if (data) {
                return data
            } else {
                throw new Error('Lỗi khi gọi api get user by id')
            }
        } catch (err) {
            throw new Error(err.message)
        }
    }
}
export default apiUser