import {profileAPI, RESULT_CODE, UserProfileType, usersAPI} from "../api/api";
import {Dispatch} from "redux";
import {toggleIsFetching} from "./users-reducer";

const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const SET_USER_PROFILE = 'SET-USER-PROFILE';
const SET_STATUS = 'SET-STATUS';

const initialState: InitialStateType = {
    posts: [
        {id: 1, post: 'Hi how are you?', likesCount: 5},
        {id: 2, post: 'this is my first comment', likesCount: 2},
        {id: 3, post: 'IT-KAMASUTRA', likesCount: 0},
        {id: 4, post: 'BEST social network', likesCount: 1},
    ],
    newPostText: 'it-kamasutra.com',
    profile: null,
    status: ''
}

export const profileReducer = (state: InitialStateType = initialState, action: ProfileActionsType): InitialStateType => {
    switch (action.type) {
        case ADD_POST:
            const newPost: PostsType = {id: 5, post: state.newPostText, likesCount: 0}
            return {...state, posts: [...state.posts, newPost], newPostText: ''}
        case UPDATE_NEW_POST_TEXT:
            return {...state, newPostText: action.newText}
        case SET_USER_PROFILE:
            return {...state, profile: action.profile}
        case SET_STATUS:
            return {...state, status: action.status}
        default:
            return state
    }
}


//actions:
export const addPostAC = () => ({type: ADD_POST} as const)
export const updateNewPostTextAC = (newText: string) => ({type: UPDATE_NEW_POST_TEXT, newText} as const)
const setUserProfile = (profile: UserProfileType) => ({type: SET_USER_PROFILE, profile} as const)
const setUserStatus = (status: string) => ({type: SET_STATUS, status} as const)


//thunks:
export const getUserProfile = (userId: number) => (dispatch: Dispatch) => {
    usersAPI.getProfile(userId)
        .then(res => {
            dispatch(setUserProfile(res.data))
        })
}

export const getUserStatus = (userId: number) => (dispatch: Dispatch) => {
    profileAPI.getStatus(userId)
        .then(res => {
            dispatch(setUserStatus(res.data))
        })
}

export const updateUserStatus = (status: string) => (dispatch: Dispatch) => {
    profileAPI.updateStatus(status)
        .then(res => {
            if(res.data.resultCode === RESULT_CODE.SUCCESS) {
                dispatch(setUserStatus(status))
            }
        })
}


//types:
export type PostsType = {
    id: number
    post: string
    likesCount: number
}
export type InitialStateType = {
    posts: PostsType[]
    newPostText: string
    profile: UserProfileType | null
    status: string
}
export type ProfileActionsType =
    | ReturnType<typeof addPostAC>
    | ReturnType<typeof updateNewPostTextAC>
    | ReturnType<typeof setUserProfile>
    | ReturnType<typeof setUserStatus>

