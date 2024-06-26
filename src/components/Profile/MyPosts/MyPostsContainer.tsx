import {MyPosts} from "./MyPosts";
import {AppStateType} from "../../../redux/redux-store";
import {Dispatch} from "redux";
import {connect} from "react-redux";
import {addPostAC, Posts} from "../../../redux/profile-reducer";

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        posts: state.profilePage.posts,
        photo: state.profilePage.profile?.photos.small
    }
}

const mapDispatchToProps = (dispatch: Dispatch): MapDispatchToPropsType => {
    return {
        addPost: (newPostText: string) => {
            dispatch(addPostAC(newPostText))
        }
    }
}
export const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)

//types:
type MapStateToPropsType = {
    posts: Posts[]
    photo: string | null | undefined
}

type MapDispatchToPropsType = {
    addPost: (newPostText: string) => void
}
export type MyPostsPropsType = MapStateToPropsType & MapDispatchToPropsType