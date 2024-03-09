import React from 'react';
import {Profile} from "./Profile";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {getUserProfile, getUserStatus, updateUserStatus} from "../../redux/profile-reducer";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {UserProfileType} from "../../api/api";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";

class ProfileContainer extends React.Component<ProfileContainerPropsType> {

    componentDidMount() {
        let userId = +this.props.match.params.userId
        if (!userId && this.props.isAuth) userId = this.props.authorizedUserId!
        this.props.getUserProfile(userId)
        this.props.getUserStatus(userId)
    }

    render() {
        return (<Profile {...this.props} status={this.props.status} updateUserStatus={this.props.updateUserStatus}/>);
    }
};

const mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.id,
    isAuth: state.auth.isAuth
})
// let AuthRedirectComponent = withAuthRedirect<ProfileContainerPropsType>(ProfileContainer)
// const withRouterDataContainerComponent = withRouter<ProfileContainerPropsType, any>(AuthRedirectComponent)
// export default connect(mapStateToProps, {getUserProfile} as MapDispatchToPropsType)(withRouterDataContainerComponent)
export default compose<React.ComponentType>(
    connect(mapStateToProps, {getUserProfile, getUserStatus, updateUserStatus} as MapDispatchToPropsType),
    withRouter,
    withAuthRedirect
)(ProfileContainer)

//types:
export type RouterPathParamsType = {
    userId: string
}
type MapStateToPropsType = {
    profile: UserProfileType | null
    status: string
    authorizedUserId: number | null
    isAuth: boolean
}
type MapDispatchToPropsType = {
    getUserProfile: (userId: number) => void
    getUserStatus: (userId: number) => void
    updateUserStatus: (status: string) => void

}
type ProfileContainerPropsType =
    MapStateToPropsType
    & MapDispatchToPropsType
    & RouteComponentProps<RouterPathParamsType>

