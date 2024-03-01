import React from 'react';
import s from './../Dialogs.module.css'
import {NavLink} from "react-router-dom";

export const DialogItem: React.FC<DialogItemPropsType> = (props) => {

    let path = `/dialogs/${props.id}`

    return <div className={s.dialog + ' ' + s.active}>
        <NavLink to={path}>{props.name}</NavLink>
    </div>
}

//types:
type DialogItemPropsType = {
    name: string
    id: number
}