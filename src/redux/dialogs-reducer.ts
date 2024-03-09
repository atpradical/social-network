const SEND_MESSAGE = 'SEND-MESSAGE'

const initialState = {
    messages: [
        {id: 1, message: 'Hi'},
        {id: 2, message: 'How is your IT kamasutra?'},
        {id: 3, message: 'Yo!!'},
        {id: 4, message: 'Yo!!!!'},
    ] as MessagesType[],
    dialogs: [
        {id: 1, name: 'Ivan'},
        {id: 2, name: 'Alexandra'},
        {id: 3, name: 'Anatoly'},
        {id: 4, name: 'Sveta'},
        {id: 5, name: 'Viktor'},
        {id: 6, name: 'Valera'}
    ] as DialogsType[],
}

export const dialogsReducer = (state: InitialStateType = initialState, action: DialogsActionsType):InitialStateType => {
    switch (action.type) {
        case SEND_MESSAGE:
            const newMessage: MessagesType = {id: 6, message: action.newMessage}
            return {...state, messages: [...state.messages, newMessage]}
        default:
            return state
    }
}

//actions:
export const sendNewMessageAC = (newMessage: string) => ({type: SEND_MESSAGE, newMessage} as const)

//types:
export type InitialStateType = typeof initialState
export type DialogsType = {
    id: number
    name: string
}
export type MessagesType = {
    id: number
    message: string
}
export type DialogsActionsType = ReturnType<typeof sendNewMessageAC>