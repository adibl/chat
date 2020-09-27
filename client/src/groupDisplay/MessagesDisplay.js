import React, {useContext, useEffect, useRef, useState} from 'react';
import Paper from "@material-ui/core/Paper";
import usernameContext from '../usernameContex'
import useMessages from "../apiCalls/useMessages";
import Card from "@material-ui/core/Card";
import SingleMessageDisplay from "./singleMessageDisplay";

function MessagesDisplay(props) {
    const username = useContext(usernameContext);
    const messages = useMessages();

    return (
        <React.Fragment>
            {messages.has(props.conversation) &&
            messages.get(props.conversation).map((message) => {
               return <SingleMessageDisplay message={message}/>
            })
            }
            </React.Fragment>
    );
}

export default MessagesDisplay;
