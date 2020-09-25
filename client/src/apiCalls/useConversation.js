import config from './config';
import {useEffect, useState} from "react";

function useConversation(conversationId) {
    const [conversation, setConversation] = useState(null);
    useEffect(() => {
        fetch(`${config.url}/conversations/${conversationId}`, {
            method: 'GET'
        }).then((res) => res.json())
            .then((data) => setConversation(data));
    }, [conversationId]);
    return conversation;
}

export default useConversation;