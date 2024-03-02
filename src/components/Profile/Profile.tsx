import React from 'react';
import s from './Profile.module.css';
import {MyPosts} from "./MyPosts/MyPosts";
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {ActionsType, PostsType} from "../../redux/store";

export const Profile: React.FC<ProfilePropsType> = (props) => {

    return (
        <div className={s.content}>
            <ProfileInfo/>
            <MyPosts
                posts={props.profilePage.posts}
                newPostText={props.profilePage.newPostText}
                dispatch={props.dispatch}
            />
        </div>
    );
};

//types:
type ProfilePropsType = {
    profilePage: {
        posts: PostsType[]
        newPostText: string
    }
    dispatch: (action: ActionsType) => void
}