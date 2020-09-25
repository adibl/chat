import {useContext, useEffect, useState} from "react";
import config from './config';
import UserContext from "../usernameContex";
import useWebSocket from "./webSocket/webSocketEvents";

function UseConversationsList() {
    const [conversations, setConversations] = useState([]);
    const username = useContext(UserContext);
    const webSocket = useWebSocket();

    useEffect(() => {
        if (username) {
            fetch(`${config.url}/users/${username}`, {
                method: 'GET'
            }).then((res) => res.json())
                .then((data) => setConversations(data.conversations));
        }

    }, [username]);

    useEffect(() => {
        if (webSocket) {
            webSocket.on('newGroup', (groupId) => {
                setConversations(conversations => {
                    if (conversations) {
                        return [...conversations, groupId];
                    }
                    else {
                        return [groupId];
                    }
                });
            });

            return () => webSocket.off('newGroup')
        }
    }, [webSocket]);

    return conversations;
}

export default UseConversationsList;