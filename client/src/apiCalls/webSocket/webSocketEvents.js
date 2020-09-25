import io from 'socket.io-client';
import config from "../config";
import UserContext from "../../usernameContex";
import {useContext, useEffect} from "react";

const socket = io(config.url);

function useWebSocket() {
    const username = useContext(UserContext);
    useEffect(() => {
        if (username) {
            socket.emit('login', username);
        }

    }, [username]);

    if (username) {
        return socket;
    }

    return null;
}

export default useWebSocket;