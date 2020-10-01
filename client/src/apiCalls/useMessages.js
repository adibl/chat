import {useContext, useEffect, useState} from "react";
import UserContext from "../usernameContex";
import webSocket from "./webSocketEvents";
import config from "./config";

function useMessages() {
    const [messagesData, setMessagesData] = useState(new Map());
    const [isMore, setIsMore] = useState(false);
    const username = useContext(UserContext);

    useEffect(() => {
        let socket = webSocket.getSocket(username);
        if (socket && username) {
            socket.on('message', (message) => {
                setMessagesData((messageState) => {
                    let id = message.conversationId;
                    let messagesInThisId = messageState.get(id);
                    if (messagesInThisId) {
                        messagesInThisId.unshift(message);
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


    function getMessagesPagination(convId, limit = 10) {
        let lastId = 0;
        if (messagesData.has(convId) && messagesData.get(convId)?.length > 0 ) {
            let messages = messagesData.get(convId);
            lastId = messages[messages.length - 1]._id;
        }

        fetch(`${config.url}/messages/${convId}?lastId=${lastId}&limit=${limit}`, {
            method: 'GET'
        }).then((res) => res.json())
            .then((data) => {
                setMessagesData((messageState) => {
                    let messagesInThisId = messageState.get(convId);
                    if (messagesInThisId) {
                        messagesInThisId = messagesInThisId.concat(data.reverse());
                    }
                    else {
                        messagesInThisId = data.reverse();
                    }

                    return new Map(messageState.set(convId, messagesInThisId));
                });
                setIsMore(data && data.length === limit);
            });
    }

    return [messagesData, getMessagesPagination, isMore];
}

export default useMessages;