import io from 'socket.io-client';
import config from "../config";
import UserContext from "../../usernameContex";
import {useContext, useEffect, useRef} from "react";



function useWebSocket() {
    const socket = useRef(null);
    const username = useContext(UserContext);
    useEffect(() => {
        socket.current = io(config.url);
        if (username) {
            socket.current.emit('login', username);
        }

        return () => socket.current.disconnect();
    }, [username]);

    if (username) {
        return socket.current;
    }

    return null;
}

export default useWebSocket;