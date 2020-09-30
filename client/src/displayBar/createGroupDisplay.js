import React, {useContext, useRef} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Button from "@material-ui/core/Button";
import useUsersList from "../apiCalls/useUsersList";
import TextField from "@material-ui/core/TextField";
import config from "../apiCalls/config";
import UserContext from "../usernameContex";

export default function CreateGroupDisplay(props) {
    const username = useContext(UserContext);
    const groupNameRef = useRef(null);
    const [usersData, refresh] = useUsersList();
    const [checked, setChecked] = React.useState([]);

    const handleToggle = (user) => () => {
        const currentIndex = checked.indexOf(user);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(user);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    function createGroup() {
        fetch(`${config.url}/conversations`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"creator": username,"name": groupNameRef.current.value, "type": "group", "members": checked})
        }).then((res) => props.onEnd())
            .catch((err) => alert(err));
    }
    return (
        <React.Fragment>
            <TextField
                label="group name"
                type="string"
                inputRef={groupNameRef}
            />
            <List dense>
                {usersData.map((user, index) => {
                    return <ListItem key={index}>
                        <ListItemText primary={user} />
                        <ListItemSecondaryAction>
                            <Checkbox
                                edge="end"
                                onChange={handleToggle(user)}
                                checked={checked.indexOf(user) !== -1}
                            />
                        </ListItemSecondaryAction>
                    </ListItem>
                })}
            </List>
            <Button onClick={createGroup}>
                Create Group
            </Button>
        </React.Fragment>
    );
}
