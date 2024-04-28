import React from 'react';
import {Link} from "react-router-dom";
import {InitialState} from "../../redux/auth-reducer";
import {Avatar, Button, Col, Layout, Menu, Row, Space, Typography} from "antd";
import {UserOutlined} from "@ant-design/icons";
import {Logo} from "./Logo";

export const Header: React.FC<Props> = (props) => {

    const {Header} = Layout;
    const {Text} = Typography;

    return (
        <Header className="header">
            {/*<div className="logo"/>*/}
            <Row>
                <Logo/>
                <Col span={15}>
                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                        <Menu.Item key={'1'}>nav1</Menu.Item>
                        <Menu.Item key={'2'}>nav1</Menu.Item>
                    </Menu>
                </Col>
                {/*<Col span={4}>*/}
                <Space size={"large"}>
                    {props.auth.isAuth
                        ? <Row justify="space-around" align="middle">
                            <Avatar style={{backgroundColor: '#0a9ae7'}} icon={<UserOutlined/>}/>
                            <Text strong type="success">{props.auth.login}</Text>
                            <Button onClick={props.logout}>Logout</Button>
                        </Row>
                        : <Button>
                            <Link to={'/login'}>Login</Link>
                        </Button>
                    }
                {/*</Col>*/}
                </Space>
            </Row>
        </Header>
    )
};

//types:
type Props = {
    auth: InitialState
    logout: () => void
}