import {RESULT_CODE, UserProfile} from "../api/api";
import {AppStateType, BaseThunkType} from "./redux-store";
import {ThunkDispatch} from "redux-thunk";
import {stopSubmit} from "redux-form";
import {FormDataType} from "../components/Profile/ProfileInfo/ProfileDataForm";
import {usersAPI} from "../api/users-api";
import {profileAPI} from "../api/profile-api";

const ADD_POST = 'PROFILE/ADD-POST';
const SET_USER_PROFILE = 'PROFILE/SET-USER-PROFILE';
const SET_STATUS = 'PROFILE/SET-STATUS';
const DELETE_POST = 'PROFILE/DELETE-POST'
const SAVE_PHOTO_SUCCESS = 'PROFILE/SAVE-PHOTO-SUCCESS'

const initialState: ProfileState = {
    posts: [
        {id: 1, post: 'Hi how are you?', likesCount: 5},
        {id: 2, post: 'this is my first comment', likesCount: 2},
        {id: 3, post: 'IT-KAMASUTRA', likesCount: 0},
        {id: 4, post: 'BEST social network', likesCount: 1},
    ],
    profile: null,
    status: ''
}

export const profileReducer = (state: ProfileState = initialState, action: ProfileActions): ProfileState => {
    switch (action.type) {
        case ADD_POST:
            const newPost: Posts = {id: 5, post: action.newPostText, likesCount: 0}
            return {...state, posts: [...state.posts, newPost]}
        case SET_USER_PROFILE:
            return {...state, profile: action.profile}
        case SET_STATUS:
            return {...state, status: action.status}
        case DELETE_POST :
            return {
                ...state,
                posts: state.posts.filter(p => p.id !== action.postId)
            }
        case SAVE_PHOTO_SUCCESS:
            return {
                ...state, profile: {...state.profile!, photos: action.photos}
            }
        default:
            return state
    }
}


//actions:
export const addPostAC = (newPostText: string) => ({type: ADD_POST, newPostText} as const)
const setUserProfile = (profile: UserProfile) => ({type: SET_USER_PROFILE, profile} as const)
const setUserStatus = (status: string) => ({type: SET_STATUS, status} as const)
export const deletePost = (postId: number) => ({type: DELETE_POST, postId} as const)
export const savePhotoSuccess = (photos: ProfilePhotos) => ({type: SAVE_PHOTO_SUCCESS, photos} as const)


//thunks:
export const getUserProfile = (userId: number): BaseThunkType<ProfileActions> => async (dispatch) => {
    const response = await usersAPI.getProfile(userId)
    dispatch(setUserProfile(response.data))
}

export const getUserStatus = (userId: number): BaseThunkType<ProfileActions> => async (dispatch) => {
    const response = await profileAPI.getStatus(userId)
    dispatch(setUserStatus(response.data))
}

export const updateUserStatus = (status: string): BaseThunkType<ProfileActions> => async (dispatch) => {
    try {
        const response = await profileAPI.updateStatus(status)
        if (response.data.resultCode === RESULT_CODE.SUCCESS) {
            dispatch(setUserStatus(status))
        }
    } catch (error: unknown) {
        // some error handling logic
    }
}

export const savePhoto = (photoFile: File): BaseThunkType<ProfileActions> => async (dispatch) => {
    const response = await profileAPI.savePhoto(photoFile)
    if (response.data.resultCode === RESULT_CODE.SUCCESS) {
        dispatch(savePhotoSuccess(response.data.data.photos))
    }
}

export const saveProfile = (profile: FormDataType) => async (dispatch: ThunkDispatch<AppStateType, unknown, ProfileActions | ReturnType<typeof stopSubmit>>, getState: () => AppStateType) => {
    const userId = getState().auth.id
    const response = await profileAPI.saveProfile(profile)
    if (response.data.resultCode === RESULT_CODE.SUCCESS) {
        if (userId) {
            dispatch(getUserProfile(userId))
        }
    } else {
        dispatch(stopSubmit('edit-profile', {_error: response.data.messages[0]}))
        return Promise.reject(response.data.messages[0])
    }
}


//types:
export type Posts = {
    id: number
    post: string
    likesCount: number
}
export type ProfileState = {
    posts: Posts[]
    profile: UserProfile | null
    status: string
}
export type ProfilePhotos = {
    small: string | null
    large: string | null
}
export type ProfileActions =
    | ReturnType<typeof addPostAC>
    | ReturnType<typeof setUserProfile>
    | ReturnType<typeof setUserStatus>
    | ReturnType<typeof deletePost>
    | ReturnType<typeof savePhotoSuccess>