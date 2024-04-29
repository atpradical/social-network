import React, {FC} from 'react';
import {Paginator} from "../Common/Paginator/Paginator";
import {Filter, UserType} from "../../redux/users-reducer";
import {User} from "./User";
import {UsersSearchForm} from "./UsersSearchForm";
import {Row} from 'antd';

export const Users: FC<Users> = ({pageSize, totalUsersCount, onPageChangedHandler, users, ...props}) => {
    return (
        <div>
            <div>
                <UsersSearchForm onFilterChanged={props.onFilterChanged}/>
            </div>
            <Paginator
                totalItemsCount={totalUsersCount}
                onPageChanged={onPageChangedHandler}
                pageSize={pageSize}
            />
            <Row style={{rowGap: "20px", columnGap: "20px"}}>
                {users.map(u => <User
                    key={u.id}
                    user={u}
                    followingInProgress={props.followingInProgress}
                    follow={props.follow}
                    unFollow={props.unFollow}
                />)}
            </Row>
        </div>
    );
};


//types:
type Users = {
    totalUsersCount: number
    pageSize: number
    onPageChangedHandler: (pageNumber: number) => void
    onFilterChanged: (filter: Filter) => void
    users: UserType[]
    followingInProgress: number[]
    follow: (userId: number) => void
    unFollow: (userId: number) => void
}

