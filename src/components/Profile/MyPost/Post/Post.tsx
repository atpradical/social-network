import React, {FC} from 'react';

type PostType = {
    message: string
    likesCount: number
}

const Post:FC<PostType> = (props) => {
    return (
        <div>
            <span>{props.message + ' ' + props.likesCount}</span>
        </div>
    );
};

export default Post;