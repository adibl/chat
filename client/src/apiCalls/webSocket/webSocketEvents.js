import io from 'socket.io-client';
import config from "../config";
import UserContext from "../../usernameContex";
import React, {useContext, useEffect, useRef, useState} from "react";



function useWebSocket(username) {
    const socket = useRef(null);
    useEffect(() => {
        if (username) {
            socket.current = io(config.url);
            socket.current.emit('login', username);
            return () => socket.current.disconnect();
        }

    }, [username]);

    if (username) {
        return socket.current;
    }

    return null;
}

export default useWebSocket;