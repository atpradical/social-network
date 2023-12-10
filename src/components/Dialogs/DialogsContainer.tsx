import React, {ChangeEvent} from 'react';
import s from './Dialogs.module.css'
import {DialogItem} from "./DialogItem/DialogItem";
import {Message} from "./Message/Message";
import {StoreType} from "../../redux/store";
import {sendMessageAC, updateNewMessageBodyAC} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";

type PropsType = {
    store: StoreType
}

const DialogsContainer: React.FC<PropsType> = ({store}) => {

    const state = store.getState().dialogsPage



    const onSendMessageClick = () => {
        store.dispatch(sendMessageAC())
    }

    const onNewMessageChange = (body: string) => {
        store.dispatch(updateNewMessageBodyAC(body))
    }

    return (
        <Dialogs
            dialogsPage={state}
            onNewMessageChange={onNewMessageChange}
            onSendMessageClick={onSendMessageClick}
        />
    );
};

export default DialogsContainer;