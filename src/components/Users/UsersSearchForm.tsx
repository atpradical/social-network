import {Field, Form, Formik, FormikHelpers} from "formik";
import React, {FC} from "react";
import {Filter} from "../../redux/users-reducer";

const usersSearchFormValidate = (values: any) => {
    const errors = {};
    // if (!values.email) {
    //     errors.email = 'Required';
    // } else if (
    //     !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
    // ) {
    //     errors.email = 'Invalid email address';
    // }
    // return errors;
}
export const UsersSearchForm: FC<UsersSearchForm> = (props) => {

    const submit = (values: Filter, {setSubmitting}: {setSubmitting: (isSubmitting: boolean)=>void} ) => {
        // setTimeout(() => {
        //     alert(JSON.stringify(values, null, 2));
        //     setSubmitting(false);
        // }, 400);

        props.onFilterChanged(values)
        setSubmitting(false)


    }

    return <div>
        <Formik
            initialValues={{term: '', friend: null}}
            validate={usersSearchFormValidate}
            onSubmit={submit}
        >
            {({isSubmitting}) => (
                <Form>
                    <Field type="text" name="term"/>
                    <Field name="friend" as="select">
                        <option value="null">All</option>
                        <option value="true">Only followed</option>
                        <option value="false">Only unfollowed</option>
                    </Field>
                    <button type="submit" disabled={isSubmitting}>
                        Find
                    </button>
                </Form>
            )}
        </Formik>

    </div>
}

//types:
type UsersSearchForm = {
    onFilterChanged: (filter: Filter) => void
}