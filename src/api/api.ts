import axios from "axios";
import {userType} from "../redux/users-reducer";

export const instance = axios.create({
    baseURL: ' https://social-network.samuraijs.com/api/1.0',
    withCredentials: true,
    headers : {"API-KEY": "2ddf97e0-ffe8-4ab0-8c33-a85de425721e"}
})

export const usersAPI = {
    getUsers(currentPage: number, pageSize: number) {
        return instance.get<GetUsersResponseType>(`/users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                return response.data
            })
    },

}

//types:
type GetUsersResponseType = {
    items: userType[]
    totalCount: number
    error: string | null
}
