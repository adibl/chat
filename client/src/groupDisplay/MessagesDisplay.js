import React from 'react';
import useMessages from "../apiCalls/useMessages";
import SingleMessageDisplay from "./singleMessageDisplay";

function MessagesDisplay(props) {
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
