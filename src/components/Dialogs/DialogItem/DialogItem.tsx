import React, {FC} from 'react';
import s from '../../Dialogs/Dialogs.module.css'
import {NavLink} from "react-router-dom";


type DialogItemType = {
    name: string, id: string
}

export const DialogItem: FC<DialogItemType> = (props) => {
    let path = '/dialogs/' + props.id
    return <div className={s.dialog + ' ' + s.active}>
        <NavLink to={path}>{props.name}</NavLink>
    </div>
}