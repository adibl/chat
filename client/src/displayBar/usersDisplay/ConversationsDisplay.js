import React from 'react';
import style from './UserDisplayStyle';
import UseConversationsList from '../../apiCalls/useConversationsList.js';
import ConversationDisplay from "./ConversationDisplay";

function ConversationsDisplay() {
    const conversations = UseConversationsList();
    return (
        <div>
            {conversations && conversations.map((convId, index) => {
                return <ConversationDisplay index={index} id={convId}/>
            })}
        </div>
    );
}


export default ConversationsDisplay;
