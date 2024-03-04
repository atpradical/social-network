import React from 'react';
import {Profile} from "./Profile";
import {ProfilePhotosType, toggleIsFetching} from "../../redux/users-reducer";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {setUserProfile} from "../../redux/profile-reducer";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {instance} from "../../api/api";

class ProfileContainer extends React.Component<ProfileContainerPropsType> {

    componentDidMount() {
        let userId = this.props.match.params.userId
        if(!userId) {
            userId = '2'
        }
        this.props.toggleIsFetching(true)
        instance.get<UserProfileType>(`/profile/` + userId)
            .then(res => {
                this.props.setUserProfile(res.data)
            })
    }

    render() {
        return (<Profile {...this.props}/>);
    }
};

const mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
    profile: state.profilePage.profile
})

const withRouterDataContainerComponent = withRouter(ProfileContainer)

export default connect(mapStateToProps, {setUserProfile, toggleIsFetching} as MapDispatchToPropsType)(withRouterDataContainerComponent)


//types:
type RouterPathParamsType = {
    userId: string
}

type MapStateToPropsType = {
    profile: UserProfileType | null
}
type MapDispatchToPropsType = {
    setUserProfile: (profile: UserProfileType) => void
    toggleIsFetching: (isFetching: boolean) => void
}
type ProfileContainerPropsType = MapStateToPropsType & MapDispatchToPropsType & RouteComponentProps<RouterPathParamsType>

export type UserProfileType = {
    aboutMe: string;
    contacts: ProfileContactsType;
    lookingForAJob: boolean;
    lookingForAJobDescription: string;
    fullName: string;
    userId: number;
    photos: ProfilePhotosType;
}
export type ProfileContactsType = {
    facebook: string;
    website: string;
    vk: string;
    twitter: string;
    instagram: string;
    youtube: string;
    github: string;
    mainLink: string;
}