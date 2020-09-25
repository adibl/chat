import React, {useContext} from 'react';
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardHeader from '@material-ui/core/CardHeader';
import style from './UserDisplayStyle';
import useConversation from "../../apiCalls/useConversation";
import UserContext from "../../usernameContex";

function ConversationDisplay(props) {
    const username = useContext(UserContext);
    const conversation = useConversation(props.id);
    const classes = style();
    return (
        <div>
            {conversation &&
            <Card key={props.index}>
                <CardActionArea className={classes.card} onClick={props.onclick}>
                    <CardHeader title={conversation.members.filter((user) => user !== username)[0]}/>
                </CardActionArea>

            </Card>
            }
        </div>
    );
}


export default ConversationDisplay;
