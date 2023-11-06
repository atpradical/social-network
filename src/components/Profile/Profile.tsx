import React from 'react';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPosts from "./MyPost/MyPosts";
import {profilePageType} from "../../redux/state";

type PropsType = {
    state: profilePageType
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
                posts={state.postsData}
                newPostText={state.newPostText}
                addPost={addPost}
                updateNewPostText={updateNewPostText}
            />
        </div>
    );
};

export default Profile;