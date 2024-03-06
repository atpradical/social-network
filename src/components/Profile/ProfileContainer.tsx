import React from 'react';
import {Profile} from "./Profile";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {getUserProfile} from "../../redux/profile-reducer";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {UserProfileType} from "../../api/api";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";

class ProfileContainer extends React.Component<ProfileContainerPropsType> {

    componentDidMount() {
        let userId = this.props.match.params.userId
        if (!userId) userId = '2'
        this.props.getUserProfile(+userId)
    }

    render() {
        return (<Profile {...this.props}/>);
    }
};

const mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
    profile: state.profilePage.profile,
})
// let AuthRedirectComponent = withAuthRedirect<ProfileContainerPropsType>(ProfileContainer)
// const withRouterDataContainerComponent = withRouter<ProfileContainerPropsType, any>(AuthRedirectComponent)
// export default connect(mapStateToProps, {getUserProfile} as MapDispatchToPropsType)(withRouterDataContainerComponent)


export default compose<React.ComponentType>(
    connect(mapStateToProps, {getUserProfile} as MapDispatchToPropsType),
    withRouter,
    withAuthRedirect
)(ProfileContainer)

//types:
export type RouterPathParamsType = {
    userId: string
}
type MapStateToPropsType = {
    profile: UserProfileType | null
}
type MapDispatchToPropsType = {
    getUserProfile: (userId: number) => void

}
type ProfileContainerPropsType =
    MapStateToPropsType
    & MapDispatchToPropsType
    & RouteComponentProps<RouterPathParamsType>

