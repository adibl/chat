import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Button from "@material-ui/core/Button";
import useUsersList from "../apiCalls/useUsersList";
import {TextFields} from "@material-ui/icons";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
}));

export default function CreateGroupDisplay(props) {
    const classes = useStyles();
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
        alert(checked);
        props.onEnd();
    }
    return (
        <React.Fragment>
            <TextField
                label="group name"
                type="string"
            />
            <List dense className={classes.root}>
                {usersData.map((user, index) => {
                    return <ListItem key={index} button>
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
