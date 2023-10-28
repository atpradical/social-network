import React from "react";
import './App.css';
import {Route} from "react-router-dom";
import Dialogs from "./components/Dialogs/Dialogs";
import Profile from "./components/Profile/Profile";
import Navbar from "./components/Navbar/Navbar";
import Header from "./components/Header/Header";
import Main from "./components/Main";
import {StateType} from "./redux/state";


type PropsType = {
    state: StateType
}

export const App: React.FC<PropsType> = ({state}) => {

    return (
        <div className={'app-wrapper'}>
            <Header/>
            <Navbar/>
            <div className={'app-wrapper-content'}>
                <Route
                    path={'/dialogs'}
                    render={() =>
                        <Dialogs
                            state={state.dialogsPage}
                        />
                    }/>
                <Route
                    path={'/profile'}
                    render={() =>
                        <Profile
                            state={state.profilePage}
                        />
                    }/>
            </div>
            <Main/>
        </div>
    );
}