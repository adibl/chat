import React from 'react';
import style from './UserDisplayStyle';
import GetConversations from '../../apiCalls/getConversations.js';
import ConversationDisplay from "./conversationDisplay";

function ConversationsDisplay() {
    const conversations = GetConversations();
    return (
        <div>
            {conversations && conversations.map((convId, index) => {
                return <ConversationDisplay index={index} id={convId}/>
            })}
        </div>
    );
}


export default ConversationsDisplay;
