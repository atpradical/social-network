import React from 'react';
import s from './Header.module.css';
import {NavLink} from "react-router-dom";
import {InitialStateType} from "../../redux/auth-reducer";

export const Header: React.FC<HeaderPropsType> = (props) => {

    return (
        <header className={s.header}>
            <img
                src="https://www.creativefabrica.com/wp-content/uploads/2021/03/20/Mountain-logo-Design-Graphics-9785421-1-580x435.png"
                alt="logotype"
            />
            <div className={s.loginBlock}>
                {props.auth.isAuth
                    ? <div>
                        <div className={s.loggedIn}>{props.auth.login}</div>
                        <button onClick={props.logout}>log out</button>
                    </div>
                    : <NavLink to={'/login'}>Please login</NavLink>
                }
            </div>
        </header>
    );
};

//types:
type HeaderPropsType = {
    auth: InitialStateType
    logout: () => void
}