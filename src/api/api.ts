import axios from "axios";
import {ProfilePhotosType, UserType} from "../redux/users-reducer";
import {FormDataType} from "../components/Profile/ProfileInfo/ProfileDataForm";

export const instance = axios.create({
    baseURL: ' https://social-network.samuraijs.com/api/1.0',
    withCredentials: true,
    headers: {"API-KEY": "2ddf97e0-ffe8-4ab0-8c33-a85de425721e"}
})

export const usersAPI = {
    getUsers(currentPage: number, pageSize: number) {
        return instance.get<GetUsersResponseType>(`/users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                return response.data
            })
    },
    follow(userId: number) {
        return instance.post<ResponseType>(`/follow/${userId}`, {})
    },
    unFollow(userId: number) {
        return instance.delete<ResponseType>(`/follow/${userId}`)
    },
    getProfile(userId: number) {
        console.warn("Obsolete method. Please use 'profileAPI' object")
        // return instance.get<UserProfileType>(`/profile/${userId}`)
        return profileAPI.getProfile(userId)
    }
}

export const profileAPI = {
    getProfile(userId: number) {
        return instance.get<UserProfileType>(`/profile/${userId}`)
    },
    getStatus(userId: number) {
        return instance.get<string>(`/profile/status/${userId}`)
    },
    updateStatus(status: string) {
        return instance.put<ResponseType>('/profile/status', {status})
    },
    savePhoto(file: File) {

        const formData = new FormData()
        formData.append('image', file)

        return instance.put<ResponseType<UserProfileType>>(`/profile/photo`, formData, {
            headers:
                {"Content-Type": "multipart/form-data"}
        })
    },
    saveProfile(profile: FormDataType) {
        return instance.put<ResponseType>(`/profile`, profile )
    }
}

export const authAPI = {
    me() {
        return instance.get<ResponseType<UserAuthType>>(`/auth/me`)
    },
    login(email: string, password: string, rememberMe: boolean = false, captcha: string | null = null) {
        return instance.post<ResponseType<{ userId: number }>>('/auth/login', {email, password, rememberMe, captcha})
    },
    logout() {
        return instance.delete<ResponseType>('/auth/login')
    }
}

export const securityAPI = {
    getCaptchaUrl() {
        return instance.get<CaptchaResponseType>(`security/get-captcha-url`)
    },

}


//enums:
export enum RESULT_CODE {
    SUCCESS = 0,
    FAILED = 1,
    CAPTCHA = 10
}

//types:
type GetUsersResponseType = {
    items: UserType[]
    totalCount: number
    error: string | null
}
export type ResponseType<T = {}> = {
    data: T
    messages: string[];
    fieldsErrors: string[];
    resultCode: number;
}
export type UserProfileType = {
    aboutMe: string;
    contacts: ProfileContactsType;
    lookingForAJob: boolean;
    lookingForAJobDescription: string;
    fullName: string;
    userId: number;
    photos: ProfilePhotosType;
}
export type ProfileContactsType = {
    facebook: string;
    website: string;
    vk: string;
    twitter: string;
    instagram: string;
    youtube: string;
    github: string;
    mainLink: string;
}
export type UserAuthType = {
    id: number;
    email: string;
    login: string;
}
type CaptchaResponseType = {
    url: string
}
