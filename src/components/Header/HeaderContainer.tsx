import React from 'react';
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {InitialState, logout} from "../../redux/auth-reducer";
import {Header} from "./Header";


class HeaderContainer extends React.Component<HeaderContainerProps> {
    render() {
        return <Header {...this.props}/>
    }
};

const mapStateToProps = (state: AppStateType): MapStateToProps => {
    return {
        auth: state.auth,
        photo: state.profilePage.profile?.photos.small
    }
}

export default connect(mapStateToProps, {logout} as MapDispatchToProps)(HeaderContainer)


//types:
type MapStateToProps = {
    auth: InitialState
    photo: string | null | undefined
}
type MapDispatchToProps = {
    logout: () => void
}
type HeaderContainerProps = MapStateToProps & MapDispatchToProps

