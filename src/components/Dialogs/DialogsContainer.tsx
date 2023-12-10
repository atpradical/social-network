import React from 'react';
import {StoreType} from "../../redux/store";
import {sendMessageAC, updateNewMessageBodyAC} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";

type PropsType = {
    store: StoreType
}

let mapStateToProps = (state: any) => {
    return {
        dialogsPage: state.dialogsPage
    }
}
let mapDispatchToProps = (dispatch: any) => {
    return {
        onNewMessageChange : (body: string) => {
            dispatch(updateNewMessageBodyAC(body))
        },
        onSendMessageClick: () => {
            dispatch(sendMessageAC())

        }
    }
}

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs)

export default DialogsContainer;