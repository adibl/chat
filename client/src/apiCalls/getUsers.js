import {useContext, useEffect, useState} from "react";
import config from './config';
import UserContext from "../usernameContex";

function GetUsers() {
    const [usersData, setUsersData] = useState([]);
    const username = useContext(UserContext);

    useEffect(() => {
        fetch(`${config.url}/users?index=0&limit=10`, {
            method: 'GET'
        }).then((res) => res.json())
            .then((data) => setUsersData(data.usernames));
    }, []);

    return usersData.filter((user) => user !== username);
}

export default GetUsers;