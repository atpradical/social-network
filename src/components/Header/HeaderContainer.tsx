import React from 'react';
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {InitialStateType, logout} from "../../redux/auth-reducer";
import {Header} from "./Header";


class HeaderContainer extends React.Component<HeaderContainerPropsType> {
    render() {
        return <Header {...this.props}/>
    }
};

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps, {logout} as MapDispatchToPropsType)(HeaderContainer)


//types:
type MapStateToPropsType = {
    auth: InitialStateType
}
type MapDispatchToPropsType = {
    logout: () => void
}
type HeaderContainerPropsType = MapStateToPropsType & MapDispatchToPropsType

