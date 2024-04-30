import React, {ChangeEvent, FC, useState} from 'react';
import s from './ProfileInfo.module.css'
import userPhoto from '../../../assets/no-profile-picture-icon.webp'
import {Preloader} from "../../Common/Preloder/Preloader";
import {ProfileContacts, UserProfile} from "../../../api/api";
import {ProfileStatus} from "./ProfileStatus";
import ProfileDataForm, {FormDataType} from "./ProfileDataForm";
import {Button, Card, Divider, Image, Row, Typography} from "antd";

const {Title, Text, Paragraph} = Typography;

export const ProfileInfo: React.FC<ProfileInfoPropsType> = ({
                                                                isOwner, profile, status, updateUserStatus,
                                                                savePhoto, saveProfile
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
            <div className={s.descriptionBlock}>
                <div className={s.profileBackground}>
                    <Card style={{opacity: 0.85, boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.3)"}}>
                        <Row justify={"start"} align={"middle"} style={{gap: 20}} wrap={false}>
                            <Image style={largeProfilePhoto} preview={false}
                                   src={profile?.photos.large || userPhoto}/>
                            <Typography>
                                <Title level={3}>{profile.fullName}</Title>
                                <ProfileStatus status={status} updateUserStatus={updateUserStatus}/>
                                <Paragraph>{profile.aboutMe}</Paragraph>
                            </Typography>
                        </Row>
                        {isOwner && <>
                            <Divider/>
                            <Button onClick={() => setEditMode(true)}>Edit profile</Button>
                            <input type={"file"} onChange={onMainPhotoSelected}/>
                        </>}
                    </Card>
                </div>
                {editMode
                    ? <ProfileDataForm
                        initialValues={profile}
                        onSubmit={onSubmit}
                        contacts={profile.contacts}
                    />
                    : <ProfileData profile={profile}/>}
            </div>
        </div>
    )
        ;
};


const ProfileData: FC<ProfileDataType> = ({profile}) => {
    return (
        <Row>
            <Card style={cardStyle}>
                <Paragraph><b>Looking for a job: </b>{profile.lookingForAJob ? '⚒️ Yes' : '❌ No'}</Paragraph>
                <Paragraph><b>My skills description: </b>{profile.lookingForAJobDescription}</Paragraph>
                <Divider orientation="left">Contacts</Divider>
                {(Object.keys(profile.contacts) as Keys[]).map(key => {
                    return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]}/>
                })}
            </Card>
        </Row>
    )
}


export const Contact: FC<ContactProps> = ({contactTitle, contactValue}) => {
    return <Paragraph><b>{contactTitle}: </b><Text>{contactValue}</Text></Paragraph>
}


//inline-styles:
const largeProfilePhoto = {
    width: '200px',
    height: '200px',
    borderRadius: '50%'
}

const cardStyle = {
    margin: "10px",
    opacity: 0.85,
    boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.3)"
}

//types:
type ProfileInfoPropsType = {
    isOwner: boolean
    profile: UserProfile | null
    status: string
    updateUserStatus: (status: string) => void
    savePhoto: (photoFile: File) => void
    saveProfile: (profile: FormDataType) => Promise<void>
}

type ContactProps = {
    contactTitle: string
    contactValue: string
}

export type Keys = keyof ProfileContacts

export type ProfileDataType = {
    profile: UserProfile
}



