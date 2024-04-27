import {instance} from "./api";

export const securityAPI = {
    getCaptchaUrl() {
        return instance.get<CaptchaResponse>(`security/get-captcha-url`)
    },
}

//types:
type CaptchaResponse = {
    url: string
}