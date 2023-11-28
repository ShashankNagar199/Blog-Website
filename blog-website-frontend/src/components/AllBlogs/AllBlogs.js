import BlogIntro from '../BlogsIntro/BlogIntro';
import styles from './AllBlogs.module.css';
import { useLocation, useNavigate, Navigate } from 'react-router-dom'; 
import { useState } from 'react';


const AllBlogs = (props) => {

    const user = props.currentUser;
    let needToRedirect;
    if (user === null || user === undefined) {
        needToRedirect = true;
    }

    const navigate = useNavigate();
    const location = useLocation();
    const blogs = (needToRedirect) ? [] : location.state.blogs;
    const categories = (needToRedirect) ? [] : ['-', ...location.state.categories];
    const [displayedBlogs, setDisplayedBlogs] = useState(blogs);
    const [selectedCategory, setSelectedCategory] = useState('-');

    if (needToRedirect) {
        return <Navigate replace to="/login" />
    }

    const categoryChangeHandler = (event) => {
        //console.log(event.target.value);
        setSelectedCategory(event.target.value);

        //Assign it again and not use selectedCategory as react setState() are scheduled
        let categoryOfBlogsToBeDisplayed = event.target.value;
        filterPostsByCategory(categoryOfBlogsToBeDisplayed);
    }

    const showBlogPage = blog => {
        const category = blog.category.categoryName;

        const sameCategoryBlogs = blogs.filter(b => {
            return b.category.categoryName === category && b !== blog
        })

        navigate('/blog', {
            state: {
                blog: blog,
                similarBlogs: sameCategoryBlogs
            }
        })
    }

    const filterPostsByCategory = (category) => {
        if (category === "-") {
            setDisplayedBlogs(blogs);
        } else {
            let filteredBlogs = blogs.filter(blog => {
                return blog.category.categoryName.toLowerCase() === category.toLowerCase();
            });

            //Now these are to be displayed as per the category
            setDisplayedBlogs(filteredBlogs);
        }
    }

    //console.log(blogs);
    return <div className={styles['all-blogs-container']}>
        <div className={styles['all-blogs-filter-container']}>
            <h1 className={styles['filter-head']}>Blogs that people post</h1>
            <div className={styles['filter-blogs']}>
                <p className={styles['filter-p']}>Choose a category</p>
                <select id= 'category-select' name='category-select' onChange={categoryChangeHandler} value={selectedCategory}>
                    {categories.map(category => {
                        return <option key={category}>{category}</option>
                    })}
                </select>
            </div>
        </div>

        {displayedBlogs.length === 0 && <p className={styles['no-blogs']}>No Blogs to show!</p>}
        <ul className={styles['blog-list']}>
        {displayedBlogs.map(blog => {
                return <li key={blog.id}>
                        <BlogIntro
                            blog={blog}
                            showBlogPage={showBlogPage}
                        />
                        <hr className={styles['post-divider']}/>
                </li>
            })}
        </ul>
    </div>
}

export default AllBlogs;