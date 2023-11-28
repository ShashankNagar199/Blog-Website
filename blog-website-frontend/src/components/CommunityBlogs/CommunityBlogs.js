import BlogIntro from "../BlogsIntro/BlogIntro";
import styles from './CommunityBlogs.module.css';
import { useNavigate } from "react-router-dom";
import getAllCategoriesPromise from "../../UtilityCodes/Category/CategoryUtil";
import { getOthersPostPromise } from "../../UtilityCodes/User/UserUtility";

const CommunityBlogs = (props) => {

    const navigate = useNavigate();

    const user = props.user;
    // const goToAllBlogs = () => {
    //     const path = '/blogs';
    //     navigate(path);
    // }
    const blogs = props.blogs;
    let blogsToBeShownHere = [];
    if (blogs.length > 3)
        blogsToBeShownHere = blogs.slice(0, 3);
    else
        blogsToBeShownHere = blogs;

        const goToAllBlogs = () => {
        let promise = getAllCategoriesPromise();
        promise.then(response => {
            let categories = response.data;
            //console.log(categories);
            getOthersPostAndPNavigate(categories, user);
        })
            .catch(err => {
                console.log(err);
            })
        // const path = '/blogs';
        // navigate(path);
    }

    const getOthersPostAndPNavigate = (categories, user) => {
        let p = getOthersPostPromise(user.id);
        p.then(response => {
            const path = '/blogs';
            const blogs = response.data;
            // console.log(blogs);
            navigate(path, { state: { categories: categories, blogs: blogs } });
        })
            .catch(err => {
                console.log(err);
            })
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

    return <div className={styles['community-section']}>
        <div className={styles['section-header']}>
            <h1 className={styles['section-heading']}>Community Posts</h1>
            <p onClick={goToAllBlogs} className={styles['section-explore-more']}>Explore More</p>
        </div>

        {blogsToBeShownHere.length === 0 && <p className={styles['no-blogs']}>No Blogs to show!</p>}
        <ul>
            {blogsToBeShownHere.map(blog => {
                return <li key={blog.id}>
                    <BlogIntro
                        blog={blog}
                        showBlogPage={showBlogPage}
                    />
                    <hr className={styles['post-divider']} />
                </li>
            })}
        </ul>
    </div>
}

export default CommunityBlogs;