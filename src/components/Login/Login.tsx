import React, {FC} from 'react';
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {CheckBox, Input} from "../Common/FormsControl/FromsControls";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import s from '../Common/FormsControl/FromsControls.module.css'
import {requiredFiled} from "../../utils/validators/validators";
import {AppStateType} from "../../redux/redux-store";
import {login} from "../../redux/auth-reducer";
import {Button, Card, Divider} from "antd";

const Login: FC<LoginPropsType> = ({isAuth, login, captchaUrl}) => {

    const onSubmit = (formData: FormDataType) => {
        const {email, password, rememberMe, captcha} = formData
        console.log('SUBMITFORM : ', captcha)
        login(email, password, rememberMe, captcha)
    }

    if (isAuth) {
        return <Redirect to={'/profile'}/>
    }
    return (
        <LoginReduxForm onSubmit={onSubmit} captchaUrl={captchaUrl}/>
    );
};

const LoginForm: React.FC<InjectedFormProps<FormDataType, LoginFormProps> & LoginFormProps> = ({
                                                                                                   handleSubmit,
                                                                                                   error,
                                                                                                   captchaUrl
                                                                                               }) => {
    return (
        <Card style={{maxWidth: 500, backgroundColor: "lightgray", boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.3)"}}>
            <Divider orientation={"left"}>Login</Divider>
            <form onSubmit={handleSubmit}>
                <div style={{display: "flex", flexDirection: "column", gap: 20}}>
                    <Field
                        type="text"
                        placeholder={'email'}
                        name={'email'}
                        component={Input}
                        validate={[requiredFiled]}
                    />
                    <Field
                        type="password"
                        placeholder={'password'}
                        name={'password'}
                        component={Input}
                        validate={[requiredFiled]}
                    />
                    <Field component={CheckBox} name={'rememberMe'} type={'checkbox'} label={'Remember me'}/>
                    <div>
                        {captchaUrl && <img src={captchaUrl} alt={'captchaUrl'}/>}
                        {captchaUrl &&
                            <Field
                                type="text"
                                placeholder={'enter symbols from image'}
                                name={'captcha'}
                                component={Input}
                                validate={[requiredFiled]}
                            />}
                        {error && <div className={s.formSummaryError}>{error}</div>}</div>
                </div>
                <Button onClick={handleSubmit} type={"primary"}>Login</Button>
            </form>
        </Card>
    );
}
const LoginReduxForm = reduxForm<FormDataType, LoginFormProps>({form: 'login'})(LoginForm)

const mapStateToProps = (state: AppStateType) => {
    return {
        isAuth: state.auth.isAuth,
        captchaUrl: state.auth.captchaUrl
    }
}

export default connect(mapStateToProps, {login} as MapDispatchPropsType)(Login)


//types:
type FormDataType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
}
type MapStateToPropType = {
    captchaUrl: string | null
    isAuth: boolean
}
type MapDispatchPropsType = {
    login: (email: string, password: string, rememberMe: boolean, captchaValue: string) => void
}
type LoginPropsType = MapStateToPropType & MapDispatchPropsType
type LoginFormProps = {
    captchaUrl: string | null
}
