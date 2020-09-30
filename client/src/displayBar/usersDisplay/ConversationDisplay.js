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
    let color = props.isSelected ? "#DCDCDC" : "white";
    let groupName = "loading...";
    if (conversation) {
        if (conversation.type === 'personal')
            groupName = conversation.members.filter((user) => user !== username)[0];
        else {
            groupName = conversation.name;
        }
    }

    return (
        <div>
            {conversation &&
            <Card key={props.index} style={{backgroundColor: color}}>
                <CardActionArea className={classes.card} onClick={props.onclick}>
                    <CardHeader title={groupName}/>
                </CardActionArea>
            </Card>
            }
        </div>
    );
}


export default ConversationDisplay;
