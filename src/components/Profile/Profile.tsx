import React from 'react';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPosts from "./MyPost/MyPosts";
import {StateType} from "../../redux/state";

type PropsType = {
    state: StateType
    dispatch: (action: any)=>void
    // addPost: () => void
    // updateNewPostText: (newText: string) => void
}


const Profile: React.FC<PropsType> = ({
                                          state, dispatch
                                          // addPost,
                                          // updateNewPostText
                                      }) => {
    return (
        <div>
            <ProfileInfo/>
            <MyPosts
                posts={state.profilePage.postsData}
                newPostText={state.profilePage.newPostText}
                dispatch={dispatch}
                // addPost={addPost}
                // updateNewPostText={updateNewPostText}
            />
        </div>
    );
};

export default Profile;