import React from 'react';
import './App.css';
import {Header} from "./components/Header/Header";
import {NavBar} from "./components/NavBar/NavBar";
import {Profile} from "./components/Profile/Profile";
import {Dialogs} from "./components/Dialogs/Dialogs";
import {Route} from "react-router-dom";
import {StateType, updateNewPostText} from "./redux/state";

function App(props: AppPropsType) {

    return (
        <div className="app-wrapper">
            <Header/>
            <NavBar/>
            <div className={'app-wrapper-content'}>
                <Route path={'/dialogs'}
                       render={() => <Dialogs state={props.state.dialogsPage}/>}/>
                <Route path={'/profile'}
                       render={() => <Profile

                           profilePage={props.state.profilePage}
                           addPost={props.addPost}
                           updateNewPostText={props.updateNewPostText}
                       />}/>
            </div>
        </div>
    );
}

export default App;


//types:
type AppPropsType = {
    state: StateType
    addPost: () => void
    updateNewPostText: (newText: string) => void
}