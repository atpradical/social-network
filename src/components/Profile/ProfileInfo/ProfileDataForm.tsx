import React, {FC} from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Input, TextArea} from "../../Common/FormsControl/FromsControls";
import {UserProfileType} from "../../../api/api";
import {Keys} from "./ProfileInfo";
import s from "../../Common/FormsControl/FromsControls.module.css";


const ProfileDataForm: FC<ProfileDataFormType> = ({profile, handleSubmit, error}) => {

    return (
        <form onSubmit={handleSubmit}>
            {<div>
                <button>Save</button>
            </div>}
            <div>
                <b>Full Name: </b>
                <Field
                    type="text"
                    placeholder={'Full Name'}
                    name={'fullName'}
                    component={Input}
                    validate={[]}
                />
            </div>
            <div><b>About me: </b>
                <Field
                    type="text"
                    placeholder={'Give some information about yourself'}
                    name={'aboutMe'}
                    component={TextArea}
                    validate={[]}
                />
            </div>
            <hr/>
            <div>
                <b>Looking for a job: </b>
                <Field
                    type="checkbox"
                    name={'lookingForAJob'}
                    component={Input}
                />
            </div>
            <div>
                <b>My skills description: </b>
                <Field
                    type="text"
                    placeholder={'what is your skills?'}
                    name={'lookingForAJobDescription'}
                    component={TextArea}
                    validate={[]}
                />
            </div>
            <hr/>
            {error && <div className={s.formSummaryError}>{error}</div>}
            <div>
                <b>Contacts: </b>{(Object.keys(profile.contacts) as Keys[]).map(key => {
                // return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]}/>
                return <div key={key}> {key}:
                    <Field
                        type="text"
                        placeholder={key}
                        name={`contacts.${key}`}
                        component={Input}
                        validate={[]}
                    />
                </div>
            })}
            </div>
        </form>
    )
}

// @ts-ignore //todo fix types
const ProfileDataFormReduxForm = reduxForm<EditProfileFormDataType, ProfileDataFormType, any>({form: 'edit-profile'})(ProfileDataForm)


//type:
type ProfileDataFormType = {
    profile: UserProfileType
    setEditMode: (value: boolean) => void
    onClick: (formData: EditProfileFormDataType) => void
} & InjectedFormProps<ProfileDataFormType>

export type EditProfileFormDataType = {
    fullName: string
    aboutMe: string
    lookingForAJob: boolean
    lookingForAJobDescription: string
    //todo: check if it to get contacts types here automatically?
    "contacts.facebook": string
    "contacts.website": string
    "contacts.vk": string
    "contacts.twitter": string
    "contacts.instagram": string
    "contacts.youtube": string
    "contacts.github": string
    "contacts.mainLink": string
}

export default ProfileDataFormReduxForm
