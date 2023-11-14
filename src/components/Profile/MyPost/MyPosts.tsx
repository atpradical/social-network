import React, {ChangeEvent} from 'react';
import s from './MyPost.module.css'
import Post from "./Post/Post";
import {PostDataType} from "../../../redux/state";
import {addPostAC, updateNewPostTextAC} from "../../../redux/profile-reducer";

type PropsType = {
    posts: PostDataType[]
    newPostText: string
    dispatch: (action: any) => void
    // addPost: () => void
    // updateNewPostText: (newText: string) => void
}

const MyPosts: React.FC<PropsType> = ({
                                          posts,dispatch,
                                          // addPost,
                                          newPostText,
                                          // updateNewPostText
                                      }) => {

    let postsElements = posts.map((el , index)=> <Post key={index} message={el.message} likesCount={el.likesCount}/>)

    const newPostElement = React.createRef<HTMLTextAreaElement>()

    const onClickHandler = () => {
        if (newPostElement.current) {
           // addPost()
            dispatch(addPostAC())
        }
    }

    const onPostChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        dispatch(updateNewPostTextAC(e.currentTarget.value))
    }

    return (
        <div className={s.postsBlock}>
            <h3>My Posts</h3>
            <div>
                <div><textarea onChange={onPostChange} ref={newPostElement} value={newPostText}/></div>
                <button onClick={onClickHandler}>Add Post</button>
            </div>
            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    );
};

export default MyPosts;