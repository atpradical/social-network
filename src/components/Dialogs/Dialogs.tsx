import React, {FC} from 'react';
import s from './Dialogs.module.css'
import {NavLink} from "react-router-dom";

type MessageType = {
    message: string
}
type DialogItemType = {
    name: string, id: string
}

const DialogItem: FC<DialogItemType> = (props) => {
    let path = '/dialogs/' + props.id
    return <div className={s.dialog + ' ' + s.active}>
        <NavLink to={path}>{props.name}</NavLink>
    </div>
}

const Message: FC<MessageType> = (props) => {
    return <div className={s.message}>{props.message}</div>
}

const Dialogs = (props:any) => {
    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItem}>
                <DialogItem name={'Ivan'} id={'1'}/>
                <DialogItem name={'Dimych'} id={'2'}/>
                <DialogItem name={'Andrey'} id={'3'}/>
                <DialogItem name={'Sveta'} id={'4'}/>
                <DialogItem name={'Sasha'} id={'5'}/>
                <DialogItem name={'Viktor'} id={'6'}/>
                <DialogItem name={'Valera'} id={'7'}/>
            </div>
            <div className={s.messages}>
                <Message message={'Hi'}/>
                <Message message={'How is your it-Kamasutra'}/>
                <Message message={'yo'}/>
            </div>
        </div>
    );
};

export default Dialogs;