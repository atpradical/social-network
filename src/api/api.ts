import axios from "axios";
import {ProfilePhotos} from "../redux/profile-reducer";

export const instance = axios.create({
    baseURL: ' https://social-network.samuraijs.com/api/1.0',
    withCredentials: true,
    headers: {"API-KEY": "2ddf97e0-ffe8-4ab0-8c33-a85de425721e"}
})

//enums:
export enum RESULT_CODE {
    SUCCESS = 0,
    FAILED = 1,
    CAPTCHA = 10
}

//types:

export type Response<T = {}, RC = RESULT_CODE> = {
    data: T
    messages: string[];
    fieldsErrors: string[];
    resultCode: RC;
}
export type UserProfile = {
    aboutMe: string;
    contacts: ProfileContacts;
    lookingForAJob: boolean;
    lookingForAJobDescription: string;
    fullName: string;
    userId: number;
    photos: ProfilePhotos;
}
export type ProfileContacts = {
    facebook: string;
    website: string;
    vk: string;
    twitter: string;
    instagram: string;
    youtube: string;
    github: string;
    mainLink: string;
}