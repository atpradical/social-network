import React, {ChangeEvent, FC, useState} from 'react';
import s from './ProfileInfo.module.css'
import userPhoto from '../../../assets/no-profile-picture-icon.webp'
import {Preloader} from "../../Common/Preloder/Preloader";
import {ProfileContactsType, UserProfileType} from "../../../api/api";
import {ProfileStatus} from "./ProfileStatus";
import ProfileDataForm, {FormDataType} from "./ProfileDataForm";

export const ProfileInfo: React.FC<ProfileInfoPropsType> = ({
                                                                isOwner,
                                                                profile,
                                                                status,
                                                                updateUserStatus,
                                                                savePhoto,
                                                                saveProfile
                                                            }) => {

    const [editMode, setEditMode] = useState(false);

    if (!profile) {
        return <Preloader/>
    }

    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            savePhoto(e.target.files[0])
        }
    }

    const onSubmit = (formData: FormDataType) => {
        saveProfile(formData).then(() => {
            setEditMode(false)
        })

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

                <ProfileStatus status={status} updateUserStatus={updateUserStatus}/>
                <hr/>

                {editMode
                    ? <ProfileDataForm
                        initialValues={profile}
                        onSubmit={onSubmit}
                        contacts={profile.contacts}
                    />
                    : <ProfileData profile={profile} isOwner={isOwner} setEditMode={setEditMode}/>}
            </div>
            <hr/>
        </div>
    )
        ;
};


const ProfileData: FC<ProfileDataType> = ({profile, setEditMode, isOwner}) => {
    return (
        <div>
            {isOwner && <div>
                <button onClick={() => setEditMode(true)}>Edit</button>
            </div>}
            <span><b>{profile.fullName}</b></span>
            <div><b>About me: </b><span>{profile.aboutMe}</span></div>
            <hr/>
            <div><b>Looking for a job: </b><span>{profile.lookingForAJob ? '⚒️ Yes' : '❌ No'}</span></div>
            <div><b>My skills description: </b><span>{profile.lookingForAJobDescription}</span></div>
            <hr/>
            <div>
                <b>Contacts: </b>{(Object.keys(profile.contacts) as Keys[]).map(key => {
                return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]}/>
            })}
            </div>
        </div>
    )
}


export const Contact: FC<ContactProps> = ({contactTitle, contactValue}) => {
    return <div><b>{contactTitle}: </b><span>{contactValue}</span></div>
}


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
    saveProfile: (profile: FormDataType) => Promise<void>
}

type ContactProps = {
    contactTitle: string
    contactValue: string
}

export type Keys = keyof ProfileContactsType

export type ProfileDataType = {
    profile: UserProfileType
    isOwner: boolean
    setEditMode: (value: boolean) => void
}



