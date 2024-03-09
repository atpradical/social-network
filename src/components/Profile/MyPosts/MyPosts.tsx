import React from 'react';
import s from './MyPosts.module.css';
import {Post} from "./Post/Post";
import {MyPostsPropsType} from "./MyPostsContainer";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {maxLengthCreator, requiredFiled} from "../../../utils/validators/validators";
import {TextArea} from "../../Common/FormsControl/FromsControls";

export const MyPosts: React.FC<MyPostsPropsType> = (props) => {

    const postsElements = props.posts.map(p => <Post key={p.id} message={p.post} likesCount={p.likesCount}/>)

    const onAddPost = (formData: AddNewPostFormType) => {
        props.addPost(formData.newPostText)
    }

    return (
        <div className={s.postsBlock}>
            <h3>My Posts</h3>
            <AddNewPostFormRedux onSubmit={onAddPost}/>
            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    )
        ;
};

const maxLenght30 =  maxLengthCreator(30)

const AddNewPostForm: React.FC<InjectedFormProps<AddNewPostFormType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field
                    name={"newPostText"}
                    component={TextArea}
                    placeholder={"add new post"}
                    validate={[requiredFiled, maxLenght30]}
                />
            </div>
            <div>
                <button type={"submit"}>Add Post</button>
            </div>
        </form>
    )
}

const AddNewPostFormRedux = reduxForm<AddNewPostFormType>({form:"ProfileAddNewPostForm"})(AddNewPostForm)


//types
type AddNewPostFormType = {
    newPostText: string
}