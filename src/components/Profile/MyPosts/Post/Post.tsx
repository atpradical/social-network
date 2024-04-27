import React, {FC} from 'react';
import s from './Post.module.css';


export const Post: FC<Props> = (props) => {
    return (
        <div className={s.item}>
            <img
                src="https://img.freepik.com/premium-vector/girl-s-face-with-beautiful-smile-female-avatar-website-social-network_499739-527.jpg?w=740"
                alt="avatar"/>
            {props.message}
            <div>
                <span>likes: </span>
                {props.likesCount}
            </div>
        </div>
    );
};

//types:
type Props = {
    message: string
    likesCount: number
}