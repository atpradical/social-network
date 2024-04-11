import React from 'react';
import {Profile} from "./Profile";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {getUserProfile, getUserStatus, savePhoto, updateUserStatus} from "../../redux/profile-reducer";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {UserProfileType} from "../../api/api";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";

class ProfileContainer extends React.Component<ProfileContainerPropsType> {

    refreshProfile() {
        let userId: number | null = +this.props.match.params.userId
        if (!userId) {
            userId = this.props.authorizedUserId
        } else if (!userId) {
            this.props.history.push('/login')
        }
        this.props.getUserProfile(userId)
        this.props.getUserStatus(userId)
    }

    componentDidMount() {
        this.refreshProfile()
    }

    componentDidUpdate(prevProps: ProfileContainerPropsType) {
        if (prevProps.match.params.userId !== this.props.match.params.userId) {
            console.log("RENDER componentDidUpdate")
            this.refreshProfile()
        }
    }


    render() {
        return (<Profile {...this.props}
                         isOwner={!this.props.match.params.userId}
                         status={this.props.status}
                         updateUserStatus={this.props.updateUserStatus}
                         savePhoto={this.props.savePhoto}

        />);
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
    connect(mapStateToProps, {getUserProfile, getUserStatus, updateUserStatus, savePhoto} as MapDispatchToPropsType),
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
    getUserProfile: (userId: number | null) => void
    getUserStatus: (userId: number | null) => void
    updateUserStatus: (status: string) => void
    savePhoto: (photoFile: File) => void

}
type ProfileContainerPropsType =
    MapStateToPropsType
    & MapDispatchToPropsType
    & RouteComponentProps<RouterPathParamsType>

