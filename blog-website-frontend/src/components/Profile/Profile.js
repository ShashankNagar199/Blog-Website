import UserPostsItem from '../UserPostsItem/UserPostsItem';
import styles from './Profile.module.css';
import { useLocation, Navigate } from 'react-router-dom';
import userpic from  '../../images/userpic.jpg';
import { useState } from 'react';

const Profile = (props) => {

    const user = props.currentUser;
    const location = useLocation();

    const [blogs, setBlogs] = useState(location?.state?.blogs);

    if (user === null || user === undefined) {
        return <Navigate replace to="/login" />
    }
    
    //console.log(blogs);
    let username = (user != null) ? user.username : '';
    let email = (user != null) ? user.email : '';
    let mobileNumber = (user != null) ? user.mobileNumber : '';
    let gender = (user != null) ? user.gender : '';
    let userImage = (user != null && user.imageString != null) ? user.imageString : userpic;

    const deleteBlog = (blog) => {
        const filteredBlogs = blogs.filter(b => {
            return b !== blog;
        })

        setBlogs(filteredBlogs);
    }

    return <div className={styles['profile-container']}>
        <div className={styles['profile-header']}>
            <h1>Profile</h1>
        </div>

        <div className={styles['profile-card']}>
            <div className={styles['profile-left-row']}>
                <img className={styles['profile-pic']} src={userImage} alt='user pic'/>
                <h2 className={styles['username']}>{username}</h2>
            </div>
            <div className={styles['profile-details-container']}>
                <h2>Email: <span className={styles['userdata']}>{email}</span> </h2>
                <h2>Mobile number: <span className={styles['userdata']}>{mobileNumber}</span></h2>
                <h2>Gender: <span className={styles['userdata']}>{gender}</span></h2>
            </div>
        </div>

        <div className={styles['posts-section']}>
            <h1>Your Posts</h1>
            {blogs.length === 0 && <p className={styles['no-posts']}>You haven't made any posts</p>}
            {blogs.map(blog => {
                return <div key={blog.id}>
                    <UserPostsItem user={user} blog={blog} deleteBlog={deleteBlog}/>
                    <hr className={styles['post-separator']} />
                </div>
            })}
            {/* <UserPostsItem />
            
            <UserPostsItem />
            <hr className={styles['post-separator']} />
            <UserPostsItem />
            <hr className={styles['post-separator']} />
            <UserPostsItem />
            <hr className={styles['post-separator']} /> */}
        </div>
    </div>
}

export default Profile;