import React, {useState} from 'react';
import './App.css';
import UsersClickDisplay from "./usersDisplay/UsersClickDisplay";
import UserSelectionDisplay from "./usersDisplay/UserSelectionDisplay/UserSelectionDisplay";
import Grid from '@material-ui/core/Grid';
import LogInDialog from "./usersDisplay/logInDialog/LogInDialog";
import { UserProvider } from './usernameContex';


function App() {
    const [username, setUsername] = useState(null);
    return (
        <div className="App">
            <UserProvider  value={username}>
            <LogInDialog login={setUsername}/>
            <Grid
                container
                direction="row"
                spacing={3}>
                <Grid item xs={3}>
                    <UsersClickDisplay/>

                    <UserSelectionDisplay/>
                </Grid>
                <Grid item xs={6}>
                    some text
                </Grid>
            </Grid>
            </UserProvider>
        </div>
    );
}

export default App;
