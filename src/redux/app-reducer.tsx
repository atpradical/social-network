import {authAPI, RESULT_CODE} from "../api/api";
import {Dispatch} from "redux";
import {stopSubmit} from "redux-form";
import {getAuthUserData} from "./auth-reducer";
import {ThunkDispatch} from "redux-thunk";
import {AppStateType} from "./redux-store";

const INITIALIZED_SUCCESS = 'SET-SUCCESS';

const initialState = {
    isInitialized: false
}

export const appReducer = (state: InitialStateType = initialState, action: AuthActionsType): InitialStateType => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {...state, ...action.payload}
        default:
            return state
    }
}


//actions:
const initializedSuccess = (isInitialized: boolean) =>
    ({type: INITIALIZED_SUCCESS, payload: {isInitialized}} as const)


//thunks:
export const initializeApp = () => (dispatch: ThunkDispatch<AppStateType, unknown, AuthActionsType>) => {
    const promise = dispatch(getAuthUserData())
    Promise.all([promise])
        .then(() => {
                dispatch(initializedSuccess(true))
            }
        )
}


//types:
export type InitialStateType = {
    isInitialized: boolean
}
type AuthActionsType =
    | ReturnType<typeof initializedSuccess>