import React, {ChangeEvent} from 'react';
import s from './Dialogs.module.css'
import {DialogItem} from "./DialogItem/DialogItem";
import {Message} from "./Message/Message";
import {sendNewMessageAC, updateNewMessageBodyAC} from "../../redux/dialogs-reducer";
import {StoreType} from "../../redux/store";

export const Dialogs: React.FC<DialogsPropsType> = (props) => {

    const state = props.store.getState().dialogsPage

    const dialogsElements = state.dialogs.map(d =>
        <DialogItem name={d.name} id={d.id}/>)
    const messagesElements = state.messages.map(m =>
        <Message message={m.message}/>)
    const newMessageBody = state.newMessageBody

    const onSendMessageClick = () => {
        props.store.dispatch(sendNewMessageAC())
    }

    function onNewMessageChange(e: ChangeEvent<HTMLTextAreaElement>) {
        const body = e.currentTarget.value
        props.store.dispatch(updateNewMessageBodyAC(body))
    }

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                <div>{messagesElements}</div>
                <div>
                    <div><textarea
                        cols={75} rows={10}
                        placeholder={'enter new message'}
                        value={newMessageBody}
                        onChange={onNewMessageChange}
                    ></textarea></div>
                    <div>
                        <button onClick={onSendMessageClick}>Send</button>
                    </div>
                </div>
            </div>
        </div>
    );
};


//types:
type DialogsPropsType = {
    // state: {
    //     dialogs: DialogsType[]
    //     messages: MessagesType[]
    //     newMessageBody: string
    // }
    store: StoreType
}