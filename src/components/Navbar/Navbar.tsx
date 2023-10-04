import React from 'react';
import {NavLink} from "react-router-dom";
import s from './Navbar.module.css'

const Navbar = () => {
    return (
        <nav className={s.nav}>
            <div className={s.item}>
                <NavLink to="/profile" activeClassName={s.active}>Profile</NavLink>
            </div>
            <div className={`${s.item} ${s.active}`}>
                <NavLink to="/dialogs" activeClassName={s.active}>Messages</NavLink>
            </div>
            <div>
                <a href="src/components/Navbar/Navbar">News</a>
            </div>
            <div>
                <a href="src/components/Navbar/Navbar">Music</a>
            </div>
            <div>
                <a href="src/components/Navbar/Navbar">Settings</a>
            </div>
        </nav>
    );
};

export default Navbar;