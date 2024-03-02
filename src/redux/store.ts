import {ProfileActionsType, profileReducer} from "./profile-reducer";
import {DialogsActionsType, dialogsReducer} from "./dialogs-reducer";
import {sidebarReducer} from "./sidebar-reducer";

const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const UPDATE_NEW_MESSAGE_BODY = 'UPDATE-NEW-MESSAGE-BODY';
const SEND_MESSAGE = 'SEND-MESSAGE'

export const storeOld: StoreType = {
    _state: {
        profilePage: {
            posts: [
                {id: 1, post: 'Hi how are you?', likesCount: 5},
                {id: 2, post: 'this is my first comment', likesCount: 2},
                {id: 3, post: 'IT-KAMASUTRA', likesCount: 0},
                {id: 4, post: 'BEST social network', likesCount: 1},
            ],
            newPostText: 'it-kamasutra.com'
        },
        dialogsPage: {
            messages: [
                {id: 1, message: 'Hi'},
                {id: 2, message: 'How is your IT kamasutra?'},
                {id: 3, message: 'Yo!!'},
                {id: 4, message: 'Yo!!!!'},
            ],
            dialogs: [
                {id: 1, name: 'Ivan'},
                {id: 2, name: 'Alexandra'},
                {id: 3, name: 'Anatoly'},
                {id: 4, name: 'Sveta'},
                {id: 5, name: 'Viktor'},
                {id: 6, name: 'Valera'}
            ],
            newMessageBody: ''
        },
        sidebar: {}
    },
    _callSubscriber() {
        console.log('!!!!!!STATE WAS CHANGED!!!!!!')
    },

    getState() {
        return this._state
    },
    subscribe(observer: any) {
        this._callSubscriber = observer
    },

    dispatch(action) {
        this._state.profilePage = profileReducer(this._state.profilePage, action as ProfileActionsType )
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action as DialogsActionsType)
        this._state.sidebar = sidebarReducer(this._state.sidebar, action)
        this._callSubscriber(this._state)
    }
}

//types:
export type StoreType = {
    _state: StateType
    getState: () => StateType
    _callSubscriber: (...args: any) => void
    subscribe: (observer: any) => void
    dispatch: (action: ActionsType) => void
}
export type StateType = {
    profilePage: {
        posts: PostsType[]
        newPostText: string
    }
    dialogsPage: {
        dialogs: DialogsType[]
        messages: MessagesType[]
        newMessageBody: string
    }
    sidebar: {}
}
export type PostsType = {
    id: number
    post: string
    likesCount: number
}
// export
type DialogsType = {
    id: number
    name: string
}
// export
type MessagesType = {
    id: number
    message: string
}
export type ActionsType =
    | ProfileActionsType
    | DialogsActionsType

//@ts-ignore
window.storeOld = storeOld