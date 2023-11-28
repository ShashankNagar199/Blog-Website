import styles from './Navbar.module.css';
import userpic from '../../images/userpic.jpg';
import { Link } from 'react-router-dom';

const Navbar = (props) => {

    const user = props.currentUser;
    let username = (user != null) ? user.username : '';
    let userImage = (user != null && user.imageString != null) ? user.imageString : userpic;

    const logout = () => {
        props.logoutUser();
    }

    let navbarRightContent = <div className={styles.authenticate}>
       <Link className={styles['auth-links']} to="/login"><p className={styles.login}>Login</p></Link> 
       <Link className={styles['auth-links']} to="/signup"><p className={styles.signup}>Sign up</p></Link>
    </div>;

    if (props.loggedIn) {
        navbarRightContent = <div className={styles.authenticate}>
            <p className={styles.nav_username}>Hi {username}</p>
            <img className={styles.profile_pic} src={userImage} alt='user pic'/>
            <p className={styles['logout']} onClick={logout}>Logout</p>
        </div>
    }
    return <div className={styles.navbar}>
        <p className={styles['company-logo']}>Blogger's World</p>
        {navbarRightContent}
    </div>
}

export default Navbar;