import React, {useContext, useEffect, useRef, useState} from 'react';
import Paper from "@material-ui/core/Paper";
import useWebSocket from "../apiCalls/webSocket/webSocketEvents";
import usernameContext from '../usernameContex'

function MessagesDisplay() {
    const username = useContext(usernameContext);
    const socket = useWebSocket(username);

    useEffect(() => {
        if (socket) {
            socket.on('message', (data) => {
                alert(JSON.stringify(data));
            });

            return () => socket.off('message');
        }

    }, [socket]);

    return (
        <Paper component="form" aria-autocomplete="inline">
            some messages
        </Paper>
    );
}

export default MessagesDisplay;
