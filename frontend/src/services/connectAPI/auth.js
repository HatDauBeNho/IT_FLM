import { MethodGet, MethodLogin, MethodRefreshToken, MethodRegister } from "./meThod"

export const APILogin = async (param) => {

    const { userName, password } = param
    var url = "/api/auth/login"
    try {
        const data = { userName: userName, password: password }
        const result = await MethodLogin(url, data)
        if (result.status === 1) {
            localStorage.setItem("token", result.data.token);
            localStorage.setItem("role", result.data.role);
            return 1
        }
        if (result.status === 0) {
            return 0
        }
        else
            return 0
    } catch (e) {
        return e
    }
}

export const APIRegister = async (param) => {
    const { userName, password } = param
    var url = "/api/auth/register"
    try {
        const data = { userName: userName, password: password }
        const result = await MethodRegister(url, data)
        if (result.status === 1) {
            return 1
        }
        if (result.status === 0) {
            return 0
        }
        else
            return 0
    } catch (e) {
        return e
    }
}
export const APILogout = async () => {
    return await MethodGet("/api/user/logout?refreshToken=" + localStorage.getItem("refeshToken"))
}
