import React, {FC} from 'react';
import {Paginator} from "../Common/Paginator/Paginator";
import {UserType} from "../../redux/users-reducer";
import {User} from "./User";

export const Users: FC<Users> = ({
                                     currentPage, pageSize,
                                     totalUsersCount, onPageChangedHandler,
                                     users, ...props
                                 }) => {
    return (
        <div>
            <Paginator
                currentPage={currentPage}
                totalItemsCount={totalUsersCount}
                onPageChanged={onPageChangedHandler}
                pageSize={pageSize}/>
            <div>
                {users.map(u => <User
                    key={u.id}
                    user={u}
                    followingInProgress={props.followingInProgress}
                    follow={props.follow}
                    unFollow={props.unFollow}
                />)}
            </div>
        </div>
    );
};


//types:
type Users = {
    totalUsersCount: number
    pageSize: number
    onPageChangedHandler: (pageNumber: number) => void
    currentPage: number
    users: UserType[]
    followingInProgress: number[]
    follow: (userId: number) => void
    unFollow: (userId: number) => void
}