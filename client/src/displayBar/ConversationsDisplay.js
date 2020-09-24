import React from 'react';
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardHeader from '@material-ui/core/CardHeader';
import style from './UserDisplayStyle';
import GetConversations from '../apiCalls/getConversations.js';

function ConversationsDisplay() {
    const conversations = GetConversations();

    const classes = style();
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


export default ConversationsDisplay;
