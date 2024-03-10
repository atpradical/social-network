import React, {FC} from 'react';
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Input} from "../Common/FormsControl/FromsControls";
import {requiredFiled} from "../../utils/validators/validators";
import {connect} from "react-redux";
import {login} from "../../redux/auth-reducer";
import {Redirect} from "react-router-dom";
import {AppStateType} from "../../redux/redux-store";
import s from '../Common/FormsControl/FromsControls.module.css'

const Login: FC<LoginPropsType> = (props) => {
    const onSubmit = (formData: LoginFormDataType) => {
        console.log(formData)
        const {email, password, rememberMe} = formData
        props.login(email, password, rememberMe)
    }

    if (props.isAuth) {
        return <Redirect to={'/profile'}/>
    }
    return (
        <LoginReduxForm onSubmit={onSubmit}/>
    );
};

const LoginForm: React.FC<InjectedFormProps<LoginFormDataType>> = ({
                                                                       handleSubmit,
                                                                       error,
                                                                   }) => {
    return (
        <div>
            <div>
                <h1>Login</h1>
            </div>
            <form onSubmit={handleSubmit}>
                <div>
                    <Field
                        type="text"
                        placeholder={'email'}
                        name={'email'}
                        component={Input}
                        validate={[requiredFiled]}
                    />
                </div>
                <div>
                    <Field
                        type="password"
                        placeholder={'password'}
                        name={'password'}
                        component={Input}
                        validate={[requiredFiled]}
                    />
                </div>
                <div>
                    <label>
                        <Field component={Input} name={'rememberMe'} type={'checkbox'}/>Remember me
                    </label>
                </div>
                {error && <div className={s.formSummaryError}>{error}</div>}
                <div>
                    <button type={'submit'}>Login</button>
                </div>
            </form>
        </div>
    );
}

const LoginReduxForm = reduxForm<LoginFormDataType>({form: 'login'})(LoginForm)

const mapStateToProps = (state: AppStateType) => {
    return {
        isAuth: state.auth.isAuth
    }
}

export default connect(mapStateToProps, {login} as MapDispatchPropsType)(Login)


//types:
type LoginFormDataType = {
    email: string
    password: string
    rememberMe: boolean
}
type MapStateToPropType = {
    isAuth: boolean
}
type MapDispatchPropsType = {
    login: (email: string, password: string, rememberMe: boolean) => void
}
type LoginPropsType = MapStateToPropType & MapDispatchPropsType
