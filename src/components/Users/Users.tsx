import React from 'react';
import s from "./Users.module.css";
import userPhoto from "../../assets/no-profile-picture-icon.webp";
import {NavLink} from "react-router-dom";
import {userType} from "../../redux/users-reducer";

export const Users: React.FC<UsersType> = (props) => {

    const pagesCount = Math.ceil(props.totalUsersCount / props.pageSize)

    let pages: number[] = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }
    return (
        <div>
            <div>
                {pages.map(p =>
                    <span
                        onClick={() => props.onPageChangedHandler(p)}
                        className={props.currentPage === p ? s.selectedPage : ''}
                    >{p}</span>)}
            </div>
            {
                props.users.map(u => <div key={u.id} className={s.item}>
                    <span>
                        <div>
                            <NavLink to={`/profile/${u.id}`}>
                                <img src={u.photos.small || userPhoto} alt="userPhoto" className={s.userPhoto}/>
                            </NavLink>
                        </div>
                        <div>
                            {u.followed
                                ? <button disabled={props.followingInProgress.some(id => id === u.id)}
                                          onClick={() => {
                                              props.unFollow(u.id)
                                          }}>Unfollow</button>
                                : <button disabled={props.followingInProgress.some(id => id === u.id)}
                                          onClick={() => {
                                              props.follow(u.id)
                                          }}>Follow</button>}
                        </div>
                    </span>
                    <span>
                        <div><b>{u.name}</b></div>
                        <div><i>{u.status}</i></div>
                    </span>
                    <span>
                        <div>{"u.location.country"}</div>
                        <div>{"u.location.city"}</div>
                    </span>
                </div>)
            }
        </div>
    );
};

//type:
type UsersType = {
    totalUsersCount: number
    pageSize: number
    onPageChangedHandler: (pageNumber: number) => void
    currentPage: number
    users: userType[]
    followingInProgress: number[]
    follow: (userId: number) => void
    unFollow: (userId: number) => void
}