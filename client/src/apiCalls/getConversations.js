import {useContext, useEffect, useState} from "react";
import config from './config';
import UserContext from "../usernameContex";
import useWebSocket from "./webSocket/webSocketEvents";

function GetConversations() {
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
                        conversations.push(groupId);
                        return conversations;
                    }
                    else {
                        return [groupId];
                    }
                });
            });
        }

    }, [webSocket]);

    return conversations;
}

export default GetConversations;