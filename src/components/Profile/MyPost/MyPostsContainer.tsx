import React from 'react';
import {StoreType} from "../../../redux/store";
import {addPostAC, updateNewPostTextAC} from "../../../redux/profile-reducer";
import MyPosts from "./MyPosts";

type PropsType = {
    store: StoreType
}

const MyPostsContainer: React.FC<PropsType> = ({store}) => {

    const state = store.getState()

    const onClickHandler = () => {
        store.dispatch(addPostAC())
    }

    const onPostChange = (text: string) => {
        store.dispatch(updateNewPostTextAC(text))
    }

    return (
        <MyPosts
            posts={state.profilePage.postsData}
            newPostText={state.profilePage.newPostText}
            addPost={onClickHandler}
            updateNewPostText={onPostChange}
        />
    );
};

export default MyPostsContainer;