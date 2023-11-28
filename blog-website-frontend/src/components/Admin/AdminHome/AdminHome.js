import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import getAllPosts from '../../../UtilityCodes/Posts/PostUtil';
import { getAllUsers } from '../../../UtilityCodes/User/UserUtility';
import styles from './AdminHome.module.css';

function AdminHome() {

    const navigate = useNavigate();

    const [enteredCategory, setEnteredCategory] = useState('');
    const [noCategory, setNoCategory] = useState('');

    const formSubmitHandler = (event) => {
        event.preventDefault();
        console.log(enteredCategory);

        if (enteredCategory.trim() === "") {
            setNoCategory('Please Enter a category');
            return;
        } else {
            setNoCategory('');
        }
        
        axios.post('http://localhost:8080/category/new-category', {
            category: enteredCategory
        })
        .then(response => {
            console.log(response);
            setEnteredCategory('');
        })
        .catch(err => {
            console.log(err);            
        })
    }

    const categoryChangeHandler = (event) => {
        setEnteredCategory(event.target.value);
    }

    const goToReviewPostPage = () => {
        const promise = getAllPosts();
        let allBlogs = [];
        promise.then(response => {
            allBlogs = response.data;
            const path = '/admin/review-posts';
            navigate(path, { state: {
                blogs: allBlogs
            }});
        })
        .catch(err => {
            console.log(err);
        })
        
    }

    const goToDeleteUserPage = () => {
        const promise = getAllUsers();
        promise.then(response => {
            let users = response.data;
            const path = '/admin/delete-users';
            navigate(path, {state: {
                users: users
            }});
        })
        .catch(err => {
            console.log(err);
        })
        
    }

    return <div className={styles['admin-main-operations']}>
        <div className={styles['admin-page-content']}>
            <form onSubmit={formSubmitHandler} className={styles['category-form']}>
                <input className={styles['category-input']} type="text" id="category-input" value={enteredCategory} onChange={categoryChangeHandler} placeholder="Enter to add new category"/>
                <button className={styles['add-category-btn']} type="submit">Add Category</button>
                <p className={styles['invalid-input']}>{noCategory}</p>
            </form>

            <div className={styles['action-btns']}>
                <button className={styles['review-post-btn']} onClick={goToReviewPostPage}>Review Posts</button>
                <button className={styles['delete-profile-btn']} onClick={goToDeleteUserPage}>Delete Users</button>
            </div>
        </div>
    </div>
}

export default AdminHome;