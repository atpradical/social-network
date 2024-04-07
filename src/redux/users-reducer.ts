import {Action, Dispatch} from "redux";
import {ResponseType, RESULT_CODE, usersAPI} from "../api/api";
import {AxiosResponse} from "axios";

const FOLLOW = 'USERS/FOLLOW';
const UNFOLLOW = 'USERS/UNFOLLOW';
const SET_USERS = 'USERS/SET-USERS';
const SET_CURRENT_PAGE = 'USERS/SET-CURRENT-PAGE';
const SET_TOTAL_USERS_COUNT = 'USERS/SET-TOTAL-USERS-COUNT';
const TOGGLE_IS_FETCHING = 'USERS/TOGGLE-IS-FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'USERS/TOGGLE-IS-FOLLOWING-PROGRESS';

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
export const setUsers = (users: UserType[]) => ({type: SET_USERS, users} as const)
export const setCurrentPage = (currentPage: number) => ({type: SET_CURRENT_PAGE, currentPage} as const)
export const setTotalUsersCount = (totalUsersCount: number) => ({type: SET_TOTAL_USERS_COUNT, totalUsersCount} as const)
export const toggleIsFetching = (isFetching: boolean) => ({type: TOGGLE_IS_FETCHING, isFetching} as const)
export const toggleFollowingProgress = (userId: number, isFetching: boolean) => ({
    type: TOGGLE_IS_FOLLOWING_PROGRESS, userId, isFetching
} as const)


//thunks:
export const requestUsers = (page: number, pageSize: number) => async (dispatch: Dispatch) => {
    dispatch(toggleIsFetching(true))
    dispatch(setCurrentPage(page))
    const response = await usersAPI.getUsers(page, pageSize)
    dispatch(toggleIsFetching(false))
    dispatch(setUsers(response.items))
    dispatch(setTotalUsersCount(response.totalCount))
}

export const followUnfollowFlow = async (dispatch: Dispatch, userId: number, ApiMethod: (userId: number) => Promise<AxiosResponse<ResponseType>>, ActionCreator: (userId: number) => Action) => {
    dispatch(toggleFollowingProgress(userId, true))
    const response = await ApiMethod(userId)

    console.log(response.data.data)

    // const response = await usersAPI.follow(userId)
    if (response.data.resultCode === RESULT_CODE.SUCCESS) {
        dispatch(ActionCreator(userId))
    }
    dispatch(toggleFollowingProgress(userId, false))
}

export const follow = (userId: number) => (dispatch: Dispatch) => {
    let ApiMethod = usersAPI.follow.bind(usersAPI)
    followUnfollowFlow(dispatch, userId, ApiMethod, followSuccess)
}
export const unFollow = (userId: number) => (dispatch: Dispatch) => {
    let ApiMethod = usersAPI.unFollow.bind(usersAPI)
    followUnfollowFlow(dispatch, userId, ApiMethod, unFollowSuccess)
}


//types:
export type UserType = {
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
export type InitialStateType = {
    users: UserType[]
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