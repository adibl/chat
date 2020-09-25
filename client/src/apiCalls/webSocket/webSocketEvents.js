import io from 'socket.io-client';
import config from "../config";


class webSocketSingeltone {
    constructor() {
        this.socket = io(config.url);
        this.socketUsername = null;
    }

    getSocket(username) {
        if (this.socketUsername !== username) {
            if (this.socket == null || this.socketUsername !== null) {
                this.socket.close();
                this.socket = io(config.url);
            }

            this.socket.emit('login', username);
            this.socketUsername = username;
        }

        return this.socket;

    }
}

const webSocket = new webSocketSingeltone();

export default webSocket;