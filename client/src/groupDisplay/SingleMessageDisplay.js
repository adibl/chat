import React from 'react';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

function SingleMessageDisplay(props) {
    return (
        <Box item width={1 / 3}>
            <Card>
                <CardContent>
                    <Typography variant="h7" component="h7">
                        {props.message.sender}
                    </Typography>
                    <Typography variant="h6" component="h6">
                        {props.message.text}
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    );
}

export default SingleMessageDisplay;
