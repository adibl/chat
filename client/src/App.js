import React, {useState} from 'react';
import './App.css';
import ConversationsDisplay from "./displayBar/ConversationsDisplay";
import UsersDisplay from "./displayBar/UsersDisplay";
import Grid from '@material-ui/core/Grid';
import LogInDialog from "./displayBar/logInDialog/LogInDialog";
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
                    <ConversationsDisplay/>

                    <UsersDisplay/>
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
