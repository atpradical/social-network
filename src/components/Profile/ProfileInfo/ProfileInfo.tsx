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
                    <Card style={{borderRadius: 20, opacity: 0.85, border: "1px solid grey"}}>
                        <Row justify={"start"} align={"middle"} style={{gap: 20}}>
                            <Image style={largeProfilePhoto} preview={false}
                                   src={profile?.photos.large || userPhoto}/>
                            <Typography>
                                <Title level={3}>{profile.fullName}</Title>
                                <ProfileStatus status={status} updateUserStatus={updateUserStatus}/>
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
                    : <ProfileData profile={profile} isOwner={isOwner} setEditMode={setEditMode}/>}
            </div>
        </div>
    )
        ;
};


const ProfileData: FC<ProfileDataType> = ({profile, setEditMode, isOwner}) => {
    return (
        <Row style={{gap: 10}}>
            <Card style={cardStyle}>
                <Divider orientation="left">About me:</Divider>
                <Paragraph>{profile.aboutMe}</Paragraph>
                <Paragraph><b>Looking for a job: </b>{profile.lookingForAJob ? '⚒️ Yes' : '❌ No'}</Paragraph>
                <Paragraph><b>My skills description: </b>{profile.lookingForAJobDescription}</Paragraph>

            </Card>
            <Card style={cardStyle}>
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
    backgroundColor: "#E6F7FF",
    borderRadius: 20,
    opacity: 0.85,
    border: "1px solid grey",
    width: "30%"
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
    isOwner: boolean
    setEditMode: (value: boolean) => void
}



