import React, {useState} from 'react';
import './App.css';
import Grid from '@material-ui/core/Grid';
import LogInDialog from "./logInDialog/LogInDialog";
import {UserProvider} from './usernameContex';
import SendMessageDisplay from "./groupDisplay/SendMessageDisplay";
import MessagesDisplay from "./groupDisplay/MessagesDisplay";
import SideBarSwitcher from "./displayBar/BarSwitcher";


function App() {
    const [username, setUsername] = useState(null);
    const [currentConversationId, setCurrentConversationId] = useState(null);
    return (
        <div className="Stretch">
            <UserProvider value={username}>
                <LogInDialog login={setUsername}/>
                <Grid
                    className="Stretch"
                    container
                    direction="row"
                    justify={"space-between"}
                    alignItems="stretch"
                    spacing={3}>
                    <Grid item xs={3}>
                        <SideBarSwitcher onSelect={setCurrentConversationId} conversation={currentConversationId}/>
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
