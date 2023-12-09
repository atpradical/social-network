import {DiaologsPageType} from "./store";

export type SendMessageACType = ReturnType<typeof sendMessageAC>
export type UpdateNewMessageBodyACType = ReturnType<typeof updateNewMessageBodyAC>
export type ActionsTypes = SendMessageACType | UpdateNewMessageBodyACType

const UPDATE_NEW_MESSAGE_BODY = 'UPDATE-NEW-MESSAGE-BODY'
const SEND_MESSAGE = 'SEND-MESSAGE'

let initialState = {
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
}

export const dialogsReducer = (state: DiaologsPageType = initialState, action: ActionsTypes) => {
    switch (action.type) {
        case UPDATE_NEW_MESSAGE_BODY:
            state.newMessageBody = action.body
            return state
        case SEND_MESSAGE :
            const body = state.newMessageBody
            state.newMessageBody = ''
            state.messagesData.push({id: '6', message: body})
            return state

        default:
            return state
    }
}

export const sendMessageAC = () => ({type: SEND_MESSAGE}) as const
export const updateNewMessageBodyAC = (text: string) => ({type: UPDATE_NEW_MESSAGE_BODY, body: text}) as const

export default dialogsReducer
