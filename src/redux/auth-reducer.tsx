import {RESULT_CODE} from "../api/api";
import {BaseThunkType} from "./redux-store";
import {stopSubmit} from "redux-form";
import {authAPI} from "../api/auth-api";
import {securityAPI} from "../api/security-api";

const SET_USER_DATA = 'AUTH/SET-USER-DATA';
const GET_CAPTCHA_URL_SUCCESS = 'AUTH/GET-CAPTCHA-URL-SUCCESS';

const initialState: InitialState = {
    id: null,
    login: null,
    email: null,
    isAuth: false,
    isFetching: false,
    captchaUrl: null  // null -> captcha isn't required.
}

export const authReducer = (state = initialState, action: Actions): InitialState => {
    switch (action.type) {
        case SET_USER_DATA:
            return {...state, ...action.payload}
        case GET_CAPTCHA_URL_SUCCESS:
            return {...state, captchaUrl: action.payload.captchaUrl}
        default:
            return state
    }
}


//actions:
const setAuthUserData = (id: number | null, email: string | null, login: string | null, isAuth: boolean) =>
    ({type: SET_USER_DATA, payload: {id, email, login, isAuth}} as const)

const getCaptchaUrlSuccess = (captchaUrl: string) =>
    ({type: GET_CAPTCHA_URL_SUCCESS, payload: {captchaUrl}} as const)


//thunks:
export const getAuthUserData = (): BaseThunkType<Actions> => async (dispatch) => {
    const response = await authAPI.me()
    if (response.data.resultCode === RESULT_CODE.SUCCESS) {
        const {id, email, login} = response.data.data
        dispatch(setAuthUserData(id, email, login, true))
    }
}
export const login = (email: string, password: string, rememberMe: boolean, captchaValue: string): BaseThunkType<Actions> => async (dispatch) => {
    const response = await authAPI.login(email, password, rememberMe, captchaValue)
    if (response.data.resultCode === RESULT_CODE.SUCCESS) {
        dispatch(getAuthUserData());
        dispatch(getCaptchaUrlSuccess(''))
    } else {
        if (response.data.resultCode === RESULT_CODE.CAPTCHA) {
            dispatch(getCaptchUrl())
        }
        let message = response.data.messages.length > 0 ? response.data.messages[0] : 'Some error occurred...'
        dispatch(stopSubmit('login', {_error: message}))
    }
}

export const getCaptchUrl = (): BaseThunkType<Actions> => async (dispatch) => {
    const response = await securityAPI.getCaptchaUrl()
    const captchaUrl = response.data.url
    dispatch(getCaptchaUrlSuccess(captchaUrl))
}

export const logout = (): BaseThunkType<Actions> => async (dispatch) => {
    const response = await authAPI.logout()
    if (response.data.resultCode === RESULT_CODE.SUCCESS) {
        dispatch(setAuthUserData(null, null, null, false))
    }
}


//types:
export type InitialState = {
    id: number | null
    login: string | null
    email: string | null
    isAuth: boolean
    isFetching: boolean
    captchaUrl: string | null
}
type Actions =
    | ReturnType<typeof setAuthUserData>
    | ReturnType<typeof stopSubmit>