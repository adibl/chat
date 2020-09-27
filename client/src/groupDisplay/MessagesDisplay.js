import React, {useContext, useEffect, useRef, useState} from 'react';
import Paper from "@material-ui/core/Paper";
import usernameContext from '../usernameContex'
import useMessages from "../apiCalls/useMessages";
import Card from "@material-ui/core/Card";

function MessagesDisplay(props) {
    const username = useContext(usernameContext);
    const messages = useMessages();

    return (
        <Paper component="form">
            {messages.has(props.conversation) &&
            messages.get(props.conversation).map((message) => {
               return <Card>
                   {message.text}
               </Card>
            })
            }
        </Paper>
    );
}

export default MessagesDisplay;
