import React, {useState} from 'react';
import './App.css';
import DialogBar from './displayBar/DisplayBar'
import Grid from '@material-ui/core/Grid';
import LogInDialog from "./logInDialog/LogInDialog";
import { UserProvider } from './usernameContex';
import SendMessageDisplay from "./groupDisplay/sendMessageDisplay";
import MessagesDisplay from "./groupDisplay/MessagesDisplay";


function App() {
    const [username, setUsername] = useState(null);
    const [currentConversationId, setCurrentConversationId] = useState(null);
    return (
        <div className="App">
            <UserProvider value={username}>
            <LogInDialog login={setUsername}/>
            <Grid
                container
                direction="row"
                spacing={3}>
                <Grid item xs={3}>
                    <DialogBar onSelect={setCurrentConversationId}/>
                </Grid>
                <Grid item xs={6}>
                    some text
                    <SendMessageDisplay conversation={currentConversationId}/>
                    <MessagesDisplay/>
                </Grid>
            </Grid>
            </UserProvider>
        </div>
    );
}

export default App;
