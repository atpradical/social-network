import React from "react";
import {MyPostsPropsType} from "./UsersContainer";
import s from './Users.module.css'

export const Users: React.FC<MyPostsPropsType> = (props) => {

    if (props.users.length === 0) {
        props.setUsers([
            {
                id: 1, fullName: 'Ivan', followed: true, status: 'I am a boss',
                location: {country: 'Russia', city: 'Moscow'},
                photoUrl: 'https://e7.pngegg.com/pngimages/304/305/png-clipart-man-with-formal-suit-illustration-web-development-computer-icons-avatar-business-user-profile-child-face.png'
            },
            {
                id: 2, fullName: 'Alexandra', followed: false, status: 'Hey there!',
                location: {country: 'Spain', city: 'Valencia'},
                photoUrl: 'https://img.freepik.com/premium-vector/girl-s-face-with-beautiful-smile-female-avatar-website-social-network_499739-527.jpg?w=740'
            },
            {
                id: 3, fullName: 'Ayse', followed: true, status: 'I\'ve got an apartment for rent',
                location: {country: 'Turkey', city: 'Antalya'},
                photoUrl: 'https://img.freepik.com/premium-vector/girl-s-face-with-beautiful-smile-female-avatar-website-social-network_499739-527.jpg?w=740'
            },
            {
                id: 4, fullName: 'Dmitry', followed: false, status: 'try my REACT-REDUX course',
                location: {country: 'Belarus', city: 'Minsk'},
                photoUrl: 'https://e7.pngegg.com/pngimages/304/305/png-clipart-man-with-formal-suit-illustration-web-development-computer-icons-avatar-business-user-profile-child-face.png'
            },
        ])
    }

    return (
        <div>
            {
                props.users.map(u => <div key={u.id} className={s.item}>
                    <span>
                        <div>
                            <img src={u.photoUrl} alt="userPhoto" className={s.userPhoto}/>
                        </div>
                        <div>
                            {u.followed
                                ? <button onClick={() => props.unFollow(u.id)}>Unfollow</button>
                                : <button onClick={() => props.follow(u.id)}>Follow</button>}
                        </div>
                    </span>
                    <span>
                        <div><b>{u.fullName}</b></div>
                        <div><i>{u.status}</i></div>
                    </span>
                    <span>
                        <div>{u.location.country}</div>
                        <div>{u.location.city}</div>
                    </span>
                </div>)
            }
        </div>
    );
}