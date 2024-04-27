import {FormDataType} from "../components/Profile/ProfileInfo/ProfileDataForm";
import {instance, Response, UserProfile} from "./api";

export const profileAPI = {
    getProfile(userId: number) {
        return instance.get<UserProfile>(`/profile/${userId}`)
    },
    getStatus(userId: number) {
        return instance.get<string>(`/profile/status/${userId}`)
    },
    updateStatus(status: string) {
        return instance.put<Response>('/profile/status', {status})
    },
    savePhoto(file: File) {
        const formData = new FormData()
        formData.append('image', file)

        return instance.put<Response<UserProfile>>(`/profile/photo`, formData, {
            headers:
                {"Content-Type": "multipart/form-data"}
        })
    },
    saveProfile(profile: FormDataType) {
        return instance.put<Response>(`/profile`, profile)
    }
}