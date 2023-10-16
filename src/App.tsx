import React from "react";
import './App.css';
import {BrowserRouter, Route} from "react-router-dom";
import Dialogs from "./components/Dialogs/Dialogs";
import Profile from "./components/Profile/Profile";
import Navbar from "./components/Navbar/Navbar";
import Header from "./components/Header/Header";
import Main from "./components/Main";

const someComponent = () => <Dialogs />

const App = (props:any) => {
    return (
        <BrowserRouter>
            <div className={'app-wrapper'}>
                <Header/>
                <Navbar/>
                <div className={'app-wrapper-content'}>
                    {/*<Route path={'/dialogs'} component={Dialogs}/>*/}
                    {/*<Route path={'/profile'} component={Profile}/>*/}
                    <Route path={'/dialogs'} component={ someComponent } />
                    <Route path={'/profile'} render={ () => <Profile />} />
                </div>
                <Main/>
            </div>
        </BrowserRouter>
    );
}

export default App;
