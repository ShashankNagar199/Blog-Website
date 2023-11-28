import styles from './AdminPostItem.module.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
const AdminPostItem = (props) => {
    const blog = props.blog;

    //console.log(blog);
    const navigate = useNavigate();

    const [approved, setApproved] = useState(blog.approved);

    function goToBlogReading() {
        const path = '/admin/read-blog';
        navigate(path, {
            state: {
                blog: blog
            }
        })
    }

    const approvePost = () => {
        //blog.approved = true;
        console.log(blog);
        axios.post(`http://localhost:8080/posts/approve/${blog.id}`)
            .then(response => {
                if (response.data === "success"){
                    setApproved(true);
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

    const deleteBlog = () => {
        axios.delete(`http://localhost:8080/posts/delete/${blog.id}`)
        .then(response => {
            props.deleteBlog(blog);
        })
        .catch(err => {
            console.log(err);
        })
    }

    return <div className={styles['post-item-card']}>
        <h2 onClick={goToBlogReading}>{blog.title}</h2>
        <div className={styles['action-btns']}>
            {!approved && <button onClick={approvePost} className={styles['publish-btn']}>Approve</button>}
            {approved && <button className={styles['approved-btn']}>Approved</button>}
            <button onClick={deleteBlog} className={styles['delete-btn']}>Delete</button>
        </div>
    </div>
}

export default AdminPostItem;