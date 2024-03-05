import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {
    unFollowSuccess,
    followSuccess, follow,
    getUsers,
    InitialStateType,
    unFollow,
} from "../../redux/users-reducer";
import React from "react";
import {Users} from "./Users";
import {Preloader} from "../Common/Preloader";


//TODO: [lesson 53] доделать/проверить типизацию для React.Component<any, any>
class UsersContainer extends React.Component<UsersContainerPropsType> {

    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize)
    }

    onPageChangedHandler = (pageNumber: number) => {
        this.props.getUsers(pageNumber, this.props.pageSize)
    }

    render() {
        return (
            <>
                {this.props.isFetching
                    ? <Preloader/>
                    : null}
                <Users totalUsersCount={this.props.totalUsersCount}
                       pageSize={this.props.pageSize}
                       onPageChangedHandler={this.onPageChangedHandler}
                       currentPage={this.props.currentPage}
                       users={this.props.users}
                       followingInProgress={this.props.followingInProgress}
                       follow={this.props.follow}
                       unFollow={this.props.unFollow}
                />

            </>
        )
    }
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followingInProgress: state.usersPage.followingInProgress
    }
}

// const mapDispatchToProps = (dispatch: Dispatch): MapDispatchToPropsType => {
//     return {
//         follow: (userId: number) => {
//             dispatch(followAC(userId))
//         },
//         unFollow: (userId: number) => {
//             dispatch(unFollowAC(userId))
//         },
//         setUsers: (users: userType[]) => {
//             dispatch(setUsersAC(users))
//         },
//         setCurrentPage: (pageNumber: number) => {
//             dispatch(setCurrentPageAC(pageNumber))
//         },
//         setTotalUsersCount: (totalCount: number) => {
//             dispatch(setTotalUsersCountAC(totalCount))
//         },
//         toggleIsFetching: (isFetching: boolean) => {
//             dispatch(toggleIsFetchingAC(isFetching))
//         }
//     }
// }
// export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer)
export default connect(mapStateToProps, {
    unFollowSuccess, followSuccess,
    getUsers, follow, unFollow
} as MapDispatchToPropsType)(UsersContainer)


//types:
type MapStateToPropsType = InitialStateType
type MapDispatchToPropsType = {
    followSuccess: (userId: number) => void
    unFollowSuccess: (userId: number) => void
    getUsers: (currentPage: number, pageSize: number) => void
    follow: (userId: number) => void
    unFollow: (userId: number) => void
}
type UsersContainerPropsType = MapStateToPropsType & MapDispatchToPropsType