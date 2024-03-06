import {authAPI, RESULT_CODE, UserAuthType} from "../api/api";
import {Dispatch} from "redux";

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
const setAuthUserData = (data: UserAuthType) =>
    ({type: SET_USER_DATA, data} as const)


//thunks:
export const getAuthUserData = () => (dispatch:Dispatch)=>{
    //обязательно return для возвращения промиса
  return authAPI.me()
        .then(res => {
            if (res.data.resultCode === RESULT_CODE.SUCCESS) {
                dispatch(setAuthUserData(res.data.data))
            }
        })
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