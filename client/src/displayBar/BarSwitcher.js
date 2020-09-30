import React from 'react';
import GroupsAndUsersDisplay from "./GroupsAndUsersDisplay";
import CreateGroupDisplay from "./CreateGroupDisplay";
import Button from "@material-ui/core/Button";

export default function SideBarSwitcher(props) {
    const [value, setValue] = React.useState(0);

    return (
        <React.Fragment>
                <div hidden={value !== 0}>
                    <Button onClick={() => setValue(1)} size="medium">
                        create group
                    </Button>
                    <GroupsAndUsersDisplay onSelect={props.onSelect} conversation={props.conversation}/>
                </div>
                <div hidden={value !== 1}>
                    <CreateGroupDisplay onEnd={() => setValue(0)}/>
                </div>
        </React.Fragment>
    );
}
