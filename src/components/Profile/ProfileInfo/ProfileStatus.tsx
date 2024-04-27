import React, {ChangeEvent} from 'react';

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
            <>
                {!this.state.editMode &&
                    <div>
                        <span onDoubleClick={this.activateEditMode}>{this.props.status || '--------'}</span>
                    </div>
                }
                {this.state.editMode &&
                    <div>
                        <input
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

type Props = {
    status: string
    updateUserStatus: (status: string) => void
}

type State = {
    editMode: boolean
    status: string
}

