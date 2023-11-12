const UPDATE_NEW_MESSAGE_BODY = 'UPDATE-NEW-MESSAGE-BODY'
const SEND_MESSAGE = 'SEND-MESSAGE'

export const dialogsReducer = (state: any, action: any) => {
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
export default dialogsReducer