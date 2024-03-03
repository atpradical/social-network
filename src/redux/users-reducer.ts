const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET-USERS';
const SET_CURRENT_PAGE = 'SET-CURRENT-PAGE';

const initialState = {
    users: [],
    pageSize: 10,
    totalUsersCount: 200,
    currentPage: 20
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
        default:
            return state
    }
}
//actions:
export const followAC = (userId: number) => ({type: FOLLOW, userId} as const)
export const unFollowAC = (userId: number) => ({type: UNFOLLOW, userId} as const)
export const setUsersAC = (users: userType[]) => ({type: SET_USERS, users} as const)
export const setCurrentPageAC = (currentPage: number) => ({type: SET_CURRENT_PAGE, currentPage} as const)

//types:
export type userType = {
    name: string
    id: number
    photos: UserPhotosType
    status: string | null
    followed: boolean
}
type UserPhotosType = {
    small: string | null
    large: string | null
}
// type InitialStateType = typeof initialState
export type InitialStateType = {
    users: userType[]
    pageSize: number
    totalUsersCount: number
    currentPage: number
}

export type ProfileActionsType =
    | ReturnType<typeof followAC>
    | ReturnType<typeof unFollowAC>
    | ReturnType<typeof setUsersAC>
    | ReturnType<typeof setCurrentPageAC>

