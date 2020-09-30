import {useContext, useEffect, useState} from "react";
import config from './config';
import UserContext from "../usernameContex";

function UseUsersList() {
    const [usersData, setUsersData] = useState([]);
    const username = useContext(UserContext);

    useEffect(() => {
        getUsers();
    }, []);

    function getUsers() {
        fetch(`${config.url}/users?index=0&limit=50`, {
            method: 'GET'
        }).then((res) => res.json())
            .then((data) => setUsersData(data.usernames));
    }

    return [usersData.filter((user) => user !== username), () => getUsers()];
}

export default UseUsersList;