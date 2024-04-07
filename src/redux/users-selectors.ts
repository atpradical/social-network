import {AppStateType} from "./redux-store";
import {UserType} from "./users-reducer";
import {createSelector} from "reselect";

export const getUsersSelector = (state: AppStateType): UserType[] => {
    return state.usersPage.users
}

export const getUsersSuperSelector = createSelector(getUsersSelector, (users) => {
    return users.filter(u => true)
})

export const getPageSizeSelector = (state: AppStateType): number => {
    return state.usersPage.pageSize
}
export const getTotalUsersCountSelector = (state: AppStateType): number => {
    return state.usersPage.totalUsersCount
}
export const getCurrentPageSelector = (state: AppStateType): number => {
    return state.usersPage.currentPage
}
export const getIsFetchingSelector = (state: AppStateType): boolean => {
    return state.usersPage.isFetching
}

export const getFollowingInProgressSelector = (state: AppStateType): number[] => {
    return state.usersPage.followingInProgress
}