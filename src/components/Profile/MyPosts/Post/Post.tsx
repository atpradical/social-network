import React from 'react';
import s from './Post.module.css';

export const Post = () => {
    return (
        <div className={s.item}>
            <img
                src="https://img.freepik.com/premium-vector/girl-s-face-with-beautiful-smile-female-avatar-website-social-network_499739-527.jpg?w=740"
                alt="avatar"/>
            Post 1
            <div><span>like</span></div>
        </div>
    );
};