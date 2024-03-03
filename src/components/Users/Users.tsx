import React, {MouseEventHandler} from "react";
import s from "./Users.module.css";
import userPhoto from "../../assets/no-profile-picture-icon.webp";
import axios from "axios";
import {userType} from "../../redux/users-reducer";
import {UsersPropsType} from "./UsersContainer";

const instance = axios.create({
    baseURL: ' https://social-network.samuraijs.com/api/1.0'
})

//TODO: [lesson 53] доделать/проверить типизацию для React.Component<any, any>
export class Users extends React.Component<UsersPropsType> {

    componentDidMount() {
        instance.get<GetUsersResponseType>(`/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
            .then(res => {
                this.props.setUsers(res.data.items)
                //TODO: [lesson 55] добавить в reducer "setTotalUsersCount"
                // this.props.setTotalUsersCount(res.data.totalCount)
            })
    }
    onPageChangedHandler = (pageNumber: number ) => {
        this.props.setCurrentPage(pageNumber)
        instance.get<GetUsersResponseType>(`/users?page=${pageNumber}&count=${this.props.pageSize}`)
            .then(res => {
                this.props.setUsers(res.data.items)
            })
    }

    render() {

        const pagesCount = Math.ceil(this.props.totalUsersCount / this.props.pageSize)

        let pages: number[] = []

        for (let i = 1; i <= pagesCount; i++) {
            pages.push(i)
        }

        return <div>
            <div>
                {pages.map(p =>
                    <span
                        onClick={() => this.onPageChangedHandler(p)}
                        className={this.props.currentPage === p ? s.selectedPage : ''}
                    >{p}</span>)}
            </div>
            {
                this.props.users.map(u => <div key={u.id} className={s.item}>
                    <span>
                        <div>
                            <img src={u.photos.small || userPhoto} alt="userPhoto" className={s.userPhoto}/>
                        </div>
                        <div>
                            {u.followed
                                ? <button onClick={() => this.props.unFollow(u.id)}>Unfollow</button>
                                : <button onClick={() => this.props.follow(u.id)}>Follow</button>}
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
    }
}

//types:
type GetUsersResponseType = {
    items: userType[]
    totalCount: number
    error: string | null
}