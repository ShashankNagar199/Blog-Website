import AdminPostItem from "../AdminPostItem/AdminPostItem";
import styles from './AdminPosts.module.css';
import { useLocation } from "react-router-dom";
import { useState } from "react";

const AdminPostPage = () => {

    const location = useLocation();
    const [blogs, setBlogs] = useState(location.state.blogs);

    const deleteBlog = (blog) => {
        let newSetOfBlogs = blogs.filter(b => {
            return  b !== blog;
        })

        setBlogs(newSetOfBlogs);
    }

    return <div className={styles['post-page-container']}>
        <h1>Posts to Review</h1>
        {blogs.map(blog => {
            return <AdminPostItem key={blog.id} blog={blog} deleteBlog={deleteBlog}/>
        })}
        {/* <AdminPostItem />
        <AdminPostItem />
        <AdminPostItem />
        <AdminPostItem />
        <AdminPostItem />
        <AdminPostItem /> */}
    </div>
}

export default AdminPostPage;