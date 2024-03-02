
const UPDATE_NEW_MESSAGE_BODY = 'UPDATE-NEW-MESSAGE-BODY';
const SEND_MESSAGE = 'SEND-MESSAGE'

const initialState: InitialStateType = {
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
}

export const dialogsReducer = (state: InitialStateType = initialState, action: DialogsActionsType):InitialStateType => {
    switch (action.type) {
        case UPDATE_NEW_MESSAGE_BODY:
            state.newMessageBody = action.body
            return state
        case SEND_MESSAGE:
            const body = state.newMessageBody
            state.newMessageBody = ''
            state.messages.push({id: 6, message: body})
            return state
        default:
            return state
    }
}

//actions:
export const updateNewMessageBodyAC = (body: string) => ({type: UPDATE_NEW_MESSAGE_BODY, body} as const)
export const sendNewMessageAC = () => ({type: SEND_MESSAGE} as const)

//types:
type InitialStateType = {
    dialogs: DialogsType[]
    messages: MessagesType[]
    newMessageBody: string
}
export type DialogsType = {
    id: number
    name: string
}
export type MessagesType = {
    id: number
    message: string
}
export type DialogsActionsType =
    | ReturnType<typeof updateNewMessageBodyAC>
    | ReturnType<typeof sendNewMessageAC>