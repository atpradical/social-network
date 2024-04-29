import React, {FC, lazy} from 'react';
import './App.css';
import {BrowserRouter, Link, Redirect, Route, RouteComponentProps, Switch, withRouter} from "react-router-dom";
import ProfileContainer, {RouterPathParamsType} from "./components/Profile/ProfileContainer";
import {connect, Provider} from "react-redux";
import {compose} from "redux";
import {Preloader} from "./components/Common/Preloder/Preloader";
import {AppStateType, store} from "./redux/redux-store";
import {initializeApp} from "./redux/app-reducer";
import {withSuspense} from "./hoc/withSuspense";
import {Layout, Menu} from 'antd';
import UsersContainer from "./components/Users/UsersContainer";
import Login from "./components/Login/Login";
import HeaderContainer from "./components/Header/HeaderContainer";

const {Content, Footer, Sider} = Layout;


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
            <Layout style={{minHeight: '100vh'}}>
                <HeaderContainer/>
                <Content style={{padding: '0 50px'}}>
                    <Layout className="site-layout-background" style={{padding: '24px 0', minHeight: '80vh'}}>
                        <Sider className="site-layout-background" width={200}>
                            <Menu mode="inline" defaultSelectedKeys={['1']} style={{height: '100%'}}>
                                <Menu.Item key={'1'}><Link to={'/profile'}>Profile</Link></Menu.Item>
                                <Menu.Item key={'2'}><Link to={'/dialogs'}>Dialogs</Link></Menu.Item>
                                <Menu.Item key={'3'}><Link to={'/users'}>Users</Link></Menu.Item>
                                <Menu.Item key={'4'}><Link to={'/news'}>News</Link></Menu.Item>
                                <Menu.Item key={'5'}><Link to={'/music'}>Music</Link></Menu.Item>
                                <Menu.Item key={'6'}><Link to={'/settings'}>Settings</Link></Menu.Item>
                            </Menu>
                        </Sider>
                        <Content style={{padding: '0 24px', minHeight: 280}}>
                            <Switch>
                                <Route exact path={'/'} render={() => <Redirect to={"/profile"}/>
                                }/>
                                <Route path={'/dialogs'} render={() => <SuspendedDialogs/>}/>
                                <Route path={'/profile/:userId?'} render={() => <ProfileContainer/>}/>
                                <Route path={'/users'} render={() => <UsersContainer/>}/>
                                <Route path={'/login'} render={() => <Login/>}/>
                                <Route path={'*'} render={() => <div>404 Page not found</div>}/>/
                            </Switch>
                        </Content>
                    </Layout>
                </Content>
                <Footer style={{textAlign: 'center'}}>created by Ivan Dolgikh with coffee and love</Footer>
            </Layout>

            // <div className="app-wrapper">
            //     <HeaderContainer/>
            //     <NavBar/>
            //     <div className={'app-wrapper-content'}>
            //         <Switch>
            //             <Route exact path={'/'} render={() => <Redirect to={"/profile"}/>
            //             }/>
            //             <Route path={'/dialogs'} render={() => <SuspendedDialogs/>}/>
            //             <Route path={'/profile/:userId?'} render={() => <ProfileContainer/>}/>
            //             <Route path={'/users'} render={() => <UsersContainer/>}/>
            //             <Route path={'/login'} render={() => <Login/>}/>
            //             <Route path={'*'} render={() => <div>404 Page not found</div>}/>
            //         </Switch>
            //     </div>
            // </div>
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