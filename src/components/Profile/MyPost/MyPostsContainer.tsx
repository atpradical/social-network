import React from 'react';
import {StoreType} from "../../../redux/store";
import {addPostAC, updateNewPostTextAC} from "../../../redux/profile-reducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";

type PropsType = {
    store: StoreType
}

// const MyPostsContainer: React.FC<PropsType> = ({store}) => {
//
//     const state = store.getState()
//
//     const onClickHandler = () => {
//         store.dispatch(addPostAC())
//     }
//
//     const onPostChange = (text: string) => {
//         store.dispatch(updateNewPostTextAC(text))
//     }
//
//     return (
//         <MyPosts
//             posts={state.profilePage.postsData}
//             newPostText={state.profilePage.newPostText}
//             addPost={onClickHandler}
//             updateNewPostText={onPostChange}
//         />
//     );
// };

const mapStateToProps = (state: any) => {
    return {
        profilePage: state.dialogsData.profilePage,
        newPostText: state.dialogsData.newPostText
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        addPost: () => dispatch(addPostAC()),
        updateNewPostText: (text: string) => dispatch(updateNewPostTextAC(text))
    }
}

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)

export default MyPostsContainer;