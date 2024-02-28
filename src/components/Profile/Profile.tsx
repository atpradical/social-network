import React from 'react';
import s from './Profile.module.css';
import {MyPosts} from "./MyPosts/MyPosts";

export const Profile = () => {
    return (
        <div className={s.content}>
            Main content
            <img src="https://images.wallpapershq.com/wallpapers/8175/wallpaper_8175_1920x1080.jpg" alt="picture"/>
            <div>Ava + Description</div>
            <MyPosts/>
        </div>
    );
};