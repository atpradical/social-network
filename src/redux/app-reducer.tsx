import {getAuthUserData} from "./auth-reducer";
import {BaseThunkType} from "./redux-store";

const INITIALIZED_SUCCESS = 'APP/SET-SUCCESS';

const initialState: InitialState = {
    isInitialized: false,
    globalError: null
}

export const appReducer = (state = initialState, action: AuthActions): InitialState => {
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
export const initializeApp = (): BaseThunkType<AuthActions, void> => (dispatch) => {
    const promise = dispatch(getAuthUserData())
    Promise.all([promise])
        .then(() => {
                dispatch(initializedSuccess(true))
            }
        )
}


//types:
export type InitialState = {
    isInitialized: boolean
    globalError: string | null
}
type AuthActions =
    | ReturnType<typeof initializedSuccess>