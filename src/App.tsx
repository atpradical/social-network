import React, {FC, lazy} from 'react';
import './App.css';
import {BrowserRouter, Redirect, Route, RouteComponentProps, Switch, withRouter} from "react-router-dom";
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


const DialogsContainer = lazy(async () => {
    const module = await import("./components/Dialogs/DialogsContainer")
    return {default: module.DialogsContainer}
})

const SuspendedDialogs = withSuspense(DialogsContainer)


class App extends React.Component<AppPropsTypes> {

    catchAllUnhandledErrors = (e: PromiseRejectionEvent) => {
        alert("Some error occured")
        console.error(e)
    }

    componentDidMount() {
        this.props.initializeApp()
        window.addEventListener('unhandledrejection', this.catchAllUnhandledErrors)
    }

    componentWillUnmount() {
        window.removeEventListener('unhandledrejection', this.catchAllUnhandledErrors)
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
                    <Switch>
                        <Route exact path={'/'} render={() => <Redirect to={"/profile"}/>
                        }/>
                        <Route path={'/dialogs'} render={() => <SuspendedDialogs/>}/>
                        <Route path={'/profile/:userId?'} render={() => <ProfileContainer/>}/>
                        <Route path={'/users'} render={() => <UsersContainer/>}/>
                        <Route path={'/login'} render={() => <Login/>}/>
                        <Route path={'*'} render={() => <div>404 Page not found</div>}/>
                    </Switch>
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

const AppContainer = compose<React.ComponentType>(withRouter,
    connect(mapStateToProps, {initializeApp} as MapDispatchToPropsType))(App)


//todo: change surround to <HashRouter>
const SamuraiJSApp: FC = () => {
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