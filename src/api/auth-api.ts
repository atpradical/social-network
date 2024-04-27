import {instance, Response} from "./api";

export const authAPI = {
    me() {
        return instance.get<Response<UserAuth>>(`/auth/me`)
    },
    login(email: string, password: string, rememberMe: boolean = false, captcha: string | null = null) {
        return instance.post<Response<{ userId: number }>>('/auth/login', {email, password, rememberMe, captcha})
    },
    logout() {
        return instance.delete<Response>('/auth/login')
    }
}

//types:
type UserAuth = {
    id: number;
    email: string;
    login: string;
}