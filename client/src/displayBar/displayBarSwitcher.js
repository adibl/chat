import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import DisplayBar from "./DisplayBar";
import CreateGroupDisplay from "./createGroupDisplay";
import Button from "@material-ui/core/Button";

export default function FullWidthTabs(props) {
    const theme = useTheme();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };

    return (
        <div>
            <Button onClick={() => setValue(1)}>
                create group
            </Button>
                <div
                    role="tabpanel"
                    hidden={value !== 0}
                >
                    <DisplayBar onSelect={props.onSelect} conversation={props.conversation}/>
                </div>
                <div
                    role="tabpanel"
                    hidden={value !== 1}
                >
                    <CreateGroupDisplay onEnd={() => setValue(0)}/>
                </div>
        </div>
    );
}
