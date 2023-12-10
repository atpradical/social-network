import React from 'react';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {StoreType} from "../../redux/store";
import MyPostsContainer from "./MyPost/MyPostsContainer";

type PropsType = {
    store: StoreType
}


const Profile: React.FC<PropsType> = ({store}) => {
    return (
        <div>
            <ProfileInfo/>
            <MyPostsContainer store={store}/>
        </div>
    );
};

export default Profile;