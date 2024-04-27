import React from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Input, TextArea} from "../../Common/FormsControl/FromsControls";
import {ProfileContacts} from "../../../api/api";
import {Keys} from "./ProfileInfo";
import s from "../../Common/FormsControl/FromsControls.module.css";


const ProfileDataForm: React.FC<InjectedFormProps<FormDataType, PropsType> & PropsType> = ({handleSubmit, error, contacts}) => {

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
                <b>Contacts: </b>{(Object.keys(contacts) as Keys[]).map(key => {
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

export default reduxForm<FormDataType, PropsType>({form: "edit-profile"})(ProfileDataForm)


//type:
type PropsType = {
    contacts: ProfileContacts
}

export type FormDataType = {
    fullName: string
    aboutMe: string
    lookingForAJob: boolean
    lookingForAJobDescription: string
    // "facebook": string
    // "website": string
    // "vk": string
    // "twitter": string
    // "instagram": string
    // "youtube": string
    // "github": string
    // "mainLink": string
} & ProfileContacts