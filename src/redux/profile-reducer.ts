import {UserProfileType} from "../components/Profile/ProfileContainer";

const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const SET_USER_PROFILE = 'SET-USER-PROFILE';

const initialState: InitialStateType = {
    posts: [
        {id: 1, post: 'Hi how are you?', likesCount: 5},
        {id: 2, post: 'this is my first comment', likesCount: 2},
        {id: 3, post: 'IT-KAMASUTRA', likesCount: 0},
        {id: 4, post: 'BEST social network', likesCount: 1},
    ],
    newPostText: 'it-kamasutra.com',
    profile: null
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
        default:
            return state
    }
}
//actions:
export const addPostAC = () => ({type: ADD_POST} as const)
export const updateNewPostTextAC = (newText: string) => ({type: UPDATE_NEW_POST_TEXT, newText} as const)
export const setUserProfile = (profile: UserProfileType) => ({type: SET_USER_PROFILE, profile} as const)

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
}
export type ProfileActionsType =
    | ReturnType<typeof addPostAC>
    | ReturnType<typeof updateNewPostTextAC>
    | ReturnType<typeof setUserProfile>

