import React from 'react';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPosts from "./MyPost/MyPosts";
import {StateType} from "../../redux/store";

type PropsType = {
    state: StateType
    dispatch: (action: any)=>void
}


const Profile: React.FC<PropsType> = ({
                                          state, dispatch

                                      }) => {
    return (
        <div>
            <ProfileInfo/>
            <MyPosts
                posts={state.profilePage.postsData}
                newPostText={state.profilePage.newPostText}
                dispatch={dispatch}
            />
        </div>
    );
};

export default Profile;