import React from 'react';
import s from './ProfileInfo.module.css'
import userPhoto from '../../../assets/no-profile-picture-icon.webp'
import {Preloader} from "../../Common/Preloader";
import {UserProfileType} from "../../../api/api";
import {ProfileStatus} from "./ProfileStatus";

export const ProfileInfo: React.FC<ProfileInfoType> = (props) => {

    if (!props.profile) {
        return <Preloader/>
    }

    return (
        <div>
            <div>
                <img src="https://images.wallpapershq.com/wallpapers/8175/wallpaper_8175_1920x1080.jpg"
                     alt="picture"/>
            </div>
            <div className={s.descriptionBlock}>
                <div>
                    <img style={largeProfilePhoto} src={props.profile?.photos.large || userPhoto}
                         alt="profile avatar"/>
                </div>
                <span><b>{props.profile.fullName}</b></span>
                <hr/>
                <ProfileStatus/>
                <hr/>
                <div>
                    <div><b>facebook: </b><span>{props.profile.contacts.facebook}</span></div>
                    <div><b>website: </b><span>{props.profile.contacts.website}</span></div>
                    <div><b>vk: </b><span>{props.profile.contacts.vk}</span></div>
                    <div><b>twitter: </b><span>{props.profile.contacts.twitter}</span></div>
                    <div><b>instagram: </b><span>{props.profile.contacts.instagram}</span></div>
                    <div><b>youtube: </b><span>{props.profile.contacts.youtube}</span></div>
                    <div><b>github: </b><span>{props.profile.contacts.github}</span></div>
                    <div><b>mainLink: </b><span>{props.profile.contacts.mainLink}</span></div>
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
type ProfileInfoType = {
    profile: UserProfileType | null
}