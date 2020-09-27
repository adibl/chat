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
        <div className="Strech">
            <UserProvider value={username}>
                <LogInDialog login={setUsername}/>
                <Grid
                    className="Strech"
                    container
                    direction="row"
                    justify={"space-between"}
                    alignItems="stretch"

                    spacing={3}>
                    <Grid item xs={3}>
                        <DialogBar onSelect={setCurrentConversationId}/>
                    </Grid>
                    <Grid
                        item
                        xs={9}
                        container
                        direction="column"
                        justify={"space-between"}
                        alignItems="stretch"
                        spacing={3}>
                        <Grid item>
                            <MessagesDisplay conversation={currentConversationId}/>
                        </Grid>
                        <Grid item>
                            <SendMessageDisplay conversation={currentConversationId}/>
                        </Grid>
                    </Grid>
                </Grid>
            </UserProvider>
        </div>
    );
}

export default App;
