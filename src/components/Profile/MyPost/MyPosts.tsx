import React from 'react';
import s from './MyPost.module.css'
import Post from "./Post/Post";
import {PostDataType} from "../../../redux/state";

type PropsType = {
    posts: PostDataType[]
}

const MyPosts: React.FC<PropsType> = ({posts}) => {

    let postsElements = posts.map(el => <Post key={el.id} message={el.message} likesCount={el.likesCount}/>)

    return (
        <div className={s.postsBlock}>
            <h3>My Posts</h3>
            <div>
                <div><textarea cols={100} rows={5}></textarea></div>
                <button>Add Post</button>
            </div>
            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    );
};

export default MyPosts;