import React, {FC} from 'react';
import s from "./Users.module.css";
import userPhoto from "../../assets/no-profile-picture-icon.webp";
import {NavLink} from "react-router-dom";
import {UserType} from "../../redux/users-reducer";

export const User: FC<Props> = ({user, followingInProgress, follow, unFollow}) => {

    return (
        <div className={s.item}>
            <span>
                  <div>
                       <NavLink to={`/profile/${user.id}`}>
                           <img src={user.photos.small || userPhoto} alt="userPhoto" className={s.userPhoto}/>
                       </NavLink>
                  </div>
                  <div>
                       {
                           user.followed
                               ? <button
                                   disabled={followingInProgress.some(id => id === user.id)}
                                   onClick={() => {
                                       unFollow(user.id)
                                   }}> Unfollow
                               </button>
                               : <button
                                   disabled={followingInProgress.some(id => id === user.id)}
                                   onClick={() => {
                                       follow(user.id)
                                   }}>Follow
                               </button>
                       }
                  </div>
            </span>
            <span>
                <div><b>{user.name}</b></div>
                <div><i>{user.status}</i></div>
            </span>
            <span>
                <div>{"u.location.country"}</div>
                <div>{"u.location.city"}</div>
            </span>
        </div>
    );
};

//types:
type Props = {
    user: UserType
    followingInProgress: number[]
    follow: (userId: number) => void
    unFollow: (userId: number) => void
}