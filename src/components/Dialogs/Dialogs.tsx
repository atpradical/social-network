import React, {ChangeEvent} from 'react';
import s from './Dialogs.module.css'
import {DialogItem} from "./DialogItem/DialogItem";
import {Message} from "./Message/Message";
import {DialogsPropsType} from "./DialogsContainer";

export const Dialogs: React.FC<DialogsPropsType> = (props) => {

    const state = props.dialogsPage

    const dialogsElements = state.dialogs.map(d =>
        <DialogItem key={d.id} name={d.name} id={d.id}/>)
    const messagesElements = state.messages.map(m =>
        <Message key={m.id} message={m.message}/>)
    const newMessageBody = state.newMessageBody

    const onSendMessageClick = () => {
        props.sendMessage()
    }

    function onNewMessageChange(e: ChangeEvent<HTMLTextAreaElement>) {
        const body = e.currentTarget.value
        props.updateNewMessageBody(body)
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