import React from 'react';
import './App.css';
import UsersClickDisplay from "./usersDisplay/UsersClickDisplay";
import UserSelectionDisplay from "./usersDisplay/UserSelectionDisplay/UserSelectionDisplay";
import Grid from '@material-ui/core/Grid';
import LogInDialog from "./usersDisplay/logInDialog/LogInDialog";

function App() {
    return (
        <div className="App">
            <LogInDialog/>
            <Grid
                container
                direction="row"
                spacing={3}
            >
                <Grid item xs={3}
                      direction="column"
                      justify="center"
                      alignItems="center">
                    <UsersClickDisplay/>

                    <UserSelectionDisplay/>
                </Grid>
                <Grid item xs={6}>
                    some text
                </Grid>
            </Grid>

        </div>
    );
}

export default App;
