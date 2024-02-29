import React from 'react';
import s from './Post.module.css';

type PropsType = {
    message: string
    likesCount: number
}

export const Post: React.FC<PropsType> = (props) => {
    return (
        <div className={s.item}>
            <img
                src="https://img.freepik.com/premium-vector/girl-s-face-with-beautiful-smile-female-avatar-website-social-network_499739-527.jpg?w=740"
                alt="avatar"/>
            {props.message}
            <div>
                <span>likes: </span>
                {props.likesCount}
            </div>
        </div>
    );
};