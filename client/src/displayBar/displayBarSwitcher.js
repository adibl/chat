import React from 'react';
import DisplayBar from "./DisplayBar";
import CreateGroupDisplay from "./createGroupDisplay";
import Button from "@material-ui/core/Button";

export default function SideBarSwitcher(props) {
    const [value, setValue] = React.useState(0);

    return (
        <React.Fragment>
                <div hidden={value !== 0}>
                    <Button onClick={() => setValue(1)}>
                        create group
                    </Button>
                    <DisplayBar onSelect={props.onSelect} conversation={props.conversation}/>
                </div>
                <div hidden={value !== 1}>
                    <CreateGroupDisplay onEnd={() => setValue(0)}/>
                </div>
        </React.Fragment>
    );
}
