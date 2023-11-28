import img from '../../images/blog.jpg';
import { useLocation } from 'react-router-dom';
import styles from './Blog.module.css';
import { useState } from 'react';
import UserComment from '../UserComment/UserComment';
import axios from 'axios';

const Blog = (props) => {
    const location = useLocation();
    const blog = location.state.blog;
    const user = props.user;
    let imgOfBlog = (blog != null && blog.imageString != null) ? blog.imageString : img;
    const [commentString, setCommentString] = useState('');
    const [comments, setComments] = useState(blog.comments);
    const [buttonStyle, setButtonStyle] = useState(styles['disable-btn']);
    console.log(comments);

    const commentContentChangeHandler = (event) => {
        if (event.target.value === "") {
            setButtonStyle(styles['disable-btn']);
        } else {
            setButtonStyle(styles['add-comment-btn']);
        }
        setCommentString(event.target.value);
    }

    const addComment = (com) => {
        comments.unshift(com);
        setComments(comments);
        setCommentString('');
    }

    const postCommentHandler = () => {

        if (commentString === "") {
            return;
        }

        axios.post(`http://localhost:8080/posts/add-comment/${blog.id}`, {
            commentString: commentString,
            userID: user.id
        })
        .then(response => {
            //console.log(response);
            const newComment = {
                commentContent: commentString,
                user: {
                    imageString: user.imageString,
                    username: user.username
                }
            }

            addComment(newComment);
        })
        .catch(err => {
            console.log(err);
        })
    }

    console.log(blog.comments);
    return <div className={styles['blog-content']}>
        <h1 className={styles['blog-title']}>{blog.title}</h1>
        <p className={styles['blog-description']}>{blog.description}</p>
        <img className={styles['blog-image']} src={imgOfBlog} alt="blog img"/>
        <p className={styles['blog-body']}>{blog.body}</p>

        <div className={styles['comment-section']}>
            <h2>Comments</h2>

            <input className={styles['comment-input']} type="text" value={commentString} onChange={commentContentChangeHandler}/>
            <button className={buttonStyle} onClick={postCommentHandler}>Add Comment</button>

            {comments.map(comment => {
                return <UserComment key={comment.id} comment={comment}/>
            })}
        </div>
    </div>
}

export default Blog;