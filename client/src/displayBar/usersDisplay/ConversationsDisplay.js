import React from 'react';
import UseConversationsList from '../../apiCalls/useConversationsList.js';
import ConversationDisplay from "./ConversationDisplay";

function ConversationsDisplay(props ) {
    const conversations = UseConversationsList();
    return (
        <div>
            {conversations && conversations.map((convId, index) => {
                return <ConversationDisplay index={index} id={convId} onclick={() => props.onSelect(convId)}/>
            })}
        </div>
    );
}


export default ConversationsDisplay;
