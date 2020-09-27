import {useContext, useEffect, useState} from "react";
import UserContext from "../usernameContex";
import webSocket from "./webSocket/webSocketEvents";
import update from 'immutability-helper';

function useMessages() {
    const [messagesData, setMessagesData] = useState(new Map());
    const username = useContext(UserContext);

    useEffect(() => {
        let socket = webSocket.getSocket(username);
        if (socket) {
            socket.on('message', (data) => {
                setMessagesData((messages) => {
                    let messagesInThisId = messages.get(data.conversationId);
                    if (messagesInThisId) {
                        messagesInThisId.push(data);
                    }
                    else {
                        messagesInThisId = [data];
                    }

                    return update(messages, { [data.conversationId]: {$set: messagesInThisId} });
                });
            });

            return () => socket.off('message');
        }

    }, [username]);

    return messagesData;
}

export default useMessages;