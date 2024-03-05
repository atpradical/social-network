import {Dispatch} from "redux";
import {RESULT_CODE, usersAPI} from "../api/api";

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET-USERS';
const SET_CURRENT_PAGE = 'SET-CURRENT-PAGE';
const SET_TOTAL_USERS_COUNT = 'SET-TOTAL-USERS-COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE-IS-FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE-IS-FOLLOWING-PROGRESS';

const initialState = {
    users: [],
    pageSize: 10,
    totalUsersCount: 200,
    currentPage: 1,
    isFetching: true,
    followingInProgress: []
}

export const userReducer = (state: InitialStateType = initialState, action: ProfileActionsType): InitialStateType => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state, users: state.users.map(u => u.id === action.userId
                    ? {...u, followed: true} : u)
            }
        case UNFOLLOW:
            return {
                ...state, users: state.users.map(u => u.id === action.userId
                    ? {...u, followed: false} : u)
            }
        case SET_USERS:
            return {...state, users: [...action.users]}
        case SET_CURRENT_PAGE:
            return {...state, currentPage: action.currentPage}
        case SET_TOTAL_USERS_COUNT:
            return {...state, totalUsersCount: action.totalUsersCount}
        case TOGGLE_IS_FETCHING:
            return {...state, isFetching: action.isFetching}
        case TOGGLE_IS_FOLLOWING_PROGRESS:
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            }
        default:
            return state
    }
}


//actions:
export const followSuccess = (userId: number) => ({type: FOLLOW, userId} as const)
export const unFollowSuccess = (userId: number) => ({type: UNFOLLOW, userId} as const)
export const setUsers = (users: userType[]) => ({type: SET_USERS, users} as const)
export const setCurrentPage = (currentPage: number) => ({type: SET_CURRENT_PAGE, currentPage} as const)
export const setTotalUsersCount = (totalUsersCount: number) => ({type: SET_TOTAL_USERS_COUNT, totalUsersCount} as const)
export const toggleIsFetching = (isFetching: boolean) => ({type: TOGGLE_IS_FETCHING, isFetching} as const)
export const toggleFollowingProgress = (userId: number, isFetching: boolean) => ({
    type: TOGGLE_IS_FOLLOWING_PROGRESS,
    userId,
    isFetching
} as const)


//thunks:
export const getUsers = (currentPage: number, pageSize: number) => (dispatch: Dispatch) => {
    dispatch(toggleIsFetching(true))
    usersAPI.getUsers(currentPage, pageSize)
        .then(data => {
            dispatch(toggleIsFetching(false))
            dispatch(setUsers(data.items))
            dispatch(setTotalUsersCount(data.totalCount))
        })
}
export const follow = (userId: number) => (dispatch:Dispatch) => {
    dispatch(toggleFollowingProgress(userId, true))
    usersAPI.follow(userId)
        .then(res => {
            if (res.data.resultCode === RESULT_CODE.SUCCESS) {
                dispatch(followSuccess(userId))
            }
            dispatch(toggleFollowingProgress(userId, false))
        })
}
export const unFollow = (userId: number) => (dispatch:Dispatch) => {
    dispatch(toggleFollowingProgress(userId, true))
    usersAPI.unFollow(userId)
    .then(res => {
        if (res.data.resultCode === RESULT_CODE.SUCCESS) {
            dispatch(unFollowSuccess(userId))
        }
        dispatch(toggleFollowingProgress(userId, false))
    })
}


//types:
export type userType = {
    name: string
    id: number
    photos: ProfilePhotosType
    status: string | null
    followed: boolean
}
export type ProfilePhotosType = {
    small: string | null
    large: string | null
}
// type InitialStateType = typeof initialState
export type InitialStateType = {
    users: userType[]
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean,
    followingInProgress: number[]
}

export type ProfileActionsType =
    | ReturnType<typeof followSuccess>
    | ReturnType<typeof unFollowSuccess>
    | ReturnType<typeof setUsers>
    | ReturnType<typeof setCurrentPage>
    | ReturnType<typeof setTotalUsersCount>
    | ReturnType<typeof toggleIsFetching>
    | ReturnType<typeof toggleFollowingProgress>