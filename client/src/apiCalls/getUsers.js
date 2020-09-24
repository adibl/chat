import {useEffect, useState} from "react";
import config from './config';

function GetUsers() {
    const [usersData, setUsersData] = useState([]);

    useEffect(() => {
        fetch(`${config.url}/users?index=0&limit=10`, {
            method: 'GET'
        }).then((res) => res.json())
            .then((data) => setUsersData(data.usernames));
    }, []);

    return usersData;
}

export default GetUsers;