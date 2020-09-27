import {useContext, useEffect, useState} from "react";
import UserContext from "../usernameContex";
import webSocket from "./webSocket/webSocketEvents";

function useMessages() {
    const [messagesData, setMessagesData] = useState(new Map());
    const username = useContext(UserContext);

    useEffect(() => {
        let socket = webSocket.getSocket(username);
        if (socket && username) {
            socket.on('message', (message) => {
                setMessagesData((messageState) => {
                    let id = message.conversationId;
                    let messagesInThisId = messageState.get(id);
                    if (messagesInThisId) {
                        messagesInThisId.push(message);
                    }
                    else {
                        messagesInThisId = [message];
                    }

                    return new Map(messageState.set(id, messagesInThisId));
                });
            });

            return () => socket.off('message');
        }

    }, [username]);

    return messagesData;
}

export default useMessages;