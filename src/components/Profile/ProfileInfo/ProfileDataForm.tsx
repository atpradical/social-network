import React from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {CheckBox, Input, TextArea} from "../../Common/FormsControl/FromsControls";
import {ProfileContacts} from "../../../api/api";
import {Keys} from "./ProfileInfo";
import s from "../../Common/FormsControl/FromsControls.module.css";
import {Button, Card, Divider} from "antd";


const ProfileDataForm: React.FC<InjectedFormProps<FormDataType, PropsType> & PropsType> = ({
                                                                                               handleSubmit,
                                                                                               error,
                                                                                               contacts
                                                                                           }) => {

    return (
        <form onSubmit={handleSubmit}>
            <Card style={{backgroundColor: "#dbebfb", boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.3)"}}>
                    <Divider orientation={"left"}>Full Name</Divider>
                    <Field
                        type="text"
                        placeholder={'Full Name'}
                        name={'fullName'}
                        component={Input}
                        validate={[]}
                    />
                    <Divider orientation={"left"}>About me</Divider>
                    <Field
                        type="text"
                        placeholder={'Give some information about yourself'}
                        name={'aboutMe'}
                        component={TextArea}
                        validate={[]}
                    />
                    <Field
                        type="checkbox"
                        name={'lookingForAJob'}
                        component={CheckBox}
                        label={"Looking for a job"}
                    />
                    <Divider orientation={"left"}>My skills description</Divider>
                    <Field
                        type="text"
                        placeholder={'what is your skills?'}
                        name={'lookingForAJobDescription'}
                        component={TextArea}
                        validate={[]}
                    />
                    <Divider orientation={"left"}>Contacts</Divider>
                    {(Object.keys(contacts) as Keys[]).map(key => {
                        return <div key={key}> {key}:
                            <Field
                                type="text"
                                placeholder={"link to your social network page"}
                                name={`contacts.${key}`}
                                component={Input}
                                validate={[]}
                            />
                        </div>
                    })}
                <div style={{marginTop: 20}}>
                    {error && <div className={s.formSummaryError}>{error}</div>}
                    <Button onClick={handleSubmit} type={"primary"}>Save</Button>
                </div>
            </Card>
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
} & ProfileContacts