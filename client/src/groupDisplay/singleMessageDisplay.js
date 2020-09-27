import React, {useContext, useEffect, useRef, useState} from 'react';
import Paper from "@material-ui/core/Paper";
import usernameContext from '../usernameContex'
import useMessages from "../apiCalls/useMessages";
import Card from "@material-ui/core/Card";
import {CardHeader} from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

function SingleMessageDisplay(props) {
    const username = useContext(usernameContext);
    return (
        <Box item width={1/3}>
        <Card>

            <CardContent>
                <Typography variant="h7" component="h7">
                    {props.message.sender}
                </Typography>
                <Typography variant="h6" component="h6">
                    {props.message.text}
                </Typography>


            </CardContent>
        </Card>
        </Box>
    );
}

export default SingleMessageDisplay;
