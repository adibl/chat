import React from 'react';
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardHeader from '@material-ui/core/CardHeader';
import style from './UserDisplayStyle';

function UsersClickDisplay() {
    let userData = [
        {username: "adi",id: 1234},
        {username: "roni", id: 1234}
        ]
    const classes = style()
    return (
        <div>
            {userData.map((user) => {
                return <Card>
                    <CardActionArea className={classes.card}>
                        <CardHeader title={user.username}/>
                    </CardActionArea>

                </Card>
            })}
        </div>
    );
}


export default UsersClickDisplay;
