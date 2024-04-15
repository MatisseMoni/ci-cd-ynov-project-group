import './App.css';
import { countUsers, getUsers } from './api';
import { useState, useEffect } from 'react';

function App() {
    let [usersCount, setUsersCount] = useState(0);
    let [users, setUsers] = useState([]);

    useEffect(() => {
        const setUsersC = async () => {
            try {
                let count = await countUsers();
                setUsersCount(count)
            } catch (error) {
                console.error(error);
            }

            try {
                let usersC = await getUsers();
                setUsers(usersC);
                console.log(usersC[0])
                
            } catch (error) {
                console.error(error);
            }
        }
        setUsersC()
    }, [])

    return (
        <div className="App">
            <header className="App-header">
                <h1>Users manager</h1>
                <p>{usersCount} user(s) already registered</p>
                <p>the first user is {users[0][1]} {users[0][2]}</p>
            </header>
        </div>
    );
}
export default App;