import axios from 'axios';
import styles from './UserItem.module.css';

const UserItem = (props) => {

    const deleteUser = () => {
        axios.delete(`http://localhost:8080/delete/${user.id}`)
        .then(response => {
            if (response.data == "success") {
                props.deleteUser(user);
            }
        })
        .catch(err => {

        })
    }

    let user = props.user;
    return <div className={styles['user-item-container']}>
        <h2 className={styles['username']}>{user.username}</h2>
        <button onClick={deleteUser} className={styles['delete-user-btn']}>Delete</button>
    </div>
}

export default UserItem;