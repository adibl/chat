import React, {useState} from 'react';
import './App.css';
import DialogBar from './displayBar/DisplayBar'
import Grid from '@material-ui/core/Grid';
import LogInDialog from "./logInDialog/LogInDialog";
import { UserProvider } from './usernameContex';
import SendMessageDisplay from "./groupDisplay/sendMessageDisplay";
import MessagesDisplay from "./groupDisplay/MessagesDisplay";
import Box from "@material-ui/core/Box";


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
                        <Grid
                            item
                            xs={6}
                            container
                            direction="column"
                            spacing={3}>

                            <Grid item alignItems={"stretch"}>
                                <SendMessageDisplay conversation={currentConversationId}/>
                            </Grid>
                            <Grid item alignItems={"stretch"}>
                                <MessagesDisplay conversation={currentConversationId}/>
                            </Grid>
                    </Grid>
                </Grid>
            </UserProvider>
        </div>
    );
}

export default App;
