import React from 'react';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPosts from "./MyPost/MyPosts";
import {profilePageType} from "../../redux/state";

type PropsType = {
    state: profilePageType
}


const Profile: React.FC<PropsType> = ({state}) => {
    return (
        <div>
            <ProfileInfo/>
            <MyPosts posts={state.postsData}/>
        </div>
    );
};

export default Profile;