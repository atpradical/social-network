import React, {ChangeEvent} from 'react';

export class ProfileStatus extends React.Component<ProfileStatusPropsType, ProfileStatusStateType> {
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

    // statusInputRef = React.createRef<HTMLInputElement>()
    onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({status: e.currentTarget.value})
    }

    // componentDidUpdate(prevProps: Readonly<ProfileStatusPropsType>, prevState: Readonly<ProfileStatusStateType>) {
    //     console.log(prevProps)
    //     console.log(this.state)
    //     // if (prevProps.status !== this.state.status) {
    //     //     this.setState({status: this.state.status})
    //     // }
    // }

    render() {
        return (
            <>
                {!this.state.editMode &&
                    <div>
                        <span onDoubleClick={this.activateEditMode}>{this.props.status || '--------'}</span>
                    </div>
                }
                {this.state.editMode &&
                    <div>
                        <input
                            // ref={this.statusInputRef}
                            onChange={this.onStatusChange}
                            value={this.state.status}
                            onBlur={this.deactivateEditMode}
                            autoFocus
                        />
                    </div>
                }
            </>
        );
    }
};

type ProfileStatusPropsType = {
    status: string
    updateUserStatus: (status: string) => void
}

type ProfileStatusStateType = {
    editMode: boolean
    status: string
}

