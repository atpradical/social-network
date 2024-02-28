import React from 'react';
import s from './Header.module.css';

export const Header = () => {
    return (
        <header className={s.header}>
            <img
                src="https://www.creativefabrica.com/wp-content/uploads/2021/03/20/Mountain-logo-Design-Graphics-9785421-1-580x435.png"
                alt="logotype"
            />
        </header>
    );
};