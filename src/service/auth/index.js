import apiAuth from "../../api/auth";
import apiUser from "../../api/user";

const userService = {
    login: async (loginPayload) => {
        // try {
        //     const { accessToken, refreshToken, userId } = await apiAuth.login(loginPayload)
        //     //    đoạn code set token vào local storage sẽ handle ở bên view
        //     if (accessToken && refreshToken) {
        //         return {
        //             userInfo: await apiUser.getUserById(userId),
        //             accessToken,
        //             refreshToken
        //         }
        //     }
        // } catch (err) {
        //     throw new Error(err.message)
        // }
        return {
            accessToken: 'abc',
            refreshToken: 'abc',
            userInfo: {
                id: 1,
                name: 'abc'
            }
        }
    },
    renewAccessToken: async (refreshToken) => {
        // const { accessToken, userId } = await apiAuth.renewAccessToken({ refreshToken })
        // if (!accessToken && !userId) {
        //     throw new Error('Data was empty')
        // }
        // return {
        //     userInfo: await apiUser.getUserById(userId),
        //     accessToken
        // }
        return {
            accessToken: 'abc',
            userInfo: {
                id: 1,
                name: 'abc'
            }
        }
    }
}

export default userService