import React, {FC} from 'react';
import {Card, Image, Row, Typography} from "antd";
import {LikeFilled} from '@ant-design/icons';
import userPhoto from '../../../../assets/no-profile-picture-icon.webp'


export const Post: FC<Props> = (props) => {
    return (
        <Card style={{margin: "10px 0", boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.3)"}}>
            <Row justify={"start"} align={"middle"} style={{gap: 20}}>
                <Image style={{borderRadius: 50, width: 50}} preview={false}
                       src={props.photo || userPhoto}/>
                <Typography.Text>{props.message}</Typography.Text>
                <span><LikeFilled/> {props.likesCount}</span>
            </Row>
        </Card>
    );
};

//types:
type Props = {
    message: string
    likesCount: number
    photo: string | null | undefined
}