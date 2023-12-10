import React from "react";
import './App.css';
import {Route} from "react-router-dom";
import Profile from "./components/Profile/Profile";
import Navbar from "./components/Navbar/Navbar";
import Header from "./components/Header/Header";
import Main from "./components/Main";
import {StoreType} from "./redux/store";
import DialogsContainer from "./components/Dialogs/DialogsContainer";


type PropsType = {
    store: StoreType
}

export const App: React.FC<PropsType> = ({store}) => {

    return (
        <div className={'app-wrapper'}>
            <Header/>
            <Navbar/>
            <div className={'app-wrapper-content'}>
                <Route
                    path={'/dialogs'}
                    render={() => <DialogsContainer />}/>
                <Route
                    path={'/profile'}
                    render={() => <Profile store={store}/>}/>
            </div>
            <Main/>
        </div>
    );
}