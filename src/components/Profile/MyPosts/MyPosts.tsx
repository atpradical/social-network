import React from 'react';
import s from './MyPosts.module.css';
import {Post} from "./Post/Post";

export const MyPosts = () => {

    const posts: PostsType[] = [
        {id: 1, post: 'Hi how are you?', likesCount: 5},
        {id: 2, post: 'this is my first comment', likesCount: 2},
        {id: 3, post: 'IT-KAMASUTRA', likesCount: 0},
        {id: 4, post: 'BEST social network', likesCount: 1},
    ]

    const postsElements = posts.map(p => <Post message={p.post} likesCount={p.likesCount}/>)

    return (
        <div className={s.postsBlock}>
            <h3>My Posts</h3>
            <div>
                <div>
                    <textarea></textarea>
                </div>
                <div>
                    <button>Add Post</button>
                </div>
            </div>
            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    );
};

//types:
type PostsType = {
    id: number
    post: string
    likesCount: number
}