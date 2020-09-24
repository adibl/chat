import React, {useContext} from 'react';
import Card from "@material-ui/core/Card";
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import AddIcon from '@material-ui/icons/Add';
import style from './UserDisplayStyle';
import UserContext from "../usernameContex";
import GetUsers from "../apiCalls/getUsers";

function UsersDisplay() {
    const username = useContext(UserContext);
    const usersData = GetUsers();

    function createChat(userToChatWith) {
        fetch('http://localhost:8080/conversations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({creator: username, type: "personal", members: [userToChatWith]})
        }).then((res) => res.json());

    }

    const classes = style();
    return (
        <div>
            {usersData.map((user, index) => {
                return <Card key={index} className={classes.card}>
                        <CardHeader title={user}/>
                    <CardActions>
                        <Button size="small" onClick={() => createChat(user)}>
                            <AddIcon/>
                        </Button>
                    </CardActions>
                </Card>
            })}
        </div>
    );
}


export default UsersDisplay;
