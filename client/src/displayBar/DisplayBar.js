import React, {} from 'react';
import Grid from '@material-ui/core/Grid';
import ConversationsDisplay from "./usersDisplay/ConversationsDisplay";
import UsersDisplay from "./usersDisplay/UsersDisplay";


function DisplayBar(props) {
    return (
        <Grid
            container
            direction="column"
            spacing={3}>
            <Grid item>
                conversations
                <ConversationsDisplay onSelect={props.onSelect}  conversation={props.conversation}/>
            </Grid>
            <Grid item>
                other people in the app
                <UsersDisplay/>
            </Grid>
        </Grid>
    );
}

export default DisplayBar;
