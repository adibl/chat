import React, {useEffect} from 'react';
import useMessages from "../apiCalls/useMessages";
import SingleMessageDisplay from "./SingleMessageDisplay";
import InfiniteScroll from 'react-infinite-scroll-component';

function MessagesDisplay(props) {
    const [messages, getHistoryMessages, isMore] = useMessages();


    function getMore() {
        getHistoryMessages(props.conversation);
    }

    useEffect(() => {
        if (props.conversation) {
            getMore();
        }
    }, [props.conversation]);


    return (
        <InfiniteScroll
            dataLength={messages.length ?? 0}
            next={getMore}
            style={{display: 'flex', flexDirection: 'column-reverse'}}
            height= {700}
            inverse={true}
            hasMore={isMore}
            loader={<h4>Loading...</h4>}
            scrollableTarget="scrollableDiv"
        >
            {messages.has(props.conversation) &&
            messages.get(props.conversation).map((message) => {
                return <SingleMessageDisplay message={message}/>
            })}
        </InfiniteScroll>
);
}

export default MessagesDisplay;
