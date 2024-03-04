import {UserAuthType} from "../components/Header/HeaderContainer";

const SET_USER_DATA = 'SET-USER-DATA';

const initialState = {
    id: null,
    login: null,
    email: null,
    isAuth: false,
    isFetching: false
}

export const authReducer = (state: InitialStateType = initialState, action: AuthActionsType): InitialStateType => {
    switch (action.type) {
        case SET_USER_DATA:
            return {...state, ...action.data, isAuth: true}
        default:
            return state
    }
}
//actions:
export const setAuthUserData = (data: UserAuthType) =>
    ({type: SET_USER_DATA, data} as const)

//types:
export type InitialStateType = {
    id: number | null
    login: string | null
    email: string | null
    isAuth: boolean
    isFetching: boolean
}

type AuthActionsType =
    | ReturnType<typeof setAuthUserData>