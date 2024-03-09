import React from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {TextArea} from "../../Common/FormsControl/FromsControls";
import {maxLengthCreator, requiredFiled} from "../../../utils/validators/validators";

const maxLenght50 =  maxLengthCreator(50)

const AddMessageForm:React.FC<InjectedFormProps<MessageFormDataType>> = (props) => {
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
                <button>Send</button>
            </div>
        </form>
    )
}

export const AddMessageFormRedux = reduxForm<MessageFormDataType>({form:"dialogAddMessageForm" })(AddMessageForm)

//types:
export type MessageFormDataType = {
    newMessageBody: string
}