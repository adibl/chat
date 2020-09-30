import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from "@material-ui/core/Typography";

export default function UserMultiSelect(props) {

    const handleToggle = (user) => () => {
        const currentIndex = props.checked.indexOf(user);
        const newChecked = [...props.checked];

        if (currentIndex === -1) {
            newChecked.push(user);
        }
        else {
            newChecked.splice(currentIndex, 1);
        }

        props.setChecked(newChecked);
    };

    return (
        <List dense>
            {props.users.map((user, index) => {
                return <ListItem key={index}>
                    <Typography variant="h5" component="h5">
                        <ListItemText primary={user} disableTypography={true}/>
                    </Typography>
                    <ListItemSecondaryAction>
                        <Checkbox
                            edge="end"
                            onChange={handleToggle(user)}
                            checked={props.checked.indexOf(user) !== -1}
                        />
                    </ListItemSecondaryAction>
                </ListItem>;
            })}
        </List>
    );
}
