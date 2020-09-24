import React, {useEffect, useState} from 'react';
import Card from "@material-ui/core/Card";
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import AddIcon from '@material-ui/icons/Add';
import style from '../UserDisplayStyle';

function UserSelectionDisplay() {
    const [usersData, setUsersData] = useState([]);
    useEffect(() => {
        fetch('http://localhost:8080/users?index=0&limit=10', {
            method: 'GET'
        }).then((res) => res.json())
            .then((data) => setUsersData(data.usernames));
    }, [])

    const classes = style();
    return (
        <div>
            {usersData.map((user) => {
                return <Card className={classes.card}>
                        <CardHeader title={user}/>
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
