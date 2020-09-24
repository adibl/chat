import {useContext, useEffect, useState} from "react";
import config from './config';
import UserContext from "../usernameContex";

function GetConversations() {
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

    return conversations;
}

export default GetConversations;