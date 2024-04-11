import React, {ChangeEvent} from 'react';
import s from './ProfileInfo.module.css'
import userPhoto from '../../../assets/no-profile-picture-icon.webp'
import {Preloader} from "../../Common/Preloder/Preloader";
import {UserProfileType} from "../../../api/api";
import {ProfileStatus} from "./ProfileStatus";

export const ProfileInfo: React.FC<ProfileInfoPropsType> = ({isOwner,
                                                                profile,
                                                                status,
                                                                updateUserStatus,
                                                                savePhoto
}) => {

    if (!profile) {
        return <Preloader/>
    }

    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            savePhoto(e.target.files[0])
        }
    }

    return (
        <div>
            <div>
                <img src="https://images.wallpapershq.com/wallpapers/8175/wallpaper_8175_1920x1080.jpg"
                     alt="picture"/>
            </div>
            <div className={s.descriptionBlock}>
                <div>
                    <img style={largeProfilePhoto} src={profile?.photos.large || userPhoto}
                         alt="profile avatar"/>
                    <div>{isOwner && <input type={"file"} onChange={onMainPhotoSelected}/>}</div>
                </div>
                <span><b>{profile.fullName}</b></span>
                <hr/>
                <ProfileStatus status={status} updateUserStatus={updateUserStatus}/>
                <hr/>
                <div>
                    <div><b>facebook: </b><span>{profile.contacts.facebook}</span></div>
                    <div><b>website: </b><span>{profile.contacts.website}</span></div>
                    <div><b>vk: </b><span>{profile.contacts.vk}</span></div>
                    <div><b>twitter: </b><span>{profile.contacts.twitter}</span></div>
                    <div><b>instagram: </b><span>{profile.contacts.instagram}</span></div>
                    <div><b>youtube: </b><span>{profile.contacts.youtube}</span></div>
                    <div><b>github: </b><span>{profile.contacts.github}</span></div>
                    <div><b>mainLink: </b><span>{profile.contacts.mainLink}</span></div>
                </div>
                <hr/>
            </div>
        </div>
    );
};

//inline-styles:
const largeProfilePhoto = {
    width: '300px',
    height: '300px',
    border: '1px solid dimgrey',
    borderRadius: '5%'
}

//types:
type ProfileInfoPropsType = {
    isOwner: boolean
    profile: UserProfileType | null
    status: string
    updateUserStatus: (status: string) => void
    savePhoto: (photoFile: File) => void
}