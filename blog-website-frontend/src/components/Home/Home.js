import React from "react";
import { Link } from "react-router-dom";

import styles from './Home.module.css';
import img from "../../images/blog.jpg";

const Home = () => {

    return (
        <div className={styles.mainContent}>
            <div className={styles['left-row']}>
                <h1 className={styles.heading}>Join the Huge <br />Community of Bloggers and <br /> <span className={styles.eyecatch}>Share your Ideas.</span></h1>
                <div className={styles['auth-buttons']}>
                    <Link to="/login"><button className={styles['login-btn']}>Login</button></Link>
                    <Link to="/signup"><button className={styles['signup-btn']}>Sign Up</button></Link>
                    <br />
                    <Link to='/admin'> <p>Go to Admin Page (Only right now for functionality)</p> </Link>
                </div>
            </div>
            <img className={styles['welcome-img']} src={img} alt="img" />
        </div>
    );
}

export default Home;