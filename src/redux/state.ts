import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";

export type MessagesDataType = {
    id: string,
    message: string
}
export type DialogsDataType = {
    id: string,
    name: string,
}
export type PostDataType = {
    id: string,
    message: string,
    likesCount: number
}
export type profilePageType = {
    postsData: PostDataType[],
    newPostText: string
}
export type DiaologsPageType = {
    messagesData: MessagesDataType[],
    dialogsData: DialogsDataType[],
    newMessageBody: string
}
export type StateType = {
    profilePage: profilePageType
    dialogsPage: DiaologsPageType
    sidebarPage: any
}

export type StoreType = {
    _state: StateType
    _callSubscriber: (state: StateType) => void
    // _addPost: () => void
    // _updateNewPostText: (newText: string) => void

    getState: () => StateType
    subscribe: (observer: () => void) => void
    dispatch: (action: any) => void
}

export const store: StoreType = {
    _state: {
        profilePage: {
            postsData: [
                {id: "1", message: 'Hi, how are you', likesCount: 12},
                {id: "1", message: 'It\'s my first post', likesCount: 11},
                {id: "1", message: 'bla bla bla bla', likesCount: 1},
                {id: "1", message: 'yoooohooo', likesCount: 101},
            ],
            newPostText: 'it-kamasutra.com'
        },
        dialogsPage: {
            messagesData: [
                {id: "1", message: 'Hi'},
                {id: "2", message: 'How is your it-Kamasutra'},
                {id: "3", message: 'yo'},
                {id: "4", message: 'yo'},
                {id: "5", message: 'yo'},
            ],
            dialogsData: [
                {id: "1", name: 'Ivan'},
                {id: "2", name: 'Dimych'},
                {id: "3", name: 'Andrey'},
                {id: "4", name: 'Sveta'},
                {id: "5", name: 'Sasha'},
                {id: "6", name: 'Viktor'},
                {id: "7", name: 'Valera'},
            ],
            newMessageBody: "new message"
        },
        sidebarPage: {}
    },
    _callSubscriber() {
        console.log('someFoo')
    },
    getState() {
        return this._state
    },
    subscribe(observer) {
        this._callSubscriber = observer
    },

    dispatch(action) {
        this._state.profilePage = profileReducer(this._state.profilePage, action)
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action)
        this._state.sidebarPage = sidebarReducer(this._state.sidebarPage, action)
        this._callSubscriber(this._state)
    }
}


// ============================= Имитация REDUX =================================================
// const ADD_POST = 'ADD-POST';
// const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
// const UPDATE_NEW_MESSAGE_BODY = 'UPDATE-NEW-MESSAGE-BODY'
// const SEND_MESSAGE = 'SEND-MESSAGE'
//
// export type MessagesDataType = {
//     id: string,
//     message: string
// }
// export type DialogsDataType = {
//     id: string,
//     name: string,
// }
// export type PostDataType = {
//     id: string,
//     message: string,
//     likesCount: number
// }
// export type profilePageType = {
//     postsData: PostDataType[],
//     newPostText: string
// }
// export type DiaologsPageType = {
//     messagesData: MessagesDataType[],
//     dialogsData: DialogsDataType[],
//     newMessageBody: string
// }
// export type StateType = {
//     profilePage: profilePageType
//     dialogsPage: DiaologsPageType
// }
//
// export type StoreType = {
//     _state: StateType
//     _callSubscriber: (state: StateType) => void
//     // _addPost: () => void
//     // _updateNewPostText: (newText: string) => void
//
//     getState: () => StateType
//     subscribe: (observer: () => void) => void
//     dispatch: (action: any) => void
// }
//
// export const store: StoreType = {
//     _state: {
//         profilePage: {
//             postsData: [
//                 {id: "1", message: 'Hi, how are you', likesCount: 12},
//                 {id: "1", message: 'It\'s my first post', likesCount: 11},
//                 {id: "1", message: 'bla bla bla bla', likesCount: 1},
//                 {id: "1", message: 'yoooohooo', likesCount: 101},
//             ],
//             newPostText: 'it-kamasutra.com'
//         },
//         dialogsPage: {
//             messagesData: [
//                 {id: "1", message: 'Hi'},
//                 {id: "2", message: 'How is your it-Kamasutra'},
//                 {id: "3", message: 'yo'},
//                 {id: "4", message: 'yo'},
//                 {id: "5", message: 'yo'},
//             ],
//             dialogsData: [
//                 {id: "1", name: 'Ivan'},
//                 {id: "2", name: 'Dimych'},
//                 {id: "3", name: 'Andrey'},
//                 {id: "4", name: 'Sveta'},
//                 {id: "5", name: 'Sasha'},
//                 {id: "6", name: 'Viktor'},
//                 {id: "7", name: 'Valera'},
//             ],
//             newMessageBody: "new message"
//         },
//     },
//     _callSubscriber() {
//         console.log('someFoo')
//     },
//     getState() {
//         return this._state
//     },
//     subscribe(observer) {
//         this._callSubscriber = observer
//     },
//
//     dispatch(action) {
//         if (action.type === ADD_POST) {
//             const newPost: PostDataType = {
//                 id: '5',
//                 message: this._state.profilePage.newPostText,
//                 likesCount: 0
//             }
//             this._state.profilePage.postsData.push(newPost)
//             this._state.profilePage.newPostText = ''
//             this._callSubscriber(this._state)
//         } else if (action.type === UPDATE_NEW_POST_TEXT) {
//             this._state.profilePage.newPostText = action.newText
//             this._callSubscriber(this._state)
//         } else if (action.type === UPDATE_NEW_MESSAGE_BODY) {
//             this._state.dialogsPage.newMessageBody = action.body
//             this._callSubscriber(this._state)
//         } else if (action.type === SEND_MESSAGE) {
//             const body = this._state.dialogsPage.newMessageBody
//             this._state.dialogsPage.newMessageBody = ''
//             this._state.dialogsPage.messagesData.push({id: String(this._state.dialogsPage.messagesData.length + 1), message: body})
//             this._callSubscriber(this._state)
//         }
//     }
// }
//
// export const addPostAC = () => ({type: ADD_POST})
//
// export const updateNewPostTextAC = (text: string) =>
//     ({type: UPDATE_NEW_POST_TEXT, newText: text})
//
// export const sendMessageAC = () => ({type: SEND_MESSAGE})
// export const updateNewMessageBodyAC = (text: string) => ({type: UPDATE_NEW_MESSAGE_BODY, body: text})