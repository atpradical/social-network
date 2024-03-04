import {MyPosts} from "./MyPosts";
import {AppStateType} from "../../../redux/redux-store";
import {Dispatch} from "redux";
import {connect} from "react-redux";
import {addPostAC, PostsType, updateNewPostTextAC} from "../../../redux/profile-reducer";

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        posts: state.profilePage.posts,
        newPostText: state.profilePage.newPostText
    }
}

const mapDispatchToProps = (dispatch: Dispatch): MapDispatchToPropsType => {
    return {
        addPost: () => {
            dispatch(addPostAC())
        },
        updateNewPostText: (text: string) => {
            dispatch(updateNewPostTextAC(text))
        }
    }
}
export const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)

//types:
type MapStateToPropsType = {
    posts: PostsType[]
    newPostText: string
}

type MapDispatchToPropsType = {
    addPost: () => void
    updateNewPostText: (text: string) => void
}
export type MyPostsPropsType = MapStateToPropsType & MapDispatchToPropsType