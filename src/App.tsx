import React from 'react';
import './App.css';
import {NavBar} from "./components/NavBar/NavBar";
import {Route, RouteComponentProps, withRouter} from "react-router-dom";
import {DialogsContainer} from "./components/Dialogs/DialogsContainer";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer, {RouterPathParamsType} from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";
import {connect} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./redux/app-reducer";
import {AppStateType} from "./redux/redux-store";
import {Preloader} from "./components/Common/Preloder/Preloader";

class App extends React.Component<AppPropsTypes> {
    componentDidMount() {
        this.props.initializeApp()
    }

    render(): JSX.Element {
        if (!this.props.initialized) {
            return <Preloader />
        }
        return (
            <div className="app-wrapper">
                <HeaderContainer/>
                <NavBar/>
                <div className={'app-wrapper-content'}>
                    <Route path={'/dialogs'} render={() => <DialogsContainer/>}/>
                    <Route path={'/profile/:userId?'} render={() => <ProfileContainer/>}/>
                    <Route path={'/users'} render={() => <UsersContainer/>}/>
                    <Route path={'/login'} render={() => <Login/>}/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: AppStateType): MapStateToProps => {
    return {
        initialized: state.app.isInitialized
    }
}


export default compose<React.ComponentType>(
    withRouter,
    connect(mapStateToProps, {initializeApp} as MapDispatchToPropsType))(App)


//types:
type MapStateToProps = {
    initialized: boolean
}
type MapDispatchToPropsType = {
    initializeApp: () => void
}

type AppPropsTypes = MapStateToProps & MapDispatchToPropsType & RouteComponentProps<RouterPathParamsType>