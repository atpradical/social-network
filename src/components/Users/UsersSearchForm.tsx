import {Form, Formik} from "formik";
import React, {FC} from "react";
import {Filter} from "../../redux/users-reducer";
import {Row} from "antd";
import {SearchOutlined} from '@ant-design/icons';
import {Input, Select, SubmitButton} from "formik-antd";

const usersSearchFormValidate = (values: any) => {
    const errors = {};
}
export const UsersSearchForm: FC<UsersSearchForm> = (props) => {

    const submit = (values: Filter, {setSubmitting}: { setSubmitting: (isSubmitting: boolean) => void }) => {
        props.onFilterChanged(values)
        setSubmitting(false)
    }

    return <div>
        <Formik initialValues={{term: '', friend: null}} validate={usersSearchFormValidate} onSubmit={submit}>
            <Form>
                <Row justify={"start"} style={{gap: 10}}>
                    <Input name="term" placeholder="search friends" style={{width: '50%'}}/>
                    <Select name="friend" defaultValue="All" style={{width: 120}}
                            options={[
                                {value: 'null', label: 'All',},
                                {value: 'true', label: 'Only followed',},
                                {value: 'false', label: 'Only unfollowed',},
                            ]}/>
                    <SubmitButton type="primary" shape="circle" icon={<SearchOutlined/>}/>
                </Row>
            </Form>
        </Formik>

    </div>
}

//types:
type UsersSearchForm = {
    onFilterChanged: (filter: Filter) => void
}