import React, {ChangeEvent} from 'react';
import {Input, Typography} from 'antd';

const {Text} = Typography;

export class ProfileStatus extends React.Component<Props, State> {

    state = {
        editMode: false,
        status: this.props.status
    }
    activateEditMode = () => {
        this.setState({editMode: true})
    }

    deactivateEditMode = () => {
        this.setState({editMode: false})
        this.props?.updateUserStatus?.(this.state.status)
    }

    onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({status: e.currentTarget.value})
    }

    render() {
        return (
            <div>
                {!this.state.editMode &&

                    <Text type={"success"} onClick={this.activateEditMode}>{this.props.status || '--------'}</Text>
                }
                {this.state.editMode &&
                    <Input placeholder="Basic usage"
                           onChange={this.onStatusChange}
                           value={this.state.status}
                           onBlur={this.deactivateEditMode}
                           autoFocus/>
                }
            </div>
        );
    }
};

type Props = {
    status: string
    updateUserStatus: (status: string) => void
}

type State = {
    editMode: boolean
    status: string
}

