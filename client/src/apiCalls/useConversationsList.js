import {useContext, useEffect, useState} from "react";
import config from './config';
import UserContext from "../usernameContex";
import useWebSocket from "./webSocketEvents";

function UseConversationsList() {
    const [conversations, setConversations] = useState([]);
    const username = useContext(UserContext);

    useEffect(() => {
        if (username) {
            fetch(`${config.url}/users/${username}`, {
                method: 'GET'
            }).then((res) => res.json())
                .then((data) => setConversations(data.conversations));
        }

    }, [username]);

    useEffect(() => {
        let webSocket = useWebSocket.getSocket(username);
        if (webSocket) {
            webSocket.on('newGroup', (groupId) => {
                setConversations(conversations => {
                    return [...conversations, groupId];
                });
            });

            return () => webSocket.off('newGroup')
        }
    }, [username]);

    return conversations;
}

export default UseConversationsList;