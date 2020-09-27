import React, {useContext, useEffect, useRef, useState} from 'react';
import Paper from "@material-ui/core/Paper";
import usernameContext from '../usernameContex'
import useMessages from "../apiCalls/useMessages";
import Card from "@material-ui/core/Card";
import {CardHeader} from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

function SingleMessageDisplay(props) {
    const username = useContext(usernameContext);
    return (
        <Card  width={1/4}>

            <CardContent>
                <Typography variant="h5" component="h2">
                    {props.message.sender}
                </Typography>
                <Typography variant="h4" component="h2">
                    {props.message.text}
                </Typography>


            </CardContent>
        </Card>
    );
}

export default SingleMessageDisplay;
