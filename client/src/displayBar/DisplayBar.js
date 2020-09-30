import React from 'react';
import Grid from '@material-ui/core/Grid';
import ConversationsDisplay from "./usersDisplay/ConversationsDisplay";
import UsersDisplay from "./usersDisplay/UsersDisplay";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";


function DisplayBar(props) {
    return (
        <Grid
            container
            direction="column"
            spacing={3}>
            <Grid item>
                <Typography variant="h6" component="h6">
                    conversations
                </Typography>
                <ConversationsDisplay onSelect={props.onSelect}  conversation={props.conversation}/>
            </Grid>
            <Grid item>
                <Typography variant="h6" component="h6">
                    other people in the app
                </Typography>
                <UsersDisplay/>
            </Grid>
        </Grid>
    );
}

export default DisplayBar;
