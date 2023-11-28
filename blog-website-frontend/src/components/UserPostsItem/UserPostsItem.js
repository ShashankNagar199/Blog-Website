import styles from './UserPostsItem.module.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import getAllCategoriesPromise from '../../UtilityCodes/Category/CategoryUtil';
import { useState } from 'react';

const UserPostsItem = (props) => {
    let blog = props.blog;
    const [title, setTitle] = useState(blog.title);
    let user = props.user;

    let navigate  = useNavigate();
    const viewMyBlog = () => {
        //const path = '/blog';
        //props.getBlog(blog);
        //navigate(path, {state: {blog}});

        navigate('/profile/my-blog', {state: {blog}});
    }

    //console.log(blog);

    const deleteBlog = () => {
        axios.delete(`http://localhost:8080/posts/delete/${blog.id}`)
        .then(response => {
            props.deleteBlog(blog);
        })
        .catch(err => {
            console.log(err);
        })
    }

    const setUpdatedBlog = (blog) => {
        setTitle(blog.title);
    }

    const editBlog = () => {
        let promise = getAllCategoriesPromise();
        promise.then(response => {
            let categories = response.data;
            //console.log(categories);
            navigate('/edit', {state: {
                blog: blog,
                user: user,
                categories: categories,
            }})
        })
        .catch(err => {
            console.log(err);
        })
        
    }

    let status = (blog.approved ? "Approved" : "Pending for Approval")
    return <div className={styles['post-item-card']}>
        <h2 onClick={viewMyBlog} className={styles['post-title']}>{title}</h2>
        <div className={styles['right-row']}>
            <p className={styles['status']}>{status}</p>
            <button onClick={editBlog} className={styles['edit-btn']}>Edit Post</button>
            <button onClick={deleteBlog} className={styles['delete-btn']}>Delete</button>
        </div>
    </div>
}

export default UserPostsItem;