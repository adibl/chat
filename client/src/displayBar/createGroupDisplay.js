import React, {useContext, useRef} from 'react';
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
import style from "./usersDisplay/UserDisplayStyle";
import Typography from "@material-ui/core/Typography";
import {IconButton} from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Divider from "@material-ui/core/Divider";
import RefreshIcon from "@material-ui/icons/Refresh";
import ButtonGroup from "@material-ui/core/ButtonGroup";

export default function CreateGroupDisplay(props) {
    const classes = style();
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
        }).then(() => clean())
            .then(() => props.onEnd())
            .catch((err) => alert(err));
    }

    function clean() {
        setChecked([]);
        groupNameRef.current.value = '';
    }

    return (
        <Card key={props.index}>
            <CardHeader
                action={
                    <ButtonGroup>
                        <IconButton onClick={props.onEnd} size={"medium"}>
                            <ArrowBackIcon/>
                        </IconButton>
                        <IconButton onClick={refresh}>
                            <RefreshIcon/>
                        </IconButton>
                    </ButtonGroup>
                }
                title="Create Group"
            />
            <CardContent>
                <TextField
                    className={classes.card}
                    required={true}
                    label="group name"
                    type="string"
                    inputRef={groupNameRef}
                />
                <List dense>
                    {usersData.map((user, index) => {
                        return <ListItem key={index} className={classes.card}>
                            <Typography variant="h5" component="h5">
                                <ListItemText primary={user} disableTypography={true}/>
                            </Typography>
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
            </CardContent>
            <CardActions>
                <Button onClick={createGroup} size={"medium"}>
                    Create Group
                </Button>
            </CardActions>
        </Card>
    );
}
