import React, {} from 'react';
import Grid from '@material-ui/core/Grid';
import ConversationsDisplay from "./usersDisplay/ConversationsDisplay";
import UsersDisplay from "./usersDisplay/UsersDisplay";


function DisplayBar() {
    return (
        <Grid
            container
            direction="column"
            spacing={3}>
            <Grid item>
                conversations
                <ConversationsDisplay/>
            </Grid>
            <Grid item>
                other people in the app
                <UsersDisplay/>
            </Grid>
        </Grid>
    );
}

export default DisplayBar;
