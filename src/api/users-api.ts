import {instance, Response} from "./api";
import {profileAPI} from "./profile-api";
import {UserType} from "../redux/users-reducer";

export const usersAPI = {
    getUsers(currentPage: number, pageSize: number) {
        return instance.get<GetUsersResponse>(`/users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                return response.data
            })
    },
    follow(userId: number) {
        return instance.post<Response>(`/follow/${userId}`, {})
    },
    unFollow(userId: number) {
        return instance.delete<Response>(`/follow/${userId}`)
    },
    getProfile(userId: number) {
        console.warn("Obsolete method. Please use 'profileAPI' object")
        return profileAPI.getProfile(userId)
    }
}

//types:
type GetUsersResponse = {
    items: UserType[]
    totalCount: number
    error: string | null
}