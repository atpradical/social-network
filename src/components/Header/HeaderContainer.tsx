import React from 'react';
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {getAuthUserData, InitialStateType, logout} from "../../redux/auth-reducer";
import {Header} from "./Header";


class HeaderContainer extends React.Component<HeaderContainerPropsType> {
    componentDidMount() {
        this.props.getAuthUserData()
    }

    render() {
        return <Header {...this.props}/>
    }
};

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps, {getAuthUserData, logout} as MapDispatchToPropsType)(HeaderContainer)


//types:
type MapStateToPropsType = {
    auth: InitialStateType
}
type MapDispatchToPropsType = {
    getAuthUserData: () => void
    logout: () => void
}
type HeaderContainerPropsType = MapStateToPropsType & MapDispatchToPropsType

