import React, {lazy} from 'react';
import './App.css';
import {BrowserRouter, Route, RouteComponentProps, withRouter} from "react-router-dom";
import ProfileContainer, {RouterPathParamsType} from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";
import {connect, Provider} from "react-redux";
import {compose} from "redux";
import {Preloader} from "./components/Common/Preloder/Preloader";
import {NavBar} from "./components/NavBar/NavBar";
import {AppStateType, store} from "./redux/redux-store";
import {initializeApp} from "./redux/app-reducer";
import UsersContainer from "./components/Users/UsersContainer";
import {withSuspense} from "./hoc/withSuspense";
// import {DialogsContainer} from "./components/Dialogs/DialogsContainer";
const DialogsContainer = lazy(async () => {
    const module = await import("./components/Dialogs/DialogsContainer")
    return {default: module.DialogsContainer}
})


class App extends React.Component<AppPropsTypes> {
    componentDidMount() {
        this.props.initializeApp()
    }

    render(): JSX.Element {
        if (!this.props.initialized) {
            return <Preloader/>
        }
        return (
            <div className="app-wrapper">
                <HeaderContainer/>
                <NavBar/>
                <div className={'app-wrapper-content'}>
                    {/*<Route path={'/dialogs'} render={() => {*/}
                    {/*    return withSuspense( DialogsContainer)*/}
                    {/*    // <React.Suspense fallback={<Preloader/>}>*/}
                    {/*    //     <DialogsContainer/>*/}
                    {/*    // </React.Suspense>*/}
                    {/*}}/> */}
                    <Route path={'/dialogs'} render={
                         withSuspense( DialogsContainer)
                        // <React.Suspense fallback={<Preloader/>}>
                        //     <DialogsContainer/>
                        // </React.Suspense>
                    }/>
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

const AppContainer = compose<React.ComponentType>(
    withRouter,
    connect(mapStateToProps, {initializeApp} as MapDispatchToPropsType))(App)

const SamuraiJSApp = () => {
    return <BrowserRouter>
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    </BrowserRouter>
}

export default SamuraiJSApp

//types:
type MapStateToProps = {
    initialized: boolean
}
type MapDispatchToPropsType = {
    initializeApp: () => void
}

type AppPropsTypes = MapStateToProps & MapDispatchToPropsType & RouteComponentProps<RouterPathParamsType>