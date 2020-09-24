import React, {useContext, useEffect, useState} from 'react';
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardHeader from '@material-ui/core/CardHeader';
import style from './UserDisplayStyle';
import UserContext from '../usernameContex';

function UsersClickDisplay() {
    const [conversations, setConversations] = useState([]);
    const username = useContext(UserContext);

    useEffect(() => {
        if (username) {
            fetch(`http://localhost:8080/users/${username}`, {
                method: 'GET'
            }).then((res) => res.json())
                .then((data) => setConversations(data.conversations));
        }

    }, [username])

    const classes = style()
    return (
        <div>
            {conversations && conversations.map((user, index) => {
                return <Card key={index}>
                    <CardActionArea className={classes.card}>
                        <CardHeader title={user}/>
                    </CardActionArea>

                </Card>
            })}
        </div>
    );
}


export default UsersClickDisplay;
