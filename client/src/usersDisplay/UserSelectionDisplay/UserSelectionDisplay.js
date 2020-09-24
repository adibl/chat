import React from 'react';
import Card from "@material-ui/core/Card";
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import AddIcon from '@material-ui/icons/Add';
import style from '../UserDisplayStyle';

function UserSelectionDisplay() {
    let userData = [
        {username: "adi",id: 1234},
        {username: "roni", id: 1234}
    ]

    const classes = style();
    return (
        <div>
            {userData.map((user) => {
                return <Card className={classes.card}>
                        <CardHeader title={user.username}/>
                    <CardActions>
                        <Button size="small">
                            <AddIcon/>
                        </Button>
                    </CardActions>
                </Card>
            })}
        </div>
    );
}


export default UserSelectionDisplay;
