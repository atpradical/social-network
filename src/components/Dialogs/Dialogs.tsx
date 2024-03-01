import React from 'react';
import s from './Dialogs.module.css'
import {DialogItem} from "./DialogItem/DialogItem";
import {Message} from "./Message/Message";
import {DialogsType, MessagesType} from "../../redux/state";

export const Dialogs: React.FC<DialogsPropsType> = (props) => {

    const dialogsElements = props.state.dialogs.map(d =>
        <DialogItem name={d.name} id={d.id}/>)
    const messagesElements = props.state.messages.map(m =>
        <Message message={m.message}/>)

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                {messagesElements}
            </div>
        </div>
    );
};


//types:
type DialogsPropsType = {
    state: {
        dialogs: DialogsType[]
        messages: MessagesType[]
    }
}