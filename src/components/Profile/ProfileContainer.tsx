import React from 'react';
import {Profile} from "./Profile";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {getUserProfile, getUserStatus, savePhoto, saveProfile, updateUserStatus} from "../../redux/profile-reducer";
import {RouteComponentProps, withRouter} from "react-router-dom";
import { UserProfile} from "../../api/api";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import {FormDataType} from "./ProfileInfo/ProfileDataForm";

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
                         saveProfile={this.props.saveProfile}

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
// export default connect(mapStateToProps, {getUserProfile} as MapDispatchToProps)(withRouterDataContainerComponent)
export default compose<React.ComponentType>(
    connect(mapStateToProps, {getUserProfile, getUserStatus, updateUserStatus, savePhoto, saveProfile: saveProfile as any} as MapDispatchToPropsType),
    withRouter,
    withAuthRedirect
)(ProfileContainer)

//types:
export type RouterPathParamsType = {
    userId: string
}
type MapStateToPropsType = {
    profile: UserProfile | null
    status: string
    authorizedUserId: number | null
    isAuth: boolean
}
type MapDispatchToPropsType = {
    getUserProfile: (userId: number | null) => void
    getUserStatus: (userId: number | null) => void
    updateUserStatus: (status: string) => void
    savePhoto: (photoFile: File) => void
    // saveProfile: (profile: FormDataType) => (...args: any) => Promise<Response | string | undefined>
    saveProfile: (profile: FormDataType) => Promise<void>

}
type ProfileContainerPropsType =
    MapStateToPropsType
    & MapDispatchToPropsType
    & RouteComponentProps<RouterPathParamsType>

