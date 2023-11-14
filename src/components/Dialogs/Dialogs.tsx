import React, {ChangeEvent} from 'react';
import s from './Dialogs.module.css'
import {DialogItem} from "./DialogItem/DialogItem";
import {Message} from "./Message/Message";
import {StoreType} from "../../redux/state";
import {sendMessageAC, updateNewMessageBodyAC} from "../../redux/dialogs-reducer";

type PropsType = {
    store: StoreType
}

const Dialogs: React.FC<PropsType> = ({ store}) => {

    const state = store.getState().dialogsPage

    let dialogElements = state.dialogsData.map(el => <DialogItem key={el.id} name={el.name} id={el.id}/>)
    let messagesElements = state.messagesData.map(el => <Message key={el.id} message={el.message}/>)
    let newMessageBody = state.newMessageBody

    const onSendMessageClick = () => {
        console.log('dfsdf')
        store.dispatch(sendMessageAC())
    }

    const onNewMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        let body = e.currentTarget.value
        store.dispatch(updateNewMessageBodyAC(body))
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
                            onChange={onNewMessageChange}
                            value={newMessageBody}
                        ></textarea>
                    </div>
                    <div>
                        <button onClick={onSendMessageClick}>Send</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dialogs;