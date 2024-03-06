import React from 'react';

export class ProfileStatus extends React.Component<ProfileStatusPropsType, ProfileStatusStateType> {
    state = {
        editMode: false
    }
    activateEditMode = () => {
        this.setState({editMode: true})
    }

    deactivateEditMode = () => {
        this.setState({editMode: false})
    }

    render() {

        return (
            <>
                {!this.state.editMode &&
                    <div>
                        <span onDoubleClick={this.activateEditMode.bind(this)}>User status line</span>
                    </div>
                }
                {this.state.editMode &&
                    <div>
                        <input
                            value={'User status line'}
                            onBlur={this.deactivateEditMode.bind(this)}
                            autoFocus
                        />
                    </div>
                }
            </>
        );
    }
};

type ProfileStatusPropsType = {}

type ProfileStatusStateType = {
    editMode: boolean
}

