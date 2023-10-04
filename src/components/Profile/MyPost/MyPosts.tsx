import React from 'react';
import s from './MyPost.module.css'
import Post from "./Post/Post";

const MyPosts = () => {
    return (
        <div className={s.postsBlock}>
            <h3>My Posts</h3>
            <div>
                <div><textarea name="" id="" cols={100} rows={5}></textarea></div>
                <button>Add Post</button>
            </div>
            <div className={s.posts}>
                <Post message={'Hi, how are you?'} likesCount={0}/>
                <Post message={'this is first post?'} likesCount={23}/>
            </div>
        </div>
    );
};

export default MyPosts;