import React from 'react';
import s from './Dialogs.module.css'
import {DialogItem} from "./DialogItem/DialogItem";
import {Message} from "./Message/Message";

type MessageType = {
    message: string
}

const Dialogs = (props: any) => {

    const dialogsData = [
        {id: "1", name: 'Ivan'},
        {id: "2", name: 'Dimych'},
        {id: "3", name: 'Andrey'},
        {id: "4", name: 'Sveta'},
        {id: "5", name: 'Sasha'},
        {id: "6", name: 'Viktor'},
        {id: "7", name: 'Valera'},
    ]

    const messagesData = [
        {id: "1", message: 'Hi'},
        {id: "2", message: 'How is your it-Kamasutra'},
        {id: "3", message: 'yo'},
        {id: "4", message: 'yo'},
        {id: "5", message: 'yo'},
    ]

    let dialogElements = dialogsData.map(el => <DialogItem key={el.id} name={el.name} id={el.id}/>)
    let messagesElements = messagesData.map(el=> <Message key={el.id} message={el.message}/>)

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItem}>
                {dialogElements}
            </div>
            <div className={s.messages}>
                {messagesElements}
            </div>
        </div>
    );
};

export default Dialogs;