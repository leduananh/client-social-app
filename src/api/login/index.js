import axiosInstance from "../axios"
import API_CONFIG from "../config"

const BASE_PATH = '/api/' + API_CONFIG.API_VERSION + API_CONFIG.RESOURCES.USER;

const apiLogin = {
    login: async (payloadLogin) => {
        // dùng axios để bắn request login và nhận lại response
       const {data} = await axiosInstance.post(BASE_PATH + '/sign-in', payloadLogin)

       if(data){
        return data
       } else {
        throw new Error('Dữ liệu trả về bị thiếu')
       }
    },
    renewAccessToken: async (payloadRenewToken) => {
        // dùng axios để bắn request login và nhận lại response
       const {data} = await axiosInstance.post(BASE_PATH + '/renew-access-token', payloadRenewToken)

       if(data){
        return data
       } else {
        throw new Error('Dữ liệu trả về bị thiếu')
       }
    }
}
export default apiLogin