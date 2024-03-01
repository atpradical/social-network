import React from 'react';
import s from './../Dialogs.module.css'

export const Message: React.FC<MessagePropsType> = (props) => {
    return <div className={s.message}>{props.message}</div>
}

//types:
type MessagePropsType = {
    message: string
}