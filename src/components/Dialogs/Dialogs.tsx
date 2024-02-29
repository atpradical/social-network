import React from 'react';
import s from './Dialogs.module.css'
import {NavLink} from "react-router-dom";

const DialogItem: React.FC<DialogItemPropsType> = (props) => {

    let path = `/dialogs/${props.id}`

    return <div className={s.dialog + ' ' + s.active}>
        <NavLink to={path}>{props.name}</NavLink>
    </div>
}

const Message: React.FC<MessagePropsType> = (props) => {
    return <div className={s.message}>{props.message}</div>
}


export const Dialogs = () => {

    const dialogs: DialogsType[] = [
        {id: 1, name: 'Ivan'},
        {id: 2, name: 'Alexandra'},
        {id: 3, name: 'Anatoly'},
        {id: 4, name: 'Sveta'},
        {id: 5, name: 'Viktor'},
        {id: 6, name: 'Valera'}
    ]

    const messages: MessagesType[] = [
        {id: 1, message: 'Hi'},
        {id: 2, message: 'How is your IT kamasutra?'},
        {id: 3, message: 'Yo!!'},
        {id: 4, message: 'Yo!!!!'},
    ]

    const dialogsElements = dialogs.map(d => <DialogItem name={d.name} id={d.id}/>)
    const messagesElements = messages.map(m => <Message message={m.message}/>)

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
type DialogItemPropsType = {
    name: string
    id: number
}
type MessagePropsType = {
    message: string
}

type DialogsType = {
    id: number
    name: string
}
type MessagesType = {
    id: number
    message: string
}