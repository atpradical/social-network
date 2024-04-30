import React, {FC} from 'react';
import userPhoto from "../../assets/no-profile-picture-icon.webp";
import {Link} from "react-router-dom";
import {UserType} from "../../redux/users-reducer";
import {Avatar, Button, Card, Row} from 'antd';

const {Meta} = Card;

export const User: FC<Props> = ({user, followingInProgress, follow, unFollow}) => {

    return (
        <>
            <Card style={{width: 300, boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.3)", margin: 10}}>
                <Link to={`/profile/${user.id}`}>
                    <Row align={"middle"} style={{columnGap: 15, marginBottom: 10}}>
                        <Meta
                            avatar={<Avatar src={user.photos.small || userPhoto} size={72}/>}
                            title={user.name}
                            description={user.status}
                        />
                    </Row>
                </Link>
                {
                    user.followed
                        ? <Button
                            style={{borderRadius: 3}}
                            type="primary"
                            disabled={followingInProgress.some(id => id === user.id)}
                            onClick={() => {
                                unFollow(user.id)
                            }}> Unfollow
                        </Button>
                        : <Button
                            style={{borderRadius: 3}}
                            disabled={followingInProgress.some(id => id === user.id)}
                            onClick={() => {
                                follow(user.id)
                            }}>Follow
                        </Button>
                }
            </Card>
        </>)
};

//types:
type Props = {
    user: UserType
    followingInProgress: number[]
    follow: (userId: number) => void
    unFollow: (userId: number) => void
}