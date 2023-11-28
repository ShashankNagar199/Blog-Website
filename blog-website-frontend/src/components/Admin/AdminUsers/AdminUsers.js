import { useState } from 'react';
import styles from './AdminUsers.module.css';
import UserItem from '../UserItem/UserItem';
import { useLocation } from 'react-router-dom';
const AdminUsersPage = () => {

    const location = useLocation();
    let users = location.state.users;
    const [displayedUsers, setDisplayedUsers] = useState(users);
    const [enteredUserName, setEnteredUserName] = useState('');

    const deleteUser = (user) => {
        users = users.filter(u => {
            return u !== user;
        })

        //console.log("hit");

        let filteredUser = displayedUsers.filter(u => {
            return u !== user;
        })

        setDisplayedUsers(filteredUser);
    }

    const usernameEnteredChangeHandler = (event) => {
        setEnteredUserName(event.target.value);

        // console.log(users);
        let filteredUsers = users.filter(user => {
            return user.username.includes(event.target.value);
        });

        setDisplayedUsers(filteredUsers);
    }

    return <div className={styles['admin-user-container']}>
        <div className={styles['section-head']}>
            <h1 className={styles['section-heading']}>Delete users</h1>
            <input className={styles['filter-user']} type="text" value={enteredUserName} onChange={usernameEnteredChangeHandler} placeholder="Enter Name to Filter Results"/>
        </div>

        {displayedUsers.map(user => {
            return <UserItem key={user.id} user={user} deleteUser={deleteUser} />
        })}
    </div>
}

export default AdminUsersPage;