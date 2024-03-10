import {authAPI, RESULT_CODE} from "../api/api";
import {Dispatch} from "redux";
import {ThunkDispatch} from "redux-thunk";
import {AppStateType} from "./redux-store";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = 'AUTH/SET-USER-DATA';

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
            return {...state, ...action.payload}
        default:
            return state
    }
}


//actions:
const setAuthUserData = (id: number | null, email: string | null, login: string | null, isAuth: boolean) =>
    ({type: SET_USER_DATA, payload: {id, email, login, isAuth}} as const)


//thunks:
export const getAuthUserData = () => async (dispatch: Dispatch) => {
    //обязательно return для возвращения промиса
    const response = await authAPI.me()
    if (response.data.resultCode === RESULT_CODE.SUCCESS) {
        const {id, email, login} = response.data.data
        dispatch(setAuthUserData(id, email, login, true))
    }
}
export const login = (email: string, password: string, rememberMe: boolean) => async (dispatch: ThunkDispatch<AppStateType, unknown, AuthActionsType>) => {
    //обязательно return для возвращения промиса
    const response = await authAPI.login(email, password, rememberMe)
    if (response.data.resultCode === RESULT_CODE.SUCCESS) {
        dispatch(getAuthUserData());
    } else {
        let message = response.data.messages.length > 0 ? response.data.messages[0] : 'Some error occured...'
        dispatch(stopSubmit('login', {_error: message}))
    }
}
export const logout = () => async (dispatch: ThunkDispatch<AppStateType, unknown, AuthActionsType>) => {
    //обязательно return для возвращения промиса
    const response = await authAPI.logout()
    if (response.data.resultCode === RESULT_CODE.SUCCESS) {
        dispatch(setAuthUserData(null, null, null, false))
    }
}


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
    | ReturnType<typeof stopSubmit>