import React from 'react';
import {Paginator} from "../Common/Paginator/Paginator";
import {UserType} from "../../redux/users-reducer";
import {User} from "./User";

export const Users: React.FC<UsersType> = ({
                                               currentPage,
                                               pageSize,
                                               totalUsersCount,
                                               onPageChangedHandler,
                                               users,
                                               ...props
                                           }) => {
    return (
        <div>
            <Paginator currentPage={currentPage} totalItemsCount={totalUsersCount}
                       onPageChangedHandler={onPageChangedHandler} pageSize={pageSize}/>
            <div>
                {
                    users.map(u => <User key={u.id} user={u} followingInProgress={props.followingInProgress}
                                         follow={props.follow} unFollow={props.unFollow}/>)
                }
            </div>
        </div>
    );
};

//type:
type UsersType = {
    totalUsersCount: number
    pageSize: number
    onPageChangedHandler: (pageNumber: number) => void
    currentPage: number
    users: UserType[]
    followingInProgress: number[]
    follow: (userId: number) => void
    unFollow: (userId: number) => void
}