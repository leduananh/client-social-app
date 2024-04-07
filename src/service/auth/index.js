import apiAuth from "../../api/auth";
import apiUser from "../../api/user";

const userService = {
    login: async (loginPayload) => {
        try {
            const { accessToken, refreshToken, userId } = await apiAuth.login(loginPayload)
            //    đoạn code set token vào local storage sẽ handle ở bên view
            if (accessToken && refreshToken) {
                return {
                    userInfo: await apiUser.getUserById(userId),
                    accessToken,
                    refreshToken
                }
            }
        } catch (err) {
            throw new Error(err.message)
        }

    },
    renewAccessToken: async (refreshToken) => {
        const { accessToken, userId } = await apiAuth.renewAccessToken({ refreshToken })
        if (!accessToken && !userId) {
            throw new Error('Data was empty')
        }
        return {
            userInfo: await apiUser.getUserById(userId),
            accessToken
        }
    }
}

export default userService