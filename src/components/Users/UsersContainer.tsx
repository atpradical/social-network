import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {follow, followSuccess, requestUsers, unFollow, unFollowSuccess, UserState} from "../../redux/users-reducer";
import React from "react";
import {Users} from "./Users";
import {Preloader} from "../Common/Preloder/Preloader";
import {compose} from "redux";
import {
    getCurrentPageSelector,
    getFollowingInProgressSelector,
    getIsFetchingSelector,
    getPageSizeSelector,
    getTotalUsersCountSelector,
    getUsersSuperSelector
} from "../../redux/users-selectors";


class UsersContainer extends React.Component<Props> {

    componentDidMount() {
        const {currentPage, getUsers, pageSize} = this.props
        getUsers(currentPage, pageSize)
    }

    onPageChangedHandler = (pageNumber: number) => {
        const {getUsers, pageSize} = this.props
        getUsers(pageNumber, pageSize)
    }

    render() {
        return (
            <>
                {this.props.isFetching ? <Preloader/> : null}
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

const mapStateToProps = (state: AppStateType): MapStateToProps => {
    return {
        users: getUsersSuperSelector(state),
        pageSize: getPageSizeSelector(state),
        totalUsersCount: getTotalUsersCountSelector(state),
        currentPage: getCurrentPageSelector(state),
        isFetching: getIsFetchingSelector(state),
        followingInProgress: getFollowingInProgressSelector(state)
    }
}

export default compose<React.ComponentType>(
    connect<MapStateToProps, MapDispatchToProps, {}, AppStateType>(mapStateToProps, {
        unFollowSuccess, followSuccess, getUsers: requestUsers, follow, unFollow
    } as MapDispatchToProps)
)(UsersContainer)


//types:
type MapStateToProps = UserState

type MapDispatchToProps = {
    followSuccess: (userId: number) => void
    unFollowSuccess: (userId: number) => void
    getUsers: (currentPage: number, pageSize: number) => void
    follow: (userId: number) => void
    unFollow: (userId: number) => void
}
type Props = MapStateToProps & MapDispatchToProps