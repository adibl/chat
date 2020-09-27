import React, {useContext, useRef, useState} from 'react';
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";
import SendIcon from '@material-ui/icons/Send';
import TextField from "@material-ui/core/TextField";
import config from "../apiCalls/config";
import usernameContext from '../usernameContex'
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
            }).then(r => alert(r.status));
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
        <IconButton color="primary" aria-label="directions" onClick={Send}>
            <SendIcon />
        </IconButton>
    </ButtonGroup>
    );
}

export default SendMessageDisplay;
