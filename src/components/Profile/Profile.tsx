import React from 'react';
import s from './Profile.module.css';
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {MyPostsContainer} from "./MyPosts/MyPostsContainer";
import {Response, UserProfile} from "../../api/api";
import {FormDataType} from "./ProfileInfo/ProfileDataForm";

export const Profile: React.FC<ProfilePropsType> = (props) => {

    return (
        <div className={s.content}>
            <ProfileInfo
                isOwner={props.isOwner}
                profile={props.profile}
                status={props.status}
                updateUserStatus={props.updateUserStatus}
                savePhoto={props.savePhoto}
                saveProfile={props.saveProfile}
            />
            <MyPostsContainer/>
        </div>
    );
};

// types:
type ProfilePropsType = {
    isOwner: boolean
    profile: UserProfile | null
    status: string
    updateUserStatus: (status: string) => void
    savePhoto: (photoFile: File) => void
    // saveProfile: (profile: FormDataType) => Promise<Response | string | undefined>
    saveProfile: (profile: FormDataType) => Promise<void>
}