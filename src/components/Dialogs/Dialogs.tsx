import React, {ChangeEvent} from 'react';
import s from './Dialogs.module.css'
import {DiaologsPageType, MessagesDataType} from "../../redux/store";
import {DialogItem} from "./DialogItem/DialogItem";
import {Message} from "./Message/Message";

type PropsType = {
    dialogsPage: DiaologsPageType
    onNewMessageChange: (body: string) => void
    onSendMessageClick: () => void
}

const Dialogs: React.FC<PropsType> = ({
                                          onNewMessageChange,
                                          onSendMessageClick,
                                          dialogsPage
}) => {

    let dialogElements = dialogsPage.dialogsData.map(el => <DialogItem key={el.id} name={el.name} id={el.id}/>)
    let messagesElements = dialogsPage.messagesData.map(el => <Message key={el.id} message={el.message}/>)
    let newMessageBody = dialogsPage.newMessageBody

    const onSendMessageClickHandler = () => {
        onSendMessageClick()
    }

    const onNewMessageChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        let body = e.currentTarget.value
        onNewMessageChange(body)
    }

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItem}>
                {dialogElements}
            </div>
            <div className={s.messages}>
                <div>{messagesElements}</div>
                <div>
                    <div>
                        <textarea
                            placeholder={'Enter your message'}
                            onChange={onNewMessageChangeHandler}
                            value={newMessageBody}
                        ></textarea>
                    </div>
                    <div>
                        <button onClick={onSendMessageClickHandler}>Send</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dialogs;