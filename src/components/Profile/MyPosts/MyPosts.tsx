import React from 'react';
import {Post} from "./Post/Post";
import {MyPostsPropsType} from "./MyPostsContainer";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {maxLengthCreator, requiredFiled} from "../../../utils/validators/validators";
import {TextArea} from "../../Common/FormsControl/FromsControls";
import {Button, Divider} from "antd";


export const MyPosts = React.memo((props: MyPostsPropsType) => {

    const postsElements = props.posts.map(p => <Post key={p.id} message={p.post} likesCount={p.likesCount}
                                                     photo={props.photo}/>)

    const onAddPost = (formData: AddNewPostFormType) => {
        props.addPost(formData.newPostText)
    }

    return (
        <>
            <Divider orientation={"left"}>My Posts</Divider>
            <AddNewPostFormRedux onSubmit={onAddPost}/>
            {postsElements}
        </>
    )
        ;
});

const maxLenght30 = maxLengthCreator(30)

const AddNewPostForm: React.FC<InjectedFormProps<AddNewPostFormType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <Field
                name={"newPostText"}
                component={TextArea}
                placeholder={"add new post"}
                validate={[requiredFiled, maxLenght30]}
            />
            <Button onClick={props.handleSubmit} type={"primary"}>Submit</Button>
        </form>
    )
}

const AddNewPostFormRedux = reduxForm<AddNewPostFormType>({form: "ProfileAddNewPostForm"})(AddNewPostForm)

//types
type AddNewPostFormType = {
    newPostText: string
}