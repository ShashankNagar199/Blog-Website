import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

import styles from '../Login/Login.module.css';

const Signup = () => {

    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [gender, setGender] = useState('male');
    const [mobileNumber, setMobileNumber] = useState('');
    const [profile_pic, setProfilePic] = useState('');    
    const [email, setEmail] = useState('');

    const [noUsername, setNoUserName] = useState('');
    const [noPassword, setNoPassword] = useState('');
    const [noConfirmPassword, setNoConfirmPassword] = useState('');
    const [noEmail, setNoEmail] = useState('');
    const [noMobileNumber, setNoMobileNumber] = useState('');
    const [userExistsMsg, setUserExistsMsg] = useState('');

    const usernameChangeHandler = (event) => {
        setUsername(event.target.value);
    }

    const emailChangeHandler = (event) => {
        setEmail(event.target.value);
    }

    const mobileNumberChangeHandler = (event) => {
        setMobileNumber(event.target.value);
    }

    const genderChangeHandler = (event) => {
        console.log(event.target.value);
        setGender(event.target.value);
    }

    const passwordChangeHandler = (event) => {
        setPassword(event.target.value);
    }

    const confirmPasswordChangeHandler = (event) => {
        setConfirmPassword(event.target.value);
    }

    const selectedFileChangeHandler = (event) => {
        // console.log(event.target.files[0]);
        // //setSelectedFile(event.target.files[0]);
        // selectedFile = event.target.files[0];
        readFileDataAsBase64(event).then(val => {
            setProfilePic(val);
        }).catch(err => {
            setProfilePic('');
        });
        //console.log(profile_pic);
        // setProfilePic(readFileDataAsBase64(event));
    }

    const redirectToLoginPage = () => {
        let path = '/login';
        navigate(path, { replace: true});
    }

    function readFileDataAsBase64(e) {
        const file = e.target.files[0];

        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = (event) => {
                resolve(event.target.result);
            };

            reader.onerror = (err) => {
                reject(err);
            };

            reader.readAsDataURL(file);
        });
    }

    const submitForm = (event) => {
        event.preventDefault();
        //console.log(username + " " + email + " " + password + " " + confirmPassword + " " + mobileNumber + " " + gender + " " + profile_pic);
        //console.log(profile_pic);
        let doNotProceed = false;

        if (username.trim() === "") {
            setNoUserName('Please Enter a username')
            doNotProceed = true;
        } else {
            setNoUserName('');
        }

        if (mobileNumber.trim() === "") {
            setNoMobileNumber('Please Enter Mobile Number')
            doNotProceed = true;
        } else {
            setNoMobileNumber('');
        }

        if (email.trim() === "") {
            setNoEmail('Please Enter a Email')
            doNotProceed = true;
        } else {
            setNoEmail('');
        }

        if (password.trim() === "") {
            doNotProceed = true;
            setNoPassword('Please Enter a Password')
        } else {
            setNoPassword('');
        }

        if (confirmPassword.trim() === "") {
            doNotProceed = true;
            setNoConfirmPassword('Please Confirm Password')
        } else {
            setNoConfirmPassword('');
        }

        if (password !== confirmPassword) {
            doNotProceed = true;
            setNoConfirmPassword('Password do not match');
        } else {
            setNoConfirmPassword('');
        }

        if (doNotProceed) {
            return;
        }

        const formData = new FormData();
        formData.append('username', username);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('mobileNumber', mobileNumber);
        formData.append('gender', gender);
        //formData.append('file', selectedFile);
        formData.append('imageString', profile_pic);

        axios.post('http://localhost:8080/register', formData)
            .then(function (response) {
                //console.log(response.data);
                //profile_pic = response.data;
                if (response.data === "success")
                    redirectToLoginPage();
                else if (response.data === "duplicate")
                    setUserExistsMsg('Username / Email already exists')
                else
                    setUserExistsMsg('Something went wrong');
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return <div>
        <div className={styles["form-container"]}>
            <h2 className={styles['form-head']}>Register</h2>
            <p className={styles['user-exists']}>{userExistsMsg}</p>
            <form onSubmit={submitForm} className={styles['form-control']}>
                <label>Username <span className={styles['invalid-input']}>{noUsername}</span> </label>
                <input onChange={usernameChangeHandler} type="text" name="username" placeholder="Enter your username" value={username} />

                <label className={styles.secondInput}>Email <span className={styles['invalid-input']}>{noEmail}</span></label>
                <input onChange={emailChangeHandler} type="email" name="email" placeholder="Enter your Email" value={email} />

                <label className={styles.secondInput}>Mobile Number <span className={styles['invalid-input']}>{noMobileNumber}</span></label>
                <input onChange={mobileNumberChangeHandler} type="number" name="mobile" placeholder="Enter your Mobile Number" value={mobileNumber} />

                <label className={styles.secondInput}>Gender</label>
                <select onChange={genderChangeHandler} className={styles.selector} name="gender" value={gender}>
                    <option value="Male" id="male" name="male">Male</option>
                    <option value="Female" id="female" name="female">Female</option>
                    <option value="Other" id="other" name="other">Prefer Not to say</option>
                </select>

                <label className={styles.secondInput}>Profile Pic</label>
                <input onChange={selectedFileChangeHandler} type='file' name='profile-pic' id='profile-pic' accept="image/png, image/jpeg" />

                <label className={styles.secondInput}>Password <span className={styles['invalid-input']}>{noPassword}</span></label>
                <input onChange={passwordChangeHandler} type="password" name="password" placeholder="Enter your password" value={password} />

                <label className={styles.secondInput}>Confirm Password <span className={styles['invalid-input']}>{noConfirmPassword}</span></label>
                <input onChange={confirmPasswordChangeHandler} type="password" name="confirm_password" placeholder="Re Enter your password" value={confirmPassword} />

                <button type="submit">Register</button>
                <p>Already have an account? <span><Link to="/login">Login</Link></span> </p>
            </form>
            {/* <img src={`data:image/jpeg;base64,${profile_pic}`} alt=''/> */}
        </div>
    </div>
}

export default Signup;