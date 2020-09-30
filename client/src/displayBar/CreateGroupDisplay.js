import React, {useContext, useEffect, useRef} from 'react';
import Button from "@material-ui/core/Button";
import useUsersList from "../apiCalls/useUsersList";
import TextField from "@material-ui/core/TextField";
import config from "../apiCalls/config";
import UserContext from "../usernameContex";
import {IconButton} from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import UserMultiSelect from "./usersDisplay/usersMultiSelection";

export default function CreateGroupDisplay(props) {
    const username = useContext(UserContext);
    const groupNameRef = useRef(null);
    const [usersData, refresh] = useUsersList();
    const [checked, setChecked] = React.useState([]);

    function createGroup() {
        fetch(`${config.url}/conversations`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "creator": username,
                "name": groupNameRef.current.value,
                "type": "group",
                "members": checked
            })
        }).then(() => clean())
            .then(() => props.onEnd())
            .catch((err) => alert(err));
    }

    function clean() {
        setChecked([]);
        groupNameRef.current.value = '';
    }

    useEffect(() => {
        refresh();
    }, [props.isDisplayed]);

    return (
        <Card key={props.index}>
            <CardHeader
                action={
                    <IconButton onClick={props.onEnd} size={"medium"}>
                        <ArrowBackIcon/>
                    </IconButton>
                }
                title="Create Group"
            />
            <CardContent>
                <TextField
                    required={true}
                    label="group name"
                    type="string"
                    inputRef={groupNameRef}
                />
                <UserMultiSelect users={usersData} setChecked={setChecked} checked={checked}/>
            </CardContent>
            <CardActions>
                <Button onClick={createGroup} size={"medium"}>
                    Create Group
                </Button>
            </CardActions>
        </Card>
    );
}
