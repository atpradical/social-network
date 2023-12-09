import {PostDataType, profilePageType} from "./store";

export type AddPostACType = ReturnType<typeof addPostAC>
export type UpdateNewPostTextACType = ReturnType<typeof updateNewPostTextAC>

type ActionsTypes = AddPostACType | UpdateNewPostTextACType

const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';

let initialState = {
    postsData: [
        {id: "1", message: 'Hi, how are you', likesCount: 12},
        {id: "1", message: 'It\'s my first post', likesCount: 11},
        {id: "1", message: 'bla bla bla bla', likesCount: 1},
        {id: "1", message: 'yoooohooo', likesCount: 101},
    ],
    newPostText: 'it-kamasutra.com'
}

export const profileReducer = (state: profilePageType = initialState, action: ActionsTypes) => {

    switch (action.type) {
        case ADD_POST:
            const newPost: PostDataType = {
                id: '5',
                message: state.newPostText,
                likesCount: 0
            }
            state.postsData.push(newPost)
            state.newPostText = ''
            return state
        case UPDATE_NEW_POST_TEXT :
            state.newPostText = action.newText
            return state
        default:
            return state
    }
}

export const addPostAC = () => ({type: ADD_POST}) as const

export const updateNewPostTextAC = (text: string) => ({type: UPDATE_NEW_POST_TEXT, newText: text}) as const

export default profileReducer


