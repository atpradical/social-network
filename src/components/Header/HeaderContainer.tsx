import React from 'react';
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {InitialStateType, setAuthUserData} from "../../redux/auth-reducer";
import {Header} from "./Header";
import {instance} from "../../api/api";


export enum RESULT_CODE {
    SUCCESS = 0,
    FAILED = 1
}

class HeaderContainer extends React.Component<HeaderContainerPropsType> {
    componentDidMount() {
        instance.get<ResponseType<UserAuthType>>(`/auth/me`)
            .then(res => {
                if (res.data.resultCode === RESULT_CODE.SUCCESS) {
                    this.props.setAuthUserData(res.data.data)
                }
            })
    }

    render() {
        return <Header {...this.props}/>
    }
};

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps, {
    setAuthUserData
} as MapDispatchToPropsType)(HeaderContainer)

//types:
type MapStateToPropsType = {
    auth: InitialStateType
}
type MapDispatchToPropsType = {
    setAuthUserData: (data: UserAuthType) => void
}
type HeaderContainerPropsType = MapStateToPropsType & MapDispatchToPropsType

export type ResponseType<T = {}> = {
    data: T
    messages: string[];
    fieldsErrors: string[];
    resultCode: number;
}

export type UserAuthType = {
    id: number;
    email: string;
    login: string;
}