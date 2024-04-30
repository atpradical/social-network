import React from 'react';
import {Link} from "react-router-dom";
import {InitialState} from "../../redux/auth-reducer";
import {Avatar, Button, Col, Layout, Row, Typography} from "antd";
import {Logo} from "./Logo";
import userPhoto from "../../assets/no-profile-picture-icon.webp";

export const Header: React.FC<Props> = (props) => {

    const {Header} = Layout;
    const {Text} = Typography;

    return (
        <Header className="header">
            <Row justify="space-around">
                <Logo/>
                <Col>
                    {props.auth.isAuth
                        ? <Row justify="space-between" align="middle" style={{gap: "10px"}}>
                            <Avatar src={props.photo || userPhoto} size={40}/>
                            <Text strong type="success">{props.auth.login}</Text>
                            <Button onClick={props.logout}>Logout</Button>
                        </Row>
                        : <Button>
                            <Link to={'/login'}>Login</Link>
                        </Button>
                    }
                </Col>
            </Row>
        </Header>
    )
};

//types:
type Props = {
    auth: InitialState
    logout: () => void
    photo: string | null | undefined
}