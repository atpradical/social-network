import React from 'react';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPosts from "./MyPost/MyPosts";
import {StateType} from "../../redux/state";

type PropsType = {
    state: StateType
    addPost: () => void
    updateNewPostText: (newText: string) => void
}


const Profile: React.FC<PropsType> = ({
                                          state,
                                          addPost,
                                          updateNewPostText
                                      }) => {
    return (
        <div>
            <ProfileInfo/>
            <MyPosts
                posts={state.profilePage.postsData}
                newPostText={state.profilePage.newPostText}
                addPost={addPost}
                updateNewPostText={updateNewPostText}
            />
        </div>
    );
};

export default Profile;