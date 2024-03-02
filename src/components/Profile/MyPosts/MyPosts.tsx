import React from 'react';
import s from './MyPosts.module.css';
import {Post} from "./Post/Post";
import {addPostAC, updateNewPostTextAC} from "../../../redux/profile-reducer";
import {ActionsType, PostsType} from "../../../redux/store";

export const MyPosts: React.FC<MyPostsPropsType> = (props) => {

    const postsElements = props.posts.map(p => <Post message={p.post} likesCount={p.likesCount}/>)

    const newPostElement = React.createRef<HTMLTextAreaElement>()

    const addPost = () => {
        props.dispatch(addPostAC())
    }

    const onPostChange = () => {
        if (newPostElement.current) {
            props.dispatch(updateNewPostTextAC(newPostElement.current.value))
        }
    }

    return (
        <div className={s.postsBlock}>
            <h3>My Posts</h3>
            <div>
                <div>
                    <textarea
                        cols={75} rows={10}
                        ref={newPostElement}
                        onChange={onPostChange}
                        value={props.newPostText}></textarea>
                </div>
                <div>
                    <button onClick={addPost}>Add Post</button>
                </div>
            </div>
            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    );
};

//types:
type MyPostsPropsType = {
    posts: PostsType[]
    newPostText: string
    dispatch: (action: ActionsType) => void
}