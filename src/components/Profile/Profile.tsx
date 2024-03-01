import React from 'react';
import s from './Profile.module.css';
import {MyPosts} from "./MyPosts/MyPosts";
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {PostsType} from "../../redux/state";

export const Profile:React.FC<ProfilePropsType> = (props) => {

    return (
        <div className={s.content}>
            <ProfileInfo/>
            <MyPosts
                posts={props.profilePage.posts}
                newPostText={props.profilePage.newPostText}
                addPost={props.addPost}
                updateNewPostText={props.updateNewPostText}/>
        </div>
    );
};

//types:
type ProfilePropsType = {
    profilePage: {
        posts: PostsType[]
        newPostText: string
    }
    addPost: () => void
    updateNewPostText: (newText: string) => void
}