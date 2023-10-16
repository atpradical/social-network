import React from 'react';
import s from './MyPost.module.css'
import Post from "./Post/Post";

const MyPosts = () => {

    const postsData = [
        {id: "1", message: 'Hi, how are you', likesCount: 12},
        {id: "1", message: 'It\'s my first post', likesCount: 11},
        {id: "1", message: 'bla bla bla bla', likesCount: 1},
        {id: "1", message: 'yoooohooo', likesCount: 101},
    ]

let postsElements = postsData.map(el=> <Post key={el.id} message={el.message} likesCount={el.likesCount}/>)

    return (
        <div className={s.postsBlock}>
            <h3>My Posts</h3>
            <div>
                <div><textarea name="" id="" cols={100} rows={5}></textarea></div>
                <button>Add Post</button>
            </div>
            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    );
};

export default MyPosts;