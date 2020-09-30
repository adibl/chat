import React, {useContext, useRef} from 'react';
import IconButton from "@material-ui/core/IconButton";
import SendIcon from '@material-ui/icons/Send';
import TextField from "@material-ui/core/TextField";
import config from "../apiCalls/config";
import usernameContext from '../usernameContex';
import {ButtonGroup} from "@material-ui/core";

function SendMessageDisplay(props) {
    const text = useRef("");
    const username = useContext(usernameContext);

    function Send() {
        if (props.conversation && text.current) {
            fetch(`${config.url}/messages/${props.conversation}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({"sender": username, "text": text.current.value})
            }).then(text.current.value = "");
        }

    }

    return (
        <ButtonGroup>
            <IconButton aria-label="menu">
            </IconButton>
            <TextField
                autoFocus
                margin="dense"
                type="string"
                fullWidth
                inputRef={text}
            />
            <IconButton color="primary" aria-label="send message" onClick={Send}>
                <SendIcon/>
            </IconButton>
        </ButtonGroup>
    );
}

export default SendMessageDisplay;
