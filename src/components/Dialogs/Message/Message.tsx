import React, {FC} from 'react';
import s from '../../Dialogs/Dialogs.module.css'

type MessageType = {
    message: string
}

export const Message: FC<MessageType> = (props) => {
    return <div className={s.message}>{props.message}</div>
}
