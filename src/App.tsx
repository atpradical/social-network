import React from "react";
import './App.css';
import {Route} from "react-router-dom";
import Dialogs from "./components/Dialogs/Dialogs";
import Profile from "./components/Profile/Profile";
import Navbar from "./components/Navbar/Navbar";
import Header from "./components/Header/Header";
import Main from "./components/Main";
import {StoreType} from "./redux/state";


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
                    render={() => <Dialogs store={store}/>}/>
                <Route
                    path={'/profile'}
                    render={() => <Profile
                        state={store._state}
                        dispatch={store.dispatch.bind(store)}
                    />}/>
            </div>
            <Main/>
        </div>
    );
}