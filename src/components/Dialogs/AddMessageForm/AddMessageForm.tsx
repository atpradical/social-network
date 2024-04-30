import React, {FC} from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {TextArea} from "../../Common/FormsControl/FromsControls";
import {maxLengthCreator, requiredFiled} from "../../../utils/validators/validators";
import {Button} from "antd";

const maxLenght50 = maxLengthCreator(50)

const AddMessageForm: FC<InjectedFormProps<MessageFormDataType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field
                    name={'newMessageBody'}
                    component={TextArea}
                    placeholder={"enter new message"}
                    validate={[requiredFiled, maxLenght50]}
                />
            </div>
            <div>
                <Button onClick={props.handleSubmit}>Send</Button>
            </div>
        </form>
    )
}

export const AddMessageFormRedux = reduxForm<MessageFormDataType>({form: "dialogAddMessageForm"})(AddMessageForm)

//types:
export type MessageFormDataType = {
    newMessageBody: string
}