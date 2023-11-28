import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getOthersPostPromise } from "../../UtilityCodes/User/UserUtility";
import styles from './Login.module.css';

const Login = (props) => {

    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassowrd] = useState('');
    const [noError, setNoError] = useState(true);

    const [noUsername, setNoUsername] = useState('');
    const [noPassword, setNoPassword] = useState('');

    const getOthersPostAndPNavigate = (user) => {
        let p = getOthersPostPromise(user.id);
        p.then(response => {
            const path = '/dashboard';
            const blogs = response.data;
            // console.log(blogs);
            navigate(path, { state: { blogs: blogs }, replace: true });
        })
            .catch(err => {
                console.log(err);
            })
    }

    const redirectToDashBoard = (user) => {
        props.changeLoginState(true);
        props.changeUserState(user);

        getOthersPostAndPNavigate(user);
        // let path = '/dashboard';
        // navigate(path);
    }

    const usernameChangeHandler = (event) => {
        setUsername(event.target.value);
    }

    const passwordChangeHandler = (event) => {
        setPassowrd(event.target.value);
    }

    const formSubmitHandler = (event) => {
        event.preventDefault();

        let doNotProceed = false;
        if (username.trim() === "") {
            doNotProceed = true;
            setNoUsername('Please Enter a username');
        } else {
            setNoUsername('');
        }

        if (password.trim() === "") {
            doNotProceed = true;
            setNoPassword("Please Enter a password");
        } else {
            setNoPassword('');
        }

        if (doNotProceed) return;

        //console.log(username, password);
        axios.get('http://localhost:8080/login', {
            params: {
                username: username,
                password: password
            }
        }).then(response => {
            //console.log(response);
            if (response.data === null || response.data === "") {
                setNoError(false);
            } else {
                setNoError(true);
                //console.log(response.data);
                redirectToDashBoard(response.data);
            }
        }).catch((err) => {
            console.log(err);
            setNoError(true);
        })
    }

    let errorPara = <p className={styles['no-user-error-para']}>No Such User Found!</p>

    return <div>
        <div className={styles["form-container"]}>
            <h2 className={styles['form-head']}>Welcome!</h2>
            {!noError && errorPara}
            <form className={styles['form-control']} onSubmit={formSubmitHandler}>
                <label>Username <span className={styles['invalid-input']}>{noUsername}</span></label>
                <input type="text" name="username" placeholder="Enter your username" value={username} onChange={usernameChangeHandler} />


                <label className={styles.secondInput}>Password <span className={styles['invalid-input']}>{noPassword}</span></label>
                <input type="password" name="password" placeholder="Enter your password" value={password} onChange={passwordChangeHandler} />


                <button type="submit">Login</button>
                <p>Dont have an account? <span><Link to="/signup">Sign up</Link></span> </p>
            </form>
        </div>
    </div>
}

export default Login;