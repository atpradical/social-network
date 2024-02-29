import React from 'react';
import s from './ProfileInfo.module.css'

export const ProfileInfo = () => {
    return (
        <div>
            <div>
                <img src="https://images.wallpapershq.com/wallpapers/8175/wallpaper_8175_1920x1080.jpg"
                     alt="picture"/>
            </div>
            <div className={s.descriptionBlock}>
                <div>Ava + Description</div>
            </div>
        </div>
    );
};