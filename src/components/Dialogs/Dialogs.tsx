import React from 'react';
import s from './Dialogs.module.css'
import {DialogItem} from "./DialogItem/DialogItem";
import {Message} from "./Message/Message";
import {DiaologsPageType} from "../../redux/state";

type PropsType = {
    state: DiaologsPageType
}

const Dialogs: React.FC<PropsType> = ({state}) => {

    let dialogElements = state.dialogsData.map(el => <DialogItem key={el.id} name={el.name} id={el.id}/>)
    let messagesElements = state.messagesData.map(el => <Message key={el.id} message={el.message}/>)

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