import React from 'react';
import {Field, InjectedFormProps, reduxForm} from "redux-form";

export const Login = () => {
    const onSubmit = (formData: FormDataType) => {
        console.log(formData)
    }
    return (
        <LoginReduxForm onSubmit={onSubmit}/>
    );
};

const LoginForm:React.FC<InjectedFormProps<FormDataType>> = (props) => {
    return (
        <div>
            <div>
                <h1>Login</h1>
            </div>
            <form onSubmit={props.handleSubmit}>
                <div>
                    <Field type="text" placeholder={'login'} name={'login'} component={'input'}/>
                </div>
                <div>
                    <Field type="password" placeholder={'password'} name={'password'} component={'input'}/>
                </div>
                <div>
                    <label>
                        <Field component={'input'} name={'rememberMe'} type={'checkbox'}/>Remember me
                    </label>
                </div>
                <div>
                    <button type={'submit'}>Send</button>
                </div>
            </form>
        </div>
    );
}

const LoginReduxForm = reduxForm<FormDataType>({form: 'login'})(LoginForm)

//types:
type FormDataType = {
    login: string
    password: string
    rememberMe: boolean
}